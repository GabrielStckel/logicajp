import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

// Paleta espelhada de /4 (mesmo sistema visual)
const C = {
  darkBg: "#171D26",
  darkInk: "#FBFAF9",
  lightBg: "#FBFAF9",
  lightBgSoft: "#F4F2F1",
  lightInk: "#171D26",
  lightMuted: "#627084",
  accent: "#C9A84C",
  accentDeep: "#9E7E30",
  accentLight: "#E0C878",
  lineLight: "#E5E3E0",
} as const;

const DISPLAY = "'Inter Tight', sans-serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const WHATSAPP_GROUP =
  "https://chat.whatsapp.com/C2fkN1xmpaE6H5agOyKBjx?mode=gi_t";
const MAPS_URL =
  "https://maps.google.com/?q=Rua+1500,+820+-+Centro,+Balneário+Camboriú+-+SC";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Inscrição confirmada · A Lógica" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("lead_ok") !== "1") return;
    fired.current = true;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void })
      .fbq;
    fbq?.("track", "Lead");
    sessionStorage.removeItem("lead_ok");
  }, []);

  const eyebrow = {
    fontFamily: MONO,
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: C.accentDeep,
    margin: 0,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: C.lightBg,
        color: C.lightInk,
        fontFamily: SANS,
        padding: "clamp(1.75rem, 6vw, 3rem) 1.25rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{`
        .l-cta:hover { background-color: ${C.accentLight} !important; transform: translateY(-1px); }
        .l-cta:focus-visible, .l-link:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
      `}</style>

      <main
        style={{
          width: "100%",
          maxWidth: 560,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        {/* Check icon — círculo com borda dourada, ✓ accentDeep, fundo transparente */}
        <div
          aria-hidden
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `1.5px solid ${C.accent}`,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.accentDeep,
            fontFamily: DISPLAY,
            fontSize: "2rem",
            fontWeight: 700,
            lineHeight: 1,
            boxShadow: `0 0 24px ${C.accent}22`,
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            textAlign: "center",
            margin: 0,
          }}
        >
          Sua vaga está reservada.
        </h1>

        {/* Aviso WhatsApp */}
        <div
          role="status"
          style={{
            width: "100%",
            border: `1px solid ${C.accent}40`,
            backgroundColor: `${C.accent}0F`,
            borderRadius: "2px",
            padding: "0.9rem 1rem",
            textAlign: "center",
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            color: C.lightInk,
          }}
        >
          Você receberá a confirmação no seu{" "}
          <span style={{ color: C.accentDeep, fontWeight: 600 }}>WhatsApp</span>{" "}
          em instantes.
        </div>

        {/* Card resumo do evento */}
        <section
          aria-labelledby="obrigado-detalhes"
          style={{
            width: "100%",
            backgroundColor: C.lightBgSoft,
            border: `1px solid ${C.lineLight}`,
            borderRadius: "4px",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p id="obrigado-detalhes" style={eyebrow}>
            Detalhes do evento
          </p>

          {[
            { label: "Data", value: "29 de julho de 2026", sub: "Quarta-feira" },
            { label: "Horário", value: "19h30 – 22h30", sub: "3 horas de imersão" },
            {
              label: "Local",
              value: "Rua 1500, 820 – 25º andar",
              sub: "Centro · Balneário Camboriú/SC",
            },
          ].map((d) => (
            <div
              key={d.label}
              style={{
                display: "grid",
                gridTemplateColumns: "5.25rem 1fr",
                gap: "0.75rem",
                alignItems: "baseline",
              }}
            >
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.lightMuted,
                  margin: 0,
                }}
              >
                {d.label}
              </p>
              <div>
                <p
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "1.0625rem",
                    fontWeight: 500,
                    color: C.lightInk,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {d.value}
                </p>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "0.8125rem",
                    color: C.lightMuted,
                    margin: "0.125rem 0 0",
                    lineHeight: 1.4,
                  }}
                >
                  {d.sub}
                </p>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "0.25rem",
              paddingTop: "0.9rem",
              borderTop: `1px dashed ${C.accent}66`,
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: MONO,
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accentDeep,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: C.accent,
                boxShadow: `0 0 12px ${C.accent}AA`,
              }}
            />
            Evento presencial · comparecimento obrigatório
          </div>
        </section>

        {/* CTA principal — WhatsApp */}
        <a
          href={WHATSAPP_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="l-cta"
          style={{
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 52,
            padding: "1rem 1.5rem",
            fontFamily: DISPLAY,
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: C.darkBg,
            backgroundColor: C.accent,
            border: "none",
            borderRadius: "2px",
            textDecoration: "none",
            boxShadow: `0 14px 36px -14px ${C.accentDeep}66`,
            transition: "background-color .2s ease, transform .2s ease",
          }}
        >
          Entrar no grupo do WhatsApp
        </a>

      </main>
    </div>
  );
}
