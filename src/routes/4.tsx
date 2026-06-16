import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// Paleta espelhada da página "/" (tokens em src/styles.css)
// background hsl(30 15% 98%) · foreground hsl(215 25% 12%) · muted hsl(215 15% 45%)
// accent hsl(35 35% 55%) · surface hsl(30 10% 95%)
const C = {
  darkBg: "#171D26",       // foreground
  darkBgSoft: "#1F2630",   // foreground (levemente clareado p/ camadas)
  darkInk: "#FBFAF9",      // background sobre escuro
  darkMuted: "#9AA0AB",    // muted sobre escuro
  lightBg: "#FBFAF9",      // background
  lightBgSoft: "#F4F2F1",  // surface
  lightInk: "#171D26",     // foreground
  lightMuted: "#627084",   // muted
  accent: "#C9A84C",       // gold accent
  accentDeep: "#9E7E30",   // dark gold for contrast on light backgrounds
  accentLight: "#E0C878",  // light gold for hover
  lineDark: "#2A313B",     // border sobre escuro
  lineLight: "#E5E3E0",    // border (foreground @ 8% sobre cream)
} as const;

const SERIF = "'Playfair Display', Georgia, serif";
const DISPLAY = "'Inter Tight', sans-serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/SEU-LINK-AQUI";

const painPoints = [
  { label: "Cobrança", text: "Você não consegue cobrar pelo seu trabalho — sente vergonha e acha que não merece receber." },
  { label: "Precificação", text: "Você tem dificuldade de colocar valor nas suas ofertas — o medo da rejeição paralisa sua precificação." },
  { label: "Relacionamento", text: "Você não consegue falar sobre dinheiro com seu parceiro — sente vergonha e medo constante de julgamento." },
  { label: "Acúmulo", text: "Você ganha bem, mas o dinheiro não fica — é como se houvesse um teto invisível impedindo seu crescimento." },
  { label: "Suficiência", text: "Você não consegue ganhar o suficiente — vive mergulhado em sentimentos de impotência e inferioridade." },
  { label: "Emoção", text: "Você carrega uma carga emocional pesada ao lidar com finanças — ansiedade, medo e culpa são seus companheiros diários." },
  { label: "Identidade", text: "Você sente que há algo errado com você — uma sensação de que não é capaz ou que a abundância não é para o seu jeito de ser." },
];

const benefits = [
  "Por que você tem dificuldade real de cobrar pelo seu trabalho e como destravar isso.",
  "A origem da vergonha de falar sobre dinheiro e como se libertar desse peso.",
  "O motivo sistêmico pelo qual o dinheiro não fica com você (ou nem chega a entrar).",
  "Por que você se sente inferior e impotente frente às questões financeiras.",
  "Qual é a lógica sistêmica que governa sua vida material hoje.",
  "Como realizar uma mudança de postura real — não superficial, mas na raiz da sua consciência.",
];

const eventDetails = [
  { label: "Data", value: "08 de julho de 2026", sub: "Segunda-feira" },
  { label: "Horário", value: "19h30 – 22h30", sub: "3 horas de imersão" },
  { label: "Local", value: "Rua 1500, 820 – 25º andar", sub: "Centro · Balneário Camboriú" },
  { label: "Capacidade", value: "60 pessoas", sub: "Vagas estritamente limitadas" },
  { label: "Investimento", value: "Gratuito", sub: "Inscrição obrigatória" },
];

const faqs = [
  { q: "Preciso ter conhecimento prévio sobre Ciência Sistêmica?", a: "Não. O workshop é estruturado para quem está começando do zero. Você aprenderá tudo o que precisa para compreender sua própria dinâmica." },
  { q: "Isso é uma sessão de terapia em grupo?", a: "Não. É uma imersão em compreensão sistêmica aplicada. O foco é entender a lógica por trás dos seus padrões para que você possa alterá-los." },
  { q: "Quanto tempo leva para ver resultados?", a: "A mudança de percepção é imediata. Muitas pessoas relatam insights transformadores durante o próprio evento. A consolidação acontece conforme você integra essa nova visão." },
  { q: "O que acontece depois do evento?", a: "O workshop é completo em si mesmo. Para quem desejar aprofundamento, Jonas apresentará ao final os detalhes da Formação Completa em Ciência Sistêmica." },
];

