import { createFileRoute } from "@tanstack/react-router";

const C = {
  bg: "#0A0F0C",
  bgSoft: "#0E1510",
  ink: "#E8F0EB",
  muted: "#8A9A91",
  mutedDeep: "#4A5C51",
  accent: "#3ECF8E",
  accentDeep: "#27A36D",
  line: "#182420",
  gold: "#5CDBA0",
} as const;

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

export const Route = createFileRoute("/3")({
  head: () => ({
    meta: [
      { title: "A Lógica — Dinheiro e Abundância Sistêmica · Workshop com Jonas Peress" },
      {
        name: "description",
        content:
          "Workshop presencial gratuito em Balneário Camboriú. Entenda a lógica sistêmica por trás dos seus padrões com dinheiro. 08 de julho de 2026.",
      },
      { property: "og:title", content: "A Lógica — Workshop Presencial · Jonas Peress" },
      {
        property: "og:description",
        content:
          "A maioria dos seus problemas com dinheiro não são sobre dinheiro. 60 vagas. Balneário Camboriú.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap",
      },
    ],
  }),
  component: Page3,
});

const painPoints = [
  { strong: "Você não consegue cobrar pelo seu trabalho", rest: " — sente vergonha e acha que não merece receber." },
  { strong: "Você tem dificuldade de colocar valor", rest: " nas suas ofertas — o medo da rejeição paralisa sua precificação." },
  { strong: "Você não consegue falar sobre dinheiro com seu parceiro", rest: " — sente vergonha e medo constante de julgamento." },
  { strong: "Você ganha bem, mas o dinheiro não fica", rest: " — é como se houvesse um teto invisível impedindo seu crescimento." },
  { strong: "Você não consegue ganhar o suficiente", rest: " — vive mergulhado em sentimentos de impotência e inferioridade." },
  { strong: "Você carrega uma carga emocional pesada", rest: " ao lidar com finanças — ansiedade, medo e culpa são companhia diária." },
  { strong: "Você sente que há algo errado com você", rest: " — como se a abundância não fosse para o seu jeito de ser." },
];

const benefits = [
  { v: "Entenda", t: " por que você tem dificuldade real de cobrar pelo seu trabalho — e como destravar isso." },
  { v: "Descubra", t: " a origem da vergonha de falar sobre dinheiro e como se libertar desse peso." },
  { v: "Compreenda", t: " o motivo sistêmico pelo qual o dinheiro não fica com você (ou nem chega a entrar)." },
  { v: "Veja", t: " por que você se sente inferior e impotente frente às questões financeiras." },
  { v: "Reconheça", t: " qual é a lógica sistêmica que governa sua vida material hoje." },
  { v: "Realize", t: " uma mudança de postura real — não superficial, mas na raiz da sua consciência." },
];

const faq = [
  {
    q: "Preciso ter conhecimento prévio sobre Ciência Sistêmica?",
    a: "Não. O workshop é estruturado para quem está começando do zero. Você aprenderá tudo o que precisa para compreender sua própria dinâmica.",
  },
  {
    q: "Isso é uma sessão de terapia em grupo?",
    a: "Não. É uma imersão em compreensão sistêmica aplicada. O foco é entender a lógica por trás dos seus padrões para que você possa alterá-los.",
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "A mudança de percepção é imediata. Muitas pessoas relatam insights transformadores durante o próprio evento. A consolidação acontece conforme você integra essa nova visão.",
  },
  {
    q: "O que acontece depois do evento?",
    a: "O workshop é completo em si mesmo. Para quem desejar aprofundamento, Jonas apresentará os detalhes da Formação Completa em Ciência Sistêmica ao final.",
  },
];

const info = [
  { label: "Data", value: "08 de julho de 2026 · segunda" },
  { label: "Horário", value: "19h30 às 22h30" },
  { label: "Local", value: "Rua 1500, 820 · 25º andar · Centro · Balneário Camboriú" },
  { label: "Capacidade", value: "Limitada a 60 pessoas" },
  { label: "Investimento", value: "Gratuito" },
];

