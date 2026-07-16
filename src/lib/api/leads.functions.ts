import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Public server function used by landing page forms to capture leads.
// Step 1 (critical): persist the lead in public.leads.
// Step 2 (best-effort): sync to ManyChat (createSubscriber + addTagByName).
// ManyChat failures never propagate to the client — they are recorded in
// manychat_status on the lead row.

const inputSchema = z.object({
  name: z.string().trim().min(3, "Nome muito curto").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(1, "Telefone obrigatório").max(40),
  confirmedPresencial: z.boolean(),
  source: z.string().trim().min(1).max(80),
});

function normalizeBrazilPhone(raw: string): string | null {
  const digits = raw.replace(/\D+/g, "");
  let withCountry: string;
  if (digits.length === 10 || digits.length === 11) {
    withCountry = `55${digits}`;
  } else if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    withCountry = digits;
  } else {
    return null;
  }
  const final = `+${withCountry}`;
  // +55 + DDD(2) + 8 or 9 digits
  if (!/^\+55\d{2}\d{8,9}$/.test(final)) return null;
  return final;
}

type ManychatResult = { status: "ok" | "duplicado" | "error"; message?: string; subscriberId?: string };

async function manychatFetch(
  url: string,
  apiKey: string,
  body: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; json: any }> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json };
}

function extractSubscriberId(payload: any): string | undefined {
  if (!payload) return undefined;
  const candidates = [
    payload?.data?.id,
    payload?.data?.subscriber_id,
    payload?.subscriber_id,
    payload?.id,
    payload?.details?.id,
    payload?.details?.subscriber_id,
  ];
  for (const c of candidates) {
    if (c != null) return String(c);
  }
  return undefined;
}

function looksDuplicate(payload: any): boolean {
  const msg = JSON.stringify(payload ?? "").toLowerCase();
  return (
    msg.includes("already") ||
    msg.includes("exist") ||
    msg.includes("duplicate") ||
    msg.includes("já existe") ||
    msg.includes("ja existe")
  );
}

function extractManychatErrorMessage(json: any, httpStatus: number): string {
  const stringify = (v: any): string | null => {
    if (v == null) return null;
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      if (typeof v.message === "string") return v.message;
      try {
        return JSON.stringify(v);
      } catch {
        return null;
      }
    }
    return String(v);
  };
  const firstMsg = Array.isArray(json?.details?.messages)
    ? stringify(json.details.messages[0])
    : null;
  const candidate =
    firstMsg ||
    stringify(json?.details?.message) ||
    stringify(json?.details) ||
    stringify(json?.message) ||
    `HTTP ${httpStatus}`;
  return candidate.slice(0, 500);
}


async function syncManychat(params: {
  apiKey: string;
  firstName: string;
  phone: string;
  email: string;
}): Promise<ManychatResult> {
  try {
    const createRes = await manychatFetch(
      "https://api.manychat.com/fb/subscriber/createSubscriber",
      params.apiKey,
      {
        first_name: params.firstName,
        whatsapp_phone: params.phone,
        phone: params.phone,
        email: params.email,
        consent_phrase:
          "Aceitou receber mensagens no WhatsApp ao se inscrever no workshop A Lógica",
        has_opt_in_sms: true,
      },
    );

    let subscriberId = extractSubscriberId(createRes.json);
    let duplicated = false;

    // ManyChat returns 200 with { status: "error" } for logical errors.
    const apiStatus = createRes.json?.status;
    if (!createRes.ok || apiStatus === "error") {
      if (looksDuplicate(createRes.json)) {
        duplicated = true;
        subscriberId = subscriberId ?? extractSubscriberId(createRes.json?.details);
      } else {
        const msg =
          createRes.json?.message ||
          createRes.json?.details?.messages?.[0] ||
          `HTTP ${createRes.status}`;
        return { status: "error", message: String(msg).slice(0, 240) };
      }
    }

    if (subscriberId) {
      const tagRes = await manychatFetch(
        "https://api.manychat.com/fb/subscriber/addTagByName",
        params.apiKey,
        {
          subscriber_id: subscriberId,
          tag_name: "inscrito_confirmou",
        },
      );
      if (!tagRes.ok || tagRes.json?.status === "error") {
        const msg =
          tagRes.json?.message ||
          tagRes.json?.details?.messages?.[0] ||
          `HTTP ${tagRes.status}`;
        return { status: "error", message: `tag: ${String(msg).slice(0, 220)}` };
      }
    }

    return { status: duplicated ? "duplicado" : "ok", subscriberId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown manychat error";
    return { status: "error", message: message.slice(0, 240) };
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const normalizedPhone = normalizeBrazilPhone(data.phone);
    if (!normalizedPhone) {
      throw new Error("Telefone inválido. Use o formato (DDD) 9XXXX-XXXX.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: normalizedPhone,
        confirmed_presencial: data.confirmedPresencial,
        source: data.source,
        manychat_status: null,
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("[leads] insert failed", insertError);
      throw new Error("Não foi possível salvar sua inscrição. Tente novamente.");
    }

    const apiKey = process.env.MANYCHAT_API_KEY;
    let manychatStatus: string;
    if (!apiKey) {
      manychatStatus = "error: MANYCHAT_API_KEY missing";
    } else {
      const firstName = data.name.trim().split(/\s+/)[0] ?? data.name.trim();
      const result = await syncManychat({
        apiKey,
        firstName,
        phone: normalizedPhone,
        email: data.email,
      });
      if (result.status === "ok") manychatStatus = "ok";
      else if (result.status === "duplicado") manychatStatus = "duplicado";
      else manychatStatus = `error: ${result.message ?? "unknown"}`.slice(0, 500);
    }

    const { error: updateError } = await supabaseAdmin
      .from("leads")
      .update({ manychat_status: manychatStatus })
      .eq("id", inserted.id);
    if (updateError) {
      console.error("[leads] manychat_status update failed", updateError);
    }

    return { ok: true as const };
  });
