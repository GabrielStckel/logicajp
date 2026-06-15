import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const C = {
  darkBg: "#0D1410",
  darkBgSoft: "#131D18",
  darkInk: "#F0F5F2",
  darkMuted: "#7A9486",
  lightBg: "#F5F7F5",
  lightBgSoft: "#EAEEEA",
  lightInk: "#0D1410",
  lightMuted: "#3D5449",
  accent: "#3ECF8E",
  accentDeep: "#27A36D",
  accentLight: "#5CDBA0",
  lineDark: "#1F2E28",
  lineLight: "#D0DAD2",
} as const;

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

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
  "Por que você tem dificuldade real de cobrar pelo seu trabalho — e como destravar isso.",
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
  fontFamily: SANS, fontSize: "0.6875rem", fontWeight: 500,
  letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: "1.25rem",
});

const h2Style = (color: string): React.CSSProperties => ({
  fontFamily: SERIF, fontWeight: 700,
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
  });

  return (
    <div style={{ backgroundColor: C.darkBg, fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @keyframes l-spin { to { transform: rotate(360deg); } }
        @keyframes l-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .l-rise { animation: l-rise .8s ease-out both; }
        .l-rise-2 { animation: l-rise .8s ease-out .15s both; }
        .l-rise-3 { animation: l-rise .8s ease-out .3s both; }
        .l-rise-4 { animation: l-rise .8s ease-out .45s both; }
        .l-cta:hover { background-color: ${C.accentLight} !important; }
        .l-ghost:hover { background-color: ${C.accent}18 !important; border-color: ${C.accent}66 !important; }
        .l-faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
        .l-faq-panel.open { grid-template-rows: 1fr; }
        .l-faq-panel > div { overflow: hidden; }
        input:focus { border-color: ${C.accent} !important; }
      `}</style>

      {/* NAVBAR — DARK */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.125rem 1.5rem",
        backgroundColor: `${C.darkBg}E8`,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.lineDark}`,
      }}>
        <span style={{ fontFamily: SANS, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.darkMuted }}>
          Ciência Sistêmica · Jonas Peress
        </span>
        <a href="#inscricao" className="l-ghost" style={{
          fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500,
          color: C.accent, textDecoration: "none",
          padding: "0.5rem 1.125rem", border: `1px solid ${C.accent}33`,
          borderRadius: "2px", transition: "all .2s ease",
        }}>Garantir vaga</a>
      </nav>

      {/* HERO — DARK */}
      <section style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingTop: "clamp(6rem,14vw,10rem)", paddingBottom: "clamp(4rem,8vw,6rem)",
        paddingLeft: "1.5rem", paddingRight: "1.5rem",
        textAlign: "center", position: "relative", overflow: "hidden",
        backgroundColor: C.darkBg,
      }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 65% 50% at 50% 35%, ${C.accent}12, transparent 65%)` }} />
        <svg aria-hidden width="500" height="500" viewBox="0 0 500 500" fill="none"
          style={{ position: "absolute", opacity: 0.08, pointerEvents: "none", animation: "l-spin 150s linear infinite", willChange: "transform", maxWidth: "100%" }}>
          <circle cx="250" cy="250" r="80" stroke={C.accent} strokeWidth="0.6" />
          <circle cx="250" cy="250" r="150" stroke={C.accent} strokeWidth="0.4" />
          <circle cx="250" cy="250" r="230" stroke={C.accent} strokeWidth="0.3" />
          <line x1="20" y1="250" x2="480" y2="250" stroke={C.accent} strokeWidth="0.25" />
          <line x1="250" y1="20" x2="250" y2="480" stroke={C.accent} strokeWidth="0.25" />
          <line x1="80" y1="80" x2="420" y2="420" stroke={C.accent} strokeWidth="0.2" />
          <line x1="420" y1="80" x2="80" y2="420" stroke={C.accent} strokeWidth="0.2" />
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
          <p className="l-rise" style={{ ...eyebrow(C.darkMuted), marginBottom: "1.375rem" }}>
            Workshop Presencial · 08 de julho de 2026 · Balneário Camboriú
          </p>
          <h1 className="l-rise-2" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.5rem,7.5vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: C.darkInk, margin: "0 0 1.75rem" }}>
            A lógica{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>por trás do dinheiro</em>
          </h1>
          <p className="l-rise-3" style={{ fontFamily: SANS, fontSize: "clamp(1rem,1.8vw,1.125rem)", lineHeight: 1.75, color: C.darkMuted, maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            A maioria dos seus problemas com dinheiro não são sobre dinheiro. Descubra como sua consciência funciona — e por que tudo muda quando você percebe isso.
          </p>
          <a href="#inscricao" className="l-rise-4 l-cta" style={{
            display: "inline-block", fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 500, letterSpacing: "0.04em",
            color: C.darkBg, backgroundColor: C.accent, textDecoration: "none",
            padding: "1.0625rem 2.5rem", borderRadius: "2px", transition: "background-color .2s ease",
          }}>Garantir minha vaga — Gratuito</a>
          <p className="l-rise-4" style={{ fontFamily: SANS, fontSize: "0.75rem", color: C.darkMuted, marginTop: "1rem" }}>
            Limitado a 60 pessoas · Entrada gratuita · Inscrição obrigatória
          </p>
        </div>
      </section>

      {/* PAIN INTRO — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.accent)}>Falar sobre dinheiro te incomoda?</p>
          <h2 style={h2Style(C.lightInk)}>
            O sofrimento não vem dos problemas.{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>Vem de como você os carrega.</em>
          </h2>
          {[
            <>Você não consegue cobrar bem pelo seu trabalho. Você sente vergonha de falar sobre dinheiro com seu parceiro. Você ganha, mas o dinheiro não fica. Ou simplesmente não consegue ganhar o suficiente para viver com dignidade.</>,
            <>E pior: você sente uma <strong style={{ fontWeight: 600 }}>impotência profunda</strong>. Uma inferioridade e insuficiência constante. Como se houvesse algo errado com você. Você tenta ganhar mais, economizar, investir. Nada soluciona. A <strong style={{ fontWeight: 600 }}>carga emocional</strong> é tão pesada que você acaba desistindo.</>,
            <>E então, você se culpa. Mas a verdade é diferente do que te contaram. A maioria dos seus problemas com dinheiro <strong style={{ fontWeight: 600 }}>não são sobre dinheiro</strong>. São sobre como sua consciência funciona — padrões inconscientes, crenças herdadas, lealdades sistêmicas. Mas quando você percebe… <strong style={{ fontWeight: 600 }}>tudo muda</strong>.</>,
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: SANS, fontSize: "clamp(1rem,1.5vw,1.0625rem)", lineHeight: 1.75, color: C.lightInk, marginBottom: "1.25rem" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* PAIN MIRROR — DARK */}
      <section style={{ backgroundColor: C.darkBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.darkMuted)}>Você se reconhece</p>
          <h2 style={{ ...h2Style(C.darkInk), marginBottom: "0.75rem" }}>Isso não é uma fraqueza sua.</h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7, color: C.darkMuted, marginBottom: "2.5rem" }}>
            Se você se identifica com um ou mais dos pontos abaixo, saiba que não está sozinho. É algo muito mais profundo do que falta de disciplina.
          </p>
          {painPoints.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.125rem 0", borderBottom: `1px solid ${C.lineDark}` }}>
              <span aria-hidden style={{ color: C.accent, fontSize: "0.875rem", marginTop: "0.25rem", flexShrink: 0, fontWeight: 500 }}>✓</span>
              <div>
                <span style={{ fontFamily: SANS, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent, display: "block", marginBottom: "0.25rem" }}>{p.label}</span>
                <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.7, color: C.darkInk, margin: 0 }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTE — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4.5rem,9vw,7rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div aria-hidden style={{ width: 36, height: 2, backgroundColor: C.accent, margin: "0 auto 2.75rem" }} />
          <blockquote style={{ margin: 0 }}>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.25rem,2.8vw,1.625rem)", lineHeight: 1.58, letterSpacing: "-0.01em", color: C.lightInk, marginBottom: "2rem" }}>
              "A verdade é diferente do que te contaram. Enquanto você não compreender essa <em style={{ color: C.accent }}>lógica sistêmica</em>, continuará tentando resolver sintomas. Mas quando você percebe… <em style={{ color: C.accent }}>tudo muda</em>."
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.lightMuted, margin: 0 }}>
              — Jonas Peress · Ciência Sistêmica
            </p>
          </blockquote>
          <div aria-hidden style={{ width: 36, height: 2, backgroundColor: C.accent, margin: "2.75rem auto 0" }} />
        </div>
      </section>

      {/* ABOUT JONAS — DARK */}
      <section style={{ backgroundColor: C.darkBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={eyebrow(C.darkMuted)}>Quem conduz</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: "2px", overflow: "hidden", aspectRatio: "4/5", backgroundColor: C.darkBgSoft }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: C.darkMuted, fontFamily: SANS, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Foto de Jonas
              </div>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.darkBg}BB 0%, transparent 55%, ${C.accent}0A 100%)` }} />
            </div>
            <div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem,4vw,2.5rem)", lineHeight: 1.12, letterSpacing: "-0.015em", color: C.darkInk, marginBottom: "0.375rem" }}>
                Jonas Peress
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: "1.5rem" }}>
                Facilitador · Ciência Sistêmica
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.75, color: C.darkMuted, marginBottom: "1rem" }}>
                Há mais de uma década investigando os sistemas invisíveis que governam nossas vidas, Jonas sistematizou os padrões que mantêm as pessoas presas em ciclos de escassez — mesmo quando ganham bem, trabalham muito ou já fizeram terapia.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.75, color: C.darkMuted, margin: 0 }}>
                Sua abordagem une <em style={{ color: C.accent, fontStyle: "italic", fontFamily: SERIF }}>ciência sistêmica</em> à leitura de comportamento financeiro inconsciente. Não é terapia convencional — é um sistema de percepção que muda a relação com o dinheiro a partir da raiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS — LIGHT */}
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.accent)}>No Workshop</p>
          <h2 style={{ ...h2Style(C.lightInk), marginBottom: "0.75rem" }}>
            O que você vai{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>compreender</em>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7, color: C.lightMuted, marginBottom: "2.5rem" }}>
            Você sairá deste encontro com uma percepção diferente. Vai acessar a si mesmo de um jeito que nunca foi possível antes.
          </p>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.25rem 0", borderBottom: `1px solid ${C.lineLight}` }}>
              <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.05em", color: C.accent, minWidth: "1.75rem", paddingTop: "0.3rem", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.72, color: C.lightInk, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT INFO — DARK */}
      <section style={{ backgroundColor: C.darkBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.darkMuted)}>O Encontro</p>
          <h2 style={h2Style(C.darkInk)}>
            Um encontro presencial{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>exclusivo</em>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.7, color: C.darkMuted, marginBottom: "2rem" }}>
            Este é um encontro presencial exclusivo em Balneário Camboriú, desenhado para quem busca respostas profundas e definitivas.
          </p>
          {eventDetails.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.125rem 0", borderBottom: `1px solid ${C.lineDark}`, gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.darkMuted, minWidth: "90px", paddingTop: "0.2rem" }}>{d.label}</span>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: SERIF, fontSize: "1.0625rem", fontWeight: d.label === "Investimento" ? 700 : 400, color: d.label === "Investimento" ? C.accent : C.darkInk, margin: 0, lineHeight: 1.3 }}>{d.value}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: C.darkMuted, margin: "0.2rem 0 0" }}>{d.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION FORM — LIGHT */}
      <section id="inscricao" style={{ backgroundColor: C.lightBg, padding: "clamp(5rem,10vw,8rem) 1.5rem" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", border: `1.5px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.25rem", color: C.accent }}>✓</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.5rem,3.5vw,2.25rem)", lineHeight: 1.2, color: C.lightInk, marginBottom: "1rem" }}>Inscrição confirmada.</h2>
              <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7, color: C.lightMuted, marginBottom: "0.5rem" }}>
                O grupo do WhatsApp foi aberto em uma nova aba. Você receberá todas as informações por lá.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: C.lightMuted }}>
                Se a aba não abriu,{" "}
                <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "underline" }}>clique aqui para entrar no grupo</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p style={{ ...eyebrow(C.accent), textAlign: "center" }}>Garanta sua vaga</p>
              <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.875rem,4.5vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: C.lightInk, marginBottom: "0.75rem", textAlign: "center" }}>
                Você merece{" "}
                <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>compreender</em>
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.65, color: C.lightMuted, textAlign: "center", marginBottom: "2.5rem" }}>
                Dia 08 de julho · Balneário Camboriú · Gratuito · 60 vagas
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {([
                  { k: "name" as const, label: "Nome completo", type: "text", placeholder: "Seu nome completo", autoComplete: "name" },
                  { k: "email" as const, label: "E-mail", type: "email", placeholder: "seu@email.com", autoComplete: "email" },
                  { k: "phone" as const, label: "WhatsApp", type: "tel", placeholder: "(47) 99999-0000", autoComplete: "tel" },
                ]).map((f) => (
                  <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor={`f-${f.k}`} style={{ fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500, color: C.lightInk, letterSpacing: "0.02em" }}>
                      {f.label} <span style={{ color: C.accent }}>*</span>
                    </label>
                    <input
                      id={`f-${f.k}`} type={f.type} autoComplete={f.autoComplete}
                      placeholder={f.placeholder} value={fields[f.k]}
                      onChange={(e) => set(f.k, e.target.value)}
                      style={inputStyle(errors[f.k])}
                    />
                    {errors[f.k] && (
                      <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "#C0392B", margin: 0 }}>{errors[f.k]}</p>
                    )}
                  </div>
                ))}
                <button type="submit" className="l-cta" style={{
                  width: "100%", padding: "1.0625rem", backgroundColor: C.accent,
                  color: C.darkBg, border: "none", borderRadius: "2px",
                  fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 500,
                  letterSpacing: "0.04em", cursor: "pointer",
                  transition: "background-color .2s ease",
                }}>
                  Inscrever-se Gratuitamente →
                </button>
                <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: C.lightMuted, textAlign: "center", margin: 0 }}>
                  Ao se inscrever, você será adicionado ao grupo do WhatsApp com todas as informações do evento. Vagas limitadas a 60 pessoas.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ — DARK */}
      <section style={{ backgroundColor: C.darkBg, padding: "clamp(4rem,8vw,6rem) 1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={eyebrow(C.darkMuted)}>Dúvidas Frequentes</p>
          <h2 style={{ ...h2Style(C.darkInk), marginBottom: "2.5rem" }}>
            Respostas{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>diretas</em>
          </h2>
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid ${C.lineDark}` }}>
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
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.0625rem", lineHeight: 1.35, letterSpacing: "-0.01em", color: C.darkInk }}>
                    {f.q}
                  </span>
                  <span aria-hidden style={{ color: C.accent, fontSize: "1.375rem", lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .25s ease" }}>+</span>
                </button>
                <div className={`l-faq-panel${open ? " open" : ""}`}>
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.72, color: C.darkMuted, paddingBottom: "1.375rem", margin: 0 }}>
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
      <section style={{ backgroundColor: C.lightBg, padding: "clamp(4.5rem,9vw,7rem) 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.875rem,4.5vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: C.lightInk, marginBottom: "1.25rem" }}>
            Você merece entender por que funciona{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>do jeito que funciona.</em>
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

      {/* FOOTER — DARK */}
      <footer style={{ backgroundColor: C.darkBg, padding: "3rem 1.5rem", borderTop: `1px solid ${C.lineDark}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: C.darkMuted, margin: 0 }}>
            Jonas Peress · Ciência Sistêmica
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.6875rem", color: C.darkMuted, opacity: 0.4, margin: 0 }}>
            Documento elaborado em 09 de junho de 2026. As informações contidas são de responsabilidade do organizador.
          </p>
        </div>
      </footer>
    </div>
  );
}