function Page3() {
  return (
    <div
      style={{
        backgroundColor: C.bg,
        color: C.ink,
        minHeight: "100vh",
        fontFamily: SANS,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        .al-cta:hover { background-color: ${C.gold} !important; }
        .al-cta-ghost:hover { background-color: ${C.accent}18 !important; border-color: ${C.accent}66 !important; }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem",
          backgroundColor: `${C.bg}CC`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted }}>
          Ciência Sistêmica
        </span>
        <a
          href="#inscricao"
          className="al-cta-ghost"
          style={{
            fontFamily: SANS, fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em",
            color: C.accent, textDecoration: "none",
            padding: "0.5rem 1rem", border: `1px solid ${C.accent}33`, borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
        >
          Inscrever-se
        </a>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          paddingTop: "clamp(6rem, 14vw, 10rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)",
          paddingLeft: "1.5rem", paddingRight: "1.5rem",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${C.accent}14 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <svg
            width="640" height="640" viewBox="0 0 600 600" fill="none"
            style={{ opacity: 0.14, maxWidth: "100%", maxHeight: "100%" }}
          >
            {[60, 110, 160, 210, 260].map((r, i) => (
              <circle key={r} cx="300" cy="300" r={r} stroke={C.accent} strokeWidth={i % 2 === 0 ? 0.8 : 0.4} />
            ))}
            {[0, 45, 90, 135].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={angle}
                  x1={300 + Math.cos(rad) * 260} y1={300 + Math.sin(rad) * 260}
                  x2={300 - Math.cos(rad) * 260} y2={300 - Math.sin(rad) * 260}
                  stroke={C.accent} strokeWidth={0.3}
                />
              );
            })}
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.75rem" }}>
            Workshop Presencial · 08 de julho de 2026
          </p>
          <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.5rem, 7.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 1.75rem" }}>
            A <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>lógica</em>
            <br />por trás do dinheiro
          </h1>
          <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.7, color: C.muted, maxWidth: "540px", margin: "0 auto 2.5rem" }}>
            A maioria dos seus problemas com dinheiro <strong style={{ color: C.ink, fontWeight: 600 }}>não são sobre dinheiro</strong>. São sobre como sua <em style={{ color: C.accent, fontStyle: "italic", fontFamily: SERIF }}>consciência</em> funciona.
          </p>
          <a
            href="#inscricao"
            className="al-cta"
            style={{
              display: "inline-block", fontFamily: SANS, fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.04em",
              color: C.bg, backgroundColor: C.accent, textDecoration: "none",
              padding: "1.05rem 2.5rem", borderRadius: "2px", transition: "background-color 0.2s ease",
            }}
          >
            Garantir minha vaga — Gratuito
          </a>
          <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: C.muted, marginTop: "1.25rem" }}>
            <strong style={{ color: C.ink, fontWeight: 600 }}>60 pessoas</strong> · Balneário Camboriú
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: `1px solid ${C.line}`, margin: 0 }} />

      {/* PAIN MIRROR */}
      <section style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.25rem" }}>
            Você se reconhece
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.85rem, 4vw, 2.75rem)", lineHeight: 1.15, letterSpacing: "-0.015em", color: C.ink, margin: "0 0 2.5rem" }}>
            Isso não é uma fraqueza sua.{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>É algo muito mais profundo.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span aria-hidden style={{ color: C.accent, fontSize: "0.9rem", marginTop: "0.4rem", flexShrink: 0, fontWeight: 600 }}>✓</span>
                <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7, color: C.ink, margin: 0 }}>
                  <strong style={{ color: C.ink, fontWeight: 600 }}>{p.strong}</strong>
                  <span style={{ color: C.muted }}>{p.rest}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem", backgroundColor: C.bgSoft, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div aria-hidden style={{ width: 40, height: 1, backgroundColor: C.accent, margin: "0 auto 2.5rem" }} />
          <blockquote style={{ margin: 0 }}>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.35rem, 3vw, 1.85rem)", lineHeight: 1.45, letterSpacing: "-0.01em", color: C.ink, margin: "0 0 2rem" }}>
              "A verdade é diferente do que te contaram. Enquanto você não compreender essa <em style={{ color: C.accent }}>lógica sistêmica</em>, continuará tentando resolver sintomas. Mas quando você percebe… <em style={{ color: C.accent }}>tudo muda</em>."
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, margin: 0 }}>
              — Jonas Peress
            </p>
          </blockquote>
          <div aria-hidden style={{ width: 40, height: 1, backgroundColor: C.accent, margin: "2.5rem auto 0" }} />
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.25rem" }}>
            No workshop
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.85rem, 4vw, 2.75rem)", lineHeight: 1.15, letterSpacing: "-0.015em", color: C.ink, margin: "0 0 3rem" }}>
            O que você vai{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>compreender</em>
          </h2>
          <div>
            {benefits.map((b, i) => (
              <div key={i}
                style={{
                  display: "grid", gridTemplateColumns: "40px 1fr", gap: "1.25rem", alignItems: "baseline",
                  padding: "1.5rem 0",
                  borderTop: i === 0 ? `1px solid ${C.line}` : "none",
                  borderBottom: `1px solid ${C.line}`,
                }}
              >
                <span style={{ fontFamily: SERIF, fontStyle: "italic", color: C.accent, fontSize: "1.1rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontFamily: SANS, fontSize: "1.02rem", lineHeight: 1.65, color: C.ink, margin: 0 }}>
                  <strong style={{ color: C.ink, fontWeight: 600 }}>{b.v}</strong>
                  <span style={{ color: C.muted }}>{b.t}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE JONAS */}
      <section style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem", backgroundColor: C.bgSoft, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.25rem" }}>
            Quem conduz
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", lineHeight: 1.2, letterSpacing: "-0.015em", color: C.ink, margin: "0 0 1.5rem" }}>
            Jonas Peress
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "1.02rem", lineHeight: 1.75, color: C.muted, margin: "0 0 1.25rem" }}>
            Há mais de uma década investigando as estruturas invisíveis que governam comportamento financeiro — crenças herdadas, lealdades sistêmicas e padrões inconscientes que determinam o que você consegue receber, reter e construir.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "1.02rem", lineHeight: 1.75, color: C.muted, margin: 0 }}>
            Sua abordagem une <em style={{ color: C.accent, fontStyle: "italic", fontFamily: SERIF }}>ciência sistêmica</em> e leitura de consciência aplicada a finanças. Não é coaching. Não é terapia convencional. É um sistema de percepção.
          </p>
        </div>
      </section>

      {/* INFORMAÇÕES DO EVENTO */}
      <section id="inscricao" style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(2rem, 4vw, 3rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.25rem" }}>
            O encontro
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.85rem, 4vw, 2.75rem)", lineHeight: 1.15, letterSpacing: "-0.015em", color: C.ink, margin: "0 0 2.5rem" }}>
            Informações do{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>evento</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {info.map((it) => (
              <div key={it.label} style={{ padding: "1.5rem", border: `1px solid ${C.line}`, borderRadius: 2, backgroundColor: C.bgSoft }}>
                <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted, margin: "0 0 0.6rem" }}>
                  {it.label}
                </p>
                <p style={{ fontFamily: SERIF, fontSize: "1.05rem", lineHeight: 1.45, color: C.ink, margin: 0 }}>
                  {it.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.01em", color: C.ink, margin: "0 0 1.5rem" }}>
            Você merece compreender{" "}
            <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>como funciona</em>.
          </h3>
          <p style={{ fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7, color: C.muted, margin: "0 0 2.5rem" }}>
            Sair do ciclo de impotência começa por entender a lógica. Garanta seu lugar no encontro.
          </p>
          <a
            href="#inscricao"
            className="al-cta"
            style={{
              display: "inline-block", fontFamily: SANS, fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.04em",
              color: C.bg, backgroundColor: C.accent, textDecoration: "none",
              padding: "1.05rem 2.5rem", borderRadius: 2, transition: "background-color 0.2s ease",
            }}
          >
            Garantir meu lugar em "A Lógica"
          </a>
          <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: C.muted, marginTop: "1.25rem" }}>
            Dia 08 de julho · <strong style={{ color: C.ink, fontWeight: 600 }}>60 pessoas</strong> · Vagas limitadas
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)", paddingLeft: "1.5rem", paddingRight: "1.5rem", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "1.25rem" }}>
            Dúvidas frequentes
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", lineHeight: 1.2, letterSpacing: "-0.015em", color: C.ink, margin: "0 0 2.5rem" }}>
            FAQ
          </h2>
          <div>
            {faq.map((f, i) => (
              <details key={i} style={{ borderTop: i === 0 ? `1px solid ${C.line}` : "none", borderBottom: `1px solid ${C.line}`, padding: "1.25rem 0" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", fontFamily: SERIF, fontWeight: 700, fontSize: "1.1rem", color: C.ink, display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <span>{f.q}</span>
                  <span aria-hidden style={{ color: C.accent, fontFamily: SANS, fontWeight: 400 }}>+</span>
                </summary>
                <p style={{ fontFamily: SANS, fontSize: "0.98rem", lineHeight: 1.75, color: C.muted, margin: "1rem 0 0" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "3rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, margin: 0 }}>
          Ciência Sistêmica · Jonas Peress · 2026
        </p>
      </footer>
    </div>
  );
}
