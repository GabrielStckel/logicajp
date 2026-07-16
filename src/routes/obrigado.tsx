import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

// Paleta espelhada de /1 (mesmo sistema visual)
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
        padding: "clamp(1.5rem, 5vw, 2.5rem) 1.25rem clamp(3.5rem, 12vw, 6rem)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{`
        .l-cta:hover { background-color: ${C.accentLight} !important; transform: translateY(-1px); }
        .l-cta:focus-visible, .l-link:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        @keyframes o-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.4); } }
        @keyframes o-check { 0% { opacity: 0; transform: scale(0.6); } 60% { opacity: 1; transform: scale(1.08); } 100% { transform: scale(1); } }
      `}</style>

      <main
        style={{
          width: "100%",
          maxWidth: 560,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Check icon — dominante */}
        <div
          aria-hidden
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: `1.5px solid ${C.accent}`,
            backgroundColor: `${C.accent}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.accentDeep,
            fontFamily: DISPLAY,
            fontSize: "2.75rem",
            fontWeight: 700,
            lineHeight: 1,
            boxShadow: `0 0 32px ${C.accent}33`,
            animation: "o-check .6s ease-out both",
            marginTop: "0.5rem",
          }}
        >
          ✓
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <p style={eyebrow}>Inscrição confirmada</p>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2rem, 8vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              textAlign: "center",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Sua vaga está reservada.
          </h1>
          <p
            style={{
              fontFamily: SANS,
              fontSize: "0.9375rem",
              lineHeight: 1.55,
              color: C.lightMuted,
              textAlign: "center",
              margin: 0,
              maxWidth: "38ch",
            }}
          >
            Você receberá a confirmação e as instruções no seu WhatsApp.
            Entre também no grupo para avisos e para se conectar com os outros
            participantes.
          </p>
        </div>

        {/* CTA principal — WhatsApp (posição prioritária, logo após o título) */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem", marginTop: "0.25rem" }}>
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
              gap: "0.5rem",
              minHeight: 56,
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
              boxShadow: `0 16px 40px -14px ${C.darkBg}44`,
              transition: "background-color .2s ease, transform .2s ease",
            }}
          >
            Entrar no grupo e receber o link
            <span aria-hidden style={{ fontSize: "1.1em", lineHeight: 1 }}>→</span>
          </a>
          <p
            style={{
              fontFamily: MONO,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.lightMuted,
              margin: 0,
              textAlign: "center",
            }}
          >
            Passo obrigatório · sem o grupo, sem instruções
          </p>
        </div>

        {/* Card resumo do evento — com destaque PRESENCIAL inescapável */}
        <section
          aria-labelledby="obrigado-detalhes"
          style={{
            width: "100%",
            backgroundColor: C.lightBgSoft,
            border: `1px solid ${C.lineLight}`,
            borderRadius: "4px",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginTop: "0.5rem",
          }}
        >
          {/* Banner PRESENCIAL */}
          <div
            style={{
              backgroundColor: C.darkBg,
              color: C.darkInk,
              padding: "0.875rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: C.accent,
                boxShadow: `0 0 12px ${C.accent}AA`,
                flexShrink: 0,
                animation: "o-pulse 2s ease-in-out infinite",
              }}
            />
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.accentLight,
                margin: 0,
              }}
            >
              Evento presencial · Balneário Camboriú/SC
            </p>
          </div>

          <div style={{ padding: "1.25rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p id="obrigado-detalhes" style={eyebrow}>
              Detalhes do evento
            </p>

            {[
              { label: "Data", value: "29 de julho de 2026", sub: "Quarta-feira" },
              { label: "Horário", value: "19h30 – 22h30", sub: "3 horas de imersão" },
              {
                label: "Local",
                value: "Rua 1500, 820 · 25º andar",
                sub: "Centro · Balneário Camboriú/SC",
              },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "4.5rem 1fr",
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
                      fontSize: d.label === "Local" ? "1rem" : "1.0625rem",
                      fontWeight: d.label === "Local" ? 700 : 500,
                      color: d.label === "Local" ? C.accentDeep : C.lightInk,
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
          </div>
        </section>

        <p
          style={{
            fontFamily: SANS,
            fontSize: "0.8125rem",
            lineHeight: 1.55,
            color: C.lightMuted,
            textAlign: "center",
            margin: "0.25rem 0 0",
            maxWidth: "36ch",
          }}
        >
          Se não conseguir comparecer, avise no grupo — a vaga é de outra pessoa.
        </p>
      </main>
    </div>
  );
}