export const Route = createFileRoute("/4")({
  head: () => ({
    meta: [
      { title: "A Lógica — Dinheiro e Abundância Sistêmica · Workshop com Jonas Peress" },
      { name: "description", content: "Workshop presencial gratuito em Balneário Camboriú. 08 de julho de 2026. A lógica sistêmica por trás dos seus padrões com dinheiro." },
      { property: "og:title", content: "A Lógica — Workshop Presencial · Jonas Peress" },
      { property: "og:description", content: "A maioria dos seus problemas com dinheiro não são sobre dinheiro. 60 vagas. Balneário Camboriú." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Page4,
});

const eyebrow = (color: string): React.CSSProperties => ({
  fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500,
  letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: "1.25rem",
});

const h2Style = (color: string): React.CSSProperties => ({
  fontFamily: DISPLAY, fontWeight: 700,
  fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15,
  letterSpacing: "-0.015em", color, margin: "0 0 1.75rem",
});

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Page4() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fields, setFields] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: "name" | "email" | "phone", v: string) => {
    setFields((p) => ({ ...p, [k]: k === "phone" ? maskPhone(v) : v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (fields.name.trim().length < 3) errs.name = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Informe um e-mail válido.";
    if (fields.phone.replace(/\D/g, "").length < 10) errs.phone = "Informe um telefone com DDD.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    window.open(WHATSAPP_GROUP_URL, "_blank", "noopener,noreferrer");
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%", boxSizing: "border-box",
    backgroundColor: C.lightBgSoft,
    border: `1px solid ${err ? "#C0392B" : C.lineLight}`,
    borderRadius: "2px", padding: "0.875rem 1rem",
    fontFamily: SANS, fontSize: "1rem", color: C.lightInk,
    outline: "none", caretColor: C.accent,
    transition: "border-color .25s ease, box-shadow .25s ease, background-color .25s ease",
  });

  return (
    <div style={{ backgroundColor: C.lightBg, fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes l-spin { to { transform: rotate(360deg); } }
        @keyframes l-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes l-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.35); } }
        .l-rise { animation: l-rise .8s ease-out both; }
        .l-rise-2 { animation: l-rise .8s ease-out .15s both; }
        .l-rise-3 { animation: l-rise .8s ease-out .3s both; }
        .l-rise-4 { animation: l-rise .8s ease-out .45s both; }
        .l-cta:hover { background-color: ${C.accentLight} !important; transform: translateY(-1px); }
        .l-ghost:hover { background-color: ${C.accent}18 !important; border-color: ${C.accent}66 !important; }
        .l-faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
        .l-faq-panel.open { grid-template-rows: 1fr; }
        .l-faq-panel > div { overflow: hidden; }
        input:focus { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accent}22; }
        .pain-card:hover { border-color: ${C.accent}44 !important; box-shadow: 0 8px 28px -8px ${C.lightInk}10; }
        .form-card { transition: box-shadow .4s ease, transform .4s ease; }
        .form-card:hover { box-shadow: 0 40px 100px -30px ${C.darkBg}CC, 0 0 0 1px ${C.accent}40; transform: translateY(-2px); }
      `}</style>

      {/* NAVBAR — LIGHT */}
      <nav style={{
        position: "fixed", top: 0, left: "1rem", right: "1rem", zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.875rem 1.5rem",
        backgroundColor: `${C.lightBg}90`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${C.lineLight}`,
        borderTop: "none",
        borderRadius: "0 0 24px 24px",
        boxShadow: `0 8px 32px -8px ${C.lightInk}10`,
      }}>
        <span style={{ fontFamily: DISPLAY, fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.lightInk }}>
          A Lógica
        </span>
        <a href="#inscricao" className="l-ghost" style={{
          fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500,
          color: C.accentDeep, textDecoration: "none",
          padding: "0.5rem 1.125rem", border: `1px solid ${C.accent}33`,
          borderRadius: "2px", transition: "all .2s ease",
        }}>Garantir vaga</a>
      </nav>

      {/* HERO — LIGHT · Editorial */}
      <section style={{
        minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center",
        paddingTop: "clamp(7rem,14vw,11rem)", paddingBottom: "clamp(3rem,6vw,5rem)",
        paddingLeft: "clamp(1.5rem,5vw,4rem)", paddingRight: "clamp(1.5rem,5vw,4rem)",
        position: "relative", overflow: "hidden", backgroundColor: C.lightBg,
      }}>
        {/* Backdrop: soft glow + hairline grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 70% 55% at 78% 30%, ${C.accent}12, transparent 65%), radial-gradient(ellipse 55% 50% at 10% 80%, ${C.accent}0A, transparent 60%)`,
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.25,
          backgroundImage: `linear-gradient(${C.lineLight} 1px, transparent 1px)`,
          backgroundSize: "100% clamp(7rem, 12vh, 9rem)",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }} />
        <svg aria-hidden viewBox="0 0 600 600" fill="none"
          style={{
            position: "absolute", right: "-12vw", top: "50%", transform: "translateY(-50%)",
            width: "min(95vw, 780px)", height: "min(95vw, 780px)",
            opacity: 0.07, pointerEvents: "none", animation: "l-spin 220s linear infinite", willChange: "transform",
          }}>
          <circle cx="300" cy="300" r="80" stroke={C.accent} strokeWidth="0.5" />
          <circle cx="300" cy="300" r="160" stroke={C.accent} strokeWidth="0.4" />
          <circle cx="300" cy="300" r="240" stroke={C.accent} strokeWidth="0.3" />
          <circle cx="300" cy="300" r="290" stroke={C.accent} strokeWidth="0.2" />
          <line x1="10" y1="300" x2="590" y2="300" stroke={C.accent} strokeWidth="0.25" />
          <line x1="300" y1="10" x2="300" y2="590" stroke={C.accent} strokeWidth="0.25" />
          <line x1="80" y1="80" x2="520" y2="520" stroke={C.accent} strokeWidth="0.18" />
          <line x1="520" y1="80" x2="80" y2="520" stroke={C.accent} strokeWidth="0.18" />
        </svg>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", width: "100%", margin: "0 auto" }}>
          {/* Eyebrow with dot */}
          <div className="l-rise" style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "clamp(2rem,4vw,3rem)" }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.accent, boxShadow: `0 0 14px ${C.accent}66`, flexShrink: 0 }} />
            <span style={{ ...eyebrow(C.lightMuted), marginBottom: 0 }}>
              Workshop Presencial · Edição única
            </span>
          </div>

          {/* Headline — massive editorial */}
          <h1 className="l-rise-2" style={{
            fontFamily: SERIF, fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 0.96,
            letterSpacing: "-0.035em", color: C.lightInk,
            margin: 0, maxWidth: "16ch", whiteSpace: "pre-line",
          }}>
            A lógica por trás{"\n"}do <span style={{ color: C.accentDeep }}>dinheiro</span>
            <span style={{ color: C.accentDeep }}>.</span>
          </h1>

          {/* Subtitle */}
          <p className="l-rise-3" style={{
            fontFamily: SANS, fontWeight: 400,
            fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)", lineHeight: 1.6,
            color: C.lightMuted, maxWidth: "44ch",
            margin: "clamp(1.75rem,3.5vw,2.75rem) 0 0",
            textAlign: "justify",
          }}>
            A maioria dos seus problemas com dinheiro <span style={{ color: C.lightInk, fontWeight: 500 }}>não são sobre dinheiro</span>. Uma investigação presencial sobre as leis sistêmicas invisíveis que governam a sua prosperidade.
          </p>

          {/* CTA row */}
          <div className="l-rise-4" style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem 1.75rem",
            marginTop: "clamp(2.25rem,4vw,3rem)",
          }}>
            <a href="#inscricao" className="l-cta" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "0.02em",
              color: C.lightBg, backgroundColor: C.accentDeep, textDecoration: "none",
              padding: "1.1rem 2.25rem", borderRadius: "2px",
              transition: "background-color .2s ease, transform .2s ease",
              boxShadow: `0 14px 40px -12px ${C.accentDeep}55`,
            }}>
              Garantir minha vaga
              <span aria-hidden style={{ fontSize: "1.1em", lineHeight: 1 }}>→</span>
            </a>
            <span style={{ fontFamily: SANS, fontSize: "0.8125rem", color: C.lightMuted, letterSpacing: "0.02em" }}>
              <span style={{ color: C.accentDeep, fontWeight: 600 }}>Gratuito</span>
              {" · "}Inscrição obrigatória
            </span>
          </div>

          {/* Meta strip — editorial colophon */}
          <div className="l-rise-4" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.5rem 2rem",
            marginTop: "clamp(3.5rem,7vw,5.5rem)",
            paddingTop: "1.75rem",
            borderTop: `1px solid ${C.lineLight}`,
            maxWidth: "780px",
          }}>
            {[
              { k: "Data", v: "08 jul · 2026", s: "Quarta · 19h30" },
              { k: "Local", v: "Balneário Camboriú", s: "Centro · 25º andar" },
              { k: "Vagas", v: "60 lugares", s: "Estritamente limitadas" },
            ].map((m) => (
              <div key={m.k}>
                <p style={{ fontFamily: SANS, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentDeep, margin: "0 0 0.5rem" }}>
                  {m.k}
                </p>
                <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.0625rem", lineHeight: 1.2, color: C.lightInk, margin: 0 }}>
                  {m.v}
                </p>
                <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: C.lightMuted, margin: "0.2rem 0 0" }}>
                  {m.s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN INTRO — LIGHT */}
      <section style={{ backgroundColor: C.lightBgSoft, padding: "clamp(4rem,8vw,6rem) 1.5rem", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.accentDeep)}>Falar sobre dinheiro te incomoda?</p>
          <h2 style={h2Style(C.lightInk)}>
            O sofrimento não vem dos problemas.{" "}
            <span style={{ color: C.accentDeep, fontWeight: 600 }}>Vem de como você os carrega.</span>
          </h2>
          {[
            <>Você não consegue cobrar bem pelo seu trabalho. Você sente vergonha de falar sobre dinheiro com seu parceiro. Você ganha, mas o dinheiro não fica. Ou simplesmente não consegue ganhar o suficiente para viver com dignidade.</>,
            <>E pior: você sente uma <strong style={{ fontWeight: 600 }}>impotência profunda</strong>. Uma inferioridade e insuficiência constante. Como se houvesse algo errado com você. Você tenta ganhar mais, economizar, investir. Nada soluciona. A <strong style={{ fontWeight: 600 }}>carga emocional</strong> é tão pesada que você acaba desistindo.</>,
            <>E então, você se culpa. Mas a verdade é diferente do que te contaram. A maioria dos seus problemas com dinheiro <strong style={{ fontWeight: 600 }}>não são sobre dinheiro</strong>. São sobre como sua consciência funciona — padrões inconscientes, crenças herdadas, lealdades sistêmicas. Mas quando você percebe… <strong style={{ fontWeight: 600 }}>tudo muda</strong>.</>,
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: SANS, fontSize: "clamp(1rem,1.5vw,1.0625rem)", lineHeight: 1.75, color: C.lightInk, marginBottom: "1.25rem", textAlign: "justify" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* PAIN MIRROR — LIGHT */}
      <section style={{
        background: `linear-gradient(180deg, ${C.lightBgSoft} 0%, ${C.lightBg} 30%, ${C.lightBg} 70%, ${C.lightBgSoft} 100%)`,
        padding: "clamp(4rem,8vw,6rem) 1.5rem",
        borderTop: `1px solid ${C.lineLight}`,
        borderBottom: `1px solid ${C.lineLight}`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative faint grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35,
          backgroundImage: `linear-gradient(${C.lineLight} 1px, transparent 1px), linear-gradient(90deg, ${C.lineLight} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ ...eyebrow(C.accentDeep), textAlign: "center", marginBottom: "1.25rem" }}>Você se reconhece</p>
          <h2 style={{
            ...h2Style(C.lightInk),
            textAlign: "center",
            maxWidth: "18ch",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "0.75rem",
          }}>
            Isso não é uma fraqueza sua.
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(1rem, 1.4vw, 1.0625rem)",
            lineHeight: 1.7,
            color: C.lightMuted,
            textAlign: "center",
            maxWidth: "52ch",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
          }}>
            Se você se identifica com um ou mais dos pontos abaixo, saiba que não está sozinho. É algo muito mais profundo do que falta de disciplina.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "1.25rem",
          }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{
                backgroundColor: C.lightBg,
                border: `1px solid ${C.lineLight}`,
                borderRadius: "3px",
                padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                transition: "border-color .25s ease, box-shadow .25s ease",
              }} className="pain-card">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem" }}>
                  <span style={{
                    fontFamily: MONO,
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.accentDeep,
                  }}>
                    {p.label}
                  </span>
                  <span aria-hidden style={{
                    fontFamily: SERIF,
                    fontSize: "0.8125rem",
                    lineHeight: 1,
                    color: C.accent,
                    opacity: 0.55,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p style={{
                  fontFamily: SANS,
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: C.lightInk,
                  margin: 0,
                  textAlign: "justify",
                }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE — LIGHT */}
      <section style={{ background: `linear-gradient(180deg, ${C.lightBg} 0%, ${C.lightBgSoft} 40%, ${C.lightBgSoft} 60%, ${C.lightBg} 100%)`, padding: "clamp(2.5rem,5vw,4rem) 1.5rem", borderTop: `1px solid ${C.lineLight}`, borderBottom: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ position: "relative", padding: "clamp(1.25rem,2.5vw,2rem) 0" }}>
            <span aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontFamily: SANS, fontSize: "clamp(3rem,6vw,4.5rem)", lineHeight: 1, color: C.accent, opacity: 0.14, userSelect: "none", pointerEvents: "none" }}>"</span>
            <blockquote style={{ margin: 0, position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(1.125rem,2.4vw,1.5rem)", lineHeight: 1.6, letterSpacing: "-0.01em", color: C.lightInk, marginBottom: 0, textAlign: "justify", fontStyle: "italic" }}>
                A verdade é diferente do que te contaram. Enquanto você não compreender essa <span style={{ color: C.accentDeep, fontStyle: "normal", fontWeight: 700 }}>lógica sistêmica</span>, continuará tentando resolver sintomas. Mas quando você percebe… <span style={{ color: C.accentDeep, fontStyle: "normal", fontWeight: 700 }}>tudo muda</span>.
              </p>
            </blockquote>
            <span aria-hidden style={{ position: "absolute", bottom: "-1rem", right: 0, fontFamily: SANS, fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1, color: C.accent, opacity: 0.1, userSelect: "none", pointerEvents: "none", transform: "rotate(180deg)" }}>"</span>
          </div>
        </div>
      </section>

      {/* ABOUT JONAS — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4rem,8vw,6rem) 1.5rem", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={eyebrow(C.lightMuted)}>Quem conduz</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: "2px", overflow: "hidden", aspectRatio: "4/5", backgroundColor: C.lightBgSoft }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: C.lightMuted, fontFamily: SANS, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Foto de Jonas
              </div>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.lightBgSoft}BB 0%, transparent 55%, ${C.accent}0A 100%)` }} />
            </div>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.75rem,4vw,2.5rem)", lineHeight: 1.12, letterSpacing: "-0.015em", color: C.lightInk, marginBottom: "0.375rem" }}>
                Jonas Peress
              </h2>
              <p style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accentDeep, marginBottom: "1.5rem" }}>
                Facilitador · Ciência Sistêmica
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.75, color: C.lightMuted, marginBottom: "1rem", textAlign: "justify" }}>
                Há mais de uma década investigando os sistemas invisíveis que governam nossas vidas, Jonas sistematizou os padrões que mantêm as pessoas presas em ciclos de escassez — mesmo quando ganham bem, trabalham muito ou já fizeram terapia.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.75, color: C.lightMuted, margin: 0, textAlign: "justify" }}>
                Sua abordagem une <span style={{ color: C.accentDeep, fontWeight: 600 }}>ciência sistêmica</span> à leitura de comportamento financeiro inconsciente. Não é terapia convencional — é um sistema de percepção que muda a relação com o dinheiro a partir da raiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS — EDITORIAL CARDS */}
      <section style={{
        background: `linear-gradient(180deg, ${C.lightBg} 0%, ${C.lightBgSoft} 100%)`,
        padding: "clamp(4rem,8vw,6rem) 1.5rem",
        borderTop: `1px solid ${C.lineLight}`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative accent line */}
        <div aria-hidden style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "clamp(3rem,6vw,5rem)",
          background: `linear-gradient(to bottom, ${C.accent}, transparent)`,
        }} />

        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <p style={{ ...eyebrow(C.accentDeep), textAlign: "center", marginBottom: "1.25rem" }}>No Workshop</p>
          <h2 style={{
            ...h2Style(C.lightInk),
            textAlign: "center",
            marginBottom: "0.75rem",
            maxWidth: "20ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            O que você vai{" "}
            <span style={{ color: C.accentDeep, fontWeight: 600 }}>compreender</span>
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(1rem, 1.4vw, 1.0625rem)",
            lineHeight: 1.7,
            color: C.lightMuted,
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
            textAlign: "center",
            maxWidth: "52ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Você sairá deste encontro com uma percepção diferente. Vai acessar a si mesmo de um jeito que nunca foi possível antes.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "1fr",
            gap: "1.25rem",
          }}>
            {benefits.map((b, i) => (
              <div key={i} style={{
                backgroundColor: C.lightBg,
                border: `1px solid ${C.lineLight}`,
                borderRadius: "2px",
                padding: "clamp(1.5rem, 3vw, 2.25rem)",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow .25s ease, transform .25s ease",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }} className="l-benefit-card">
                {/* Top accent bar */}
                <div aria-hidden style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${C.accent}66, ${C.accent}18, transparent)`,
                }} />
                {/* Large number background */}
                <span aria-hidden style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "1rem",
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 7vw, 5rem)",
                  lineHeight: 1,
                  color: C.accent,
                  opacity: 0.06,
                  userSelect: "none",
                  pointerEvents: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Number pill */}
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  color: C.lightBg,
                  backgroundColor: C.accentDeep,
                  borderRadius: "2px",
                  padding: "0.35rem 0.625rem",
                  marginBottom: "1rem",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{
                  fontFamily: SANS,
                  fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                  lineHeight: 1.72,
                  color: C.lightInk,
                  margin: 0,
                  textAlign: "justify",
                  position: "relative",
                  zIndex: 1,
                  whiteSpace: "pre-line",
                  flex: "1 1 auto",
                }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT INFO — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4rem,8vw,6rem) 1.5rem", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.lightMuted)}>O Encontro</p>
          <h2 style={h2Style(C.lightInk)}>
            Um encontro presencial{" "}
            <span style={{ color: C.accentDeep, fontWeight: 600 }}>exclusivo</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.7, color: C.lightMuted, marginBottom: "2rem", textAlign: "justify" }}>
            Este é um encontro presencial exclusivo em Balneário Camboriú, desenhado para quem busca respostas profundas e definitivas.
          </p>
          {eventDetails.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.125rem 0", borderBottom: `1px solid ${C.lineLight}`, gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.lightMuted, minWidth: "90px", paddingTop: "0.2rem" }}>{d.label}</span>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: DISPLAY, fontSize: "1.0625rem", fontWeight: d.label === "Investimento" ? 700 : 400, color: d.label === "Investimento" ? C.accentDeep : C.lightInk, margin: 0, lineHeight: 1.3 }}>{d.value}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: C.lightMuted, margin: "0.2rem 0 0" }}>{d.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION FORM — LIGHT · Editorial split */}
      <section id="inscricao" style={{
        position: "relative", overflow: "hidden",
        backgroundColor: C.darkBg, color: C.darkInk,
        padding: "clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,3rem)",
        borderTop: `1px solid ${C.lineDark}`,
      }}>
        {/* Backdrop glow */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 60% 50% at 85% 20%, ${C.accent}22, transparent 60%), radial-gradient(ellipse 50% 45% at 5% 90%, ${C.accent}14, transparent 60%)`,
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
          backgroundImage: `linear-gradient(${C.lineDark} 1px, transparent 1px)`,
          backgroundSize: "100% clamp(7rem, 12vh, 9rem)",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }} />

        <div style={{
          position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(2.5rem, 5vw, 4.5rem)",
          alignItems: "center",
        }}>
          {/* LEFT — Editorial pitch */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.75rem" }}>
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.accent, boxShadow: `0 0 14px ${C.accent}88`, flexShrink: 0 }} />
              <span style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentLight }}>
                Inscrição · Edição única
              </span>
            </div>

            <h2 style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.02,
              letterSpacing: "-0.025em", color: C.darkInk,
              margin: "0 0 1.5rem", maxWidth: "14ch",
            }}>
              Você merece{" "}
              <span style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>compreender</span>.
            </h2>

            <p style={{
              fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7,
              color: C.darkMuted, margin: "0 0 2rem", maxWidth: "38ch",
            }}>
              Uma noite presencial em Balneário Camboriú dedicada às leis sistêmicas invisíveis que governam sua relação com o dinheiro.
            </p>

            {/* Recap chips */}
            <div style={{ display: "grid", gap: "0.875rem", maxWidth: "360px" }}>
              {[
                { k: "Quando", v: "08 jul · 2026 · 19h30" },
                { k: "Onde", v: "Balneário Camboriú · SC" },
                { k: "Investimento", v: "Gratuito" },
              ].map((r) => (
                <div key={r.k} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  gap: "1rem", padding: "0.75rem 0",
                  borderBottom: `1px solid ${C.lineDark}`,
                }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.darkMuted }}>
                    {r.k}
                  </span>
                  <span style={{ fontFamily: DISPLAY, fontSize: "0.9375rem", fontWeight: 600, color: C.darkInk, textAlign: "right" }}>
                    {r.v}
                  </span>
                </div>
              ))}
            </div>

            {/* Scarcity */}
            <div style={{
              marginTop: "2rem", padding: "1rem 1.125rem",
              border: `1px solid ${C.accent}40`,
              backgroundColor: `${C.accent}0F`,
              borderRadius: "2px",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span aria-hidden style={{
                width: 8, height: 8, borderRadius: "50%",
                backgroundColor: C.accent,
                boxShadow: `0 0 12px ${C.accent}AA`,
                flexShrink: 0,
                animation: "l-pulse 2s ease-in-out infinite",
              }} />
              <p style={{ fontFamily: SANS, fontSize: "0.8125rem", lineHeight: 1.5, color: C.darkInk, margin: 0 }}>
                <strong style={{ fontWeight: 600 }}>60 vagas</strong>{" "}
                <span style={{ color: C.darkMuted }}>· estritamente limitadas pelo espaço.</span>
              </p>
            </div>
          </div>

          {/* RIGHT — Form card */}
          <div className="form-card" style={{
            backgroundColor: C.lightBg, color: C.lightInk,
            padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
            border: `1px solid ${C.lineDark}`,
            borderRadius: "4px",
            boxShadow: `0 30px 80px -30px ${C.darkBg}AA, 0 0 0 1px ${C.accent}1F`,
            position: "relative",
          }}>
            {/* accent ribbon */}
            <div aria-hidden style={{
              position: "absolute", top: 0, left: "1.5rem", right: "1.5rem",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
            }} />

            {submitted ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `1.5px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem", color: C.accentDeep }}>✓</div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.375rem,3vw,1.875rem)", lineHeight: 1.2, color: C.lightInk, margin: "0 0 0.875rem" }}>Inscrição confirmada.</h3>
                <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.65, color: C.lightMuted, margin: "0 0 0.5rem" }}>
                  O grupo do WhatsApp foi aberto em uma nova aba. Você receberá todas as informações por lá.
                </p>
                <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: C.lightMuted, margin: 0 }}>
                  Se a aba não abriu,{" "}
                  <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.accentDeep, textDecoration: "underline" }}>clique aqui para entrar no grupo</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentDeep, margin: "0 0 0.625rem" }}>
                    Garanta sua vaga
                  </p>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)", lineHeight: 1.2, letterSpacing: "-0.015em", color: C.lightInk, margin: 0 }}>
                    Preencha para receber o acesso ao grupo.
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                  {([
                    { k: "name" as const, label: "Nome completo", type: "text", placeholder: "Seu nome completo", autoComplete: "name" },
                    { k: "email" as const, label: "E-mail", type: "email", placeholder: "seu@email.com", autoComplete: "email" },
                    { k: "phone" as const, label: "WhatsApp", type: "tel", placeholder: "(47) 99999-0000", autoComplete: "tel" },
                  ]).map((f) => (
                    <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: "0.4375rem" }}>
                      <label htmlFor={`f-${f.k}`} style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.lightMuted }}>
                        {f.label}
                      </label>
                      <input
                        id={`f-${f.k}`} type={f.type} autoComplete={f.autoComplete}
                        placeholder={f.placeholder} value={fields[f.k]}
                        onChange={(e) => set(f.k, e.target.value)}
                        style={inputStyle(errors[f.k])}
                      />
                      {errors[f.k] && (
                        <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: "#C0392B", margin: 0 }}>{errors[f.k]}</p>
                      )}
                    </div>
                  ))}

                  <button type="submit" className="l-cta" style={{
                    marginTop: "0.5rem",
                    width: "100%", padding: "1.125rem", backgroundColor: C.accentDeep,
                    color: C.lightBg, border: "none", borderRadius: "2px",
                    fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 600,
                    letterSpacing: "0.02em", cursor: "pointer",
                    transition: "background-color .2s ease, transform .2s ease",
                    boxShadow: `0 14px 36px -14px ${C.accentDeep}AA`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
                  }}>
                    Confirmar minha inscrição
                    <span aria-hidden style={{ fontSize: "1.1em", lineHeight: 1 }}>→</span>
                  </button>

                  {/* Trust row */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    marginTop: "0.25rem",
                    paddingTop: "1rem",
                    borderTop: `1px solid ${C.lineLight}`,
                  }}>
                    <span aria-hidden style={{ color: C.accentDeep, fontSize: "0.9rem", lineHeight: 1 }}>🔒</span>
                    <p style={{ fontFamily: SANS, fontSize: "0.75rem", lineHeight: 1.5, color: C.lightMuted, margin: 0 }}>
                      Seus dados são usados apenas para confirmar sua participação no evento.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4rem,8vw,6rem) 1.5rem", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.lightMuted)}>Dúvidas Frequentes</p>
          <h2 style={{ ...h2Style(C.lightInk), marginBottom: "2.5rem" }}>
            Respostas{" "}
            <span style={{ color: C.accentDeep, fontWeight: 600 }}>diretas</span>
          </h2>
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid ${C.lineLight}` }}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "1.25rem 0",
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", gap: "1rem", color: "inherit",
                  }}
                >
                  <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.0625rem", lineHeight: 1.35, letterSpacing: "-0.01em", color: C.lightInk }}>
                    {f.q}
                  </span>
                  <span aria-hidden style={{ color: C.accentDeep, fontSize: "1.375rem", lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .25s ease" }}>+</span>
                </button>
                <div className={`l-faq-panel${open ? " open" : ""}`}>
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.72, color: C.lightMuted, paddingBottom: "1.375rem", margin: 0, textAlign: "justify" }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLOSING CTA — LIGHT */}
      <section style={{ backgroundColor: C.lightBgSoft, padding: "clamp(4.5rem,9vw,7rem) 1.5rem", textAlign: "center", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.875rem,4.5vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: C.lightInk, marginBottom: "1.25rem" }}>
            Você merece entender por que funciona{" "}
            <span style={{ color: C.accentDeep, fontWeight: 600 }}>do jeito que funciona.</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.72, color: C.lightMuted, marginBottom: "2.25rem" }}>
            Você merece sair do ciclo de inferioridade e da sensação de impotência que a escassez provoca. Você merece, finalmente, compreender a lógica sistêmica do dinheiro e assumir o seu lugar de abundância.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.lightMuted, marginBottom: "2rem" }}>
            Dia 08 de julho · Vagas limitadas · Estou esperando por você.
          </p>
          <a href="#inscricao" className="l-cta" style={{
            display: "inline-block", fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 500, letterSpacing: "0.04em",
            color: C.darkBg, backgroundColor: C.accent, textDecoration: "none",
            padding: "1.0625rem 2.5rem", borderRadius: "2px", transition: "background-color .2s ease",
          }}>
            Garantir meu lugar em "A Lógica"
          </a>
        </div>
      </section>

      {/* FOOTER — LIGHT */}
      <footer style={{ backgroundColor: C.lightBgSoft, padding: "clamp(3.5rem,6vw,5rem) 1.5rem 2rem", borderTop: `1px solid ${C.lineLight}` }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "2.5rem",
            borderBottom: `1px solid ${C.lineLight}`,
          }}>
            {/* Brand */}
            <div>
              <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em", color: C.lightInk, margin: "0 0 0.5rem" }}>
                Jonas Peress
              </p>
              <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accentDeep, margin: "0 0 0.875rem" }}>
                Ciência Sistêmica
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.8125rem", lineHeight: 1.65, color: C.lightMuted, margin: 0, maxWidth: "28ch" }}>
                A lógica sistêmica por trás da sua relação com o dinheiro.
              </p>
            </div>

            {/* Event */}
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.lightMuted, margin: "0 0 1rem" }}>
                Evento
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.8125rem", lineHeight: 1.7, color: C.lightInk, margin: "0 0 0.25rem" }}>08 de julho · 2026</p>
              <p style={{ fontFamily: SANS, fontSize: "0.8125rem", lineHeight: 1.7, color: C.lightMuted, margin: "0 0 0.875rem" }}>Balneário Camboriú · SC</p>
              <a href="#inscricao" style={{ fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500, color: C.accentDeep, textDecoration: "none", borderBottom: `1px solid ${C.accent}55`, paddingBottom: "2px" }}>
                Garantir vaga →
              </a>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.lightMuted, margin: "0 0 1rem" }}>
                Contato
              </p>
              <a href="mailto:contato@jonasperess.com" style={{ display: "block", fontFamily: SANS, fontSize: "0.8125rem", color: C.lightInk, textDecoration: "none", margin: "0 0 0.5rem" }}>
                contato@jonasperess.com
              </a>
              <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: SANS, fontSize: "0.8125rem", color: C.lightMuted, textDecoration: "none" }}>
                Grupo no WhatsApp
              </a>
            </div>
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "0.75rem", paddingTop: "1.5rem",
          }}>
            <p style={{ fontFamily: MONO, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.lightMuted, margin: 0 }}>
              © 2026 Jonas Peress
            </p>
            <a href="#top" style={{ fontFamily: MONO, fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.lightMuted, textDecoration: "none" }}>
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
