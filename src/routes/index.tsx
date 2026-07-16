import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import truthImage from "@/assets/truth.jpg";
import truthImage800 from "@/assets/truth-800.webp";
import truthImage1600 from "@/assets/truth-1600.webp";
import { submitLead } from "@/lib/api/leads.functions";

// Paleta espelhada da /1 (Paleta C — dourado)
const C = {
  darkBg: "#171D26",
  darkInk: "#FBFAF9",
  darkMuted: "#9AA0AB",
  lightBg: "#FBFAF9",
  lightBgSoft: "#F4F2F1",
  lightInk: "#171D26",
  lightMuted: "#627084",
  accent: "#C9A84C",
  accentDeep: "#9E7E30",
  accentLight: "#E0C878",
  lineDark: "#2A313B",
  lineLight: "#E5E3E0",
} as const;

const SERIF = "'Playfair Display', Georgia, serif";
const DISPLAY = "'Inter Tight', sans-serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const inputStyle = (err?: string): React.CSSProperties => ({
  width: "100%", boxSizing: "border-box",
  backgroundColor: C.lightBgSoft,
  border: `1px solid ${err ? "#C0392B" : C.lineLight}`,
  borderRadius: "2px", padding: "0.875rem 1rem",
  fontFamily: SANS, fontSize: "1rem", color: C.lightInk,
  outline: "none", caretColor: C.accent,
  transition: "border-color .25s ease, box-shadow .25s ease, background-color .25s ease",
});

const SITE_URL = "https://logicajp.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Lógica — Dinheiro & Abundância Sistêmica | Workshop com Jonas" },
      {
        name: "description",
        content:
          "Workshop presencial gratuito em Balneário Camboriú, 29 de julho de 2026. Compreenda a lógica sistêmica que governa sua relação com o dinheiro. 60 vagas.",
      },
      { property: "og:title", content: "A Lógica — Dinheiro & Abundância Sistêmica" },
      {
        property: "og:description",
        content:
          "Workshop presencial gratuito em Balneário Camboriú. 29 de julho de 2026. Vagas limitadas.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}${truthImage}` },
      { name: "twitter:image", content: `${SITE_URL}${truthImage}` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "A Lógica — Dinheiro & Abundância Sistêmica",
          startDate: "2026-07-29T19:30:00-03:00",
          endDate: "2026-07-29T22:30:00-03:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Auditório - Centro de Balneário Camboriú",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua 1500, 820 - 25º andar",
              addressLocality: "Balneário Camboriú",
              addressRegion: "SC",
              addressCountry: "BR",
            },
          },
          description:
            "Workshop presencial gratuito sobre a lógica sistêmica do dinheiro e da abundância.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
            availability: "https://schema.org/LimitedAvailability",
          },
          performer: { "@type": "Person", name: "Jonas" },
        }),
      },
    ],
  }),
  component: Index,
});

const pains = [
  "Você não consegue cobrar pelo seu trabalho — sente vergonha e acha que não merece receber.",
  "Tem dificuldade de colocar valor nas suas ofertas — o medo da rejeição paralisa sua precificação.",
  "Não consegue falar sobre dinheiro com seu parceiro — vergonha e medo constante de julgamento.",
  "Ganha bem, mas o dinheiro não fica — como se houvesse um teto invisível impedindo seu crescimento.",
  "Vive mergulhado em sentimentos de impotência e inferioridade frente às questões financeiras.",
  "Carrega ansiedade, medo e culpa como companheiros diários ao lidar com dinheiro.",
];

const discoveries = [
  {
    n: "01",
    title: "A origem da vergonha",
    body: "Por que falar sobre dinheiro te paralisa — e como dissolver esse peso na raiz.",
  },
  {
    n: "02",
    title: "Lealdades invisíveis",
    body: "Os padrões herdados que te mantêm preso à escassez para pertencer ao seu sistema familiar.",
  },
  {
    n: "03",
    title: "O motivo sistêmico",
    body: "Por que o dinheiro não fica com você — ou nem chega a entrar — independente do seu esforço.",
  },
  {
    n: "04",
    title: "A lógica que governa",
    body: "Qual é a lógica sistêmica que opera silenciosamente na sua vida material hoje.",
  },
  {
    n: "05",
    title: "Destravar a cobrança",
    body: "Por que você tem dificuldade real de cobrar pelo seu trabalho — e como mudar isso.",
  },
  {
    n: "06",
    title: "Mudança na raiz",
    body: "Como realizar uma mudança de postura real, não superficial, mas na raiz da sua consciência.",
  },
];

const faqs = [
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
    a: "O workshop é completo em si mesmo. Para quem desejar aprofundamento, Jonas apresentará ao final os detalhes da Formação Completa em Ciência Sistêmica.",
  },
];

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: "", email: "", phone: "", confirmedPresencial: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; confirmedPresencial?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (k: "name" | "email" | "phone", v: string) => {
    setFields((p) => ({ ...p, [k]: k === "phone" ? maskPhone(v) : v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const setConfirmedPresencial = (v: boolean) => {
    setFields((p) => ({ ...p, confirmedPresencial: v }));
    if (errors.confirmedPresencial) setErrors((p) => ({ ...p, confirmedPresencial: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (fields.name.trim().length < 3) errs.name = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Informe um e-mail válido.";
    if (fields.phone.replace(/\D/g, "").length < 10) errs.phone = "Informe um telefone com DDD.";
    if (!fields.confirmedPresencial) errs.confirmedPresencial = "Confirme que está ciente de que o evento é presencial.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitLead({
        data: {
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone,
          confirmedPresencial: fields.confirmedPresencial,
          source: "landing_principal",
        },
      });
      sessionStorage.setItem("lead_ok", "1");
      navigate({ to: "/obrigado" });
    } catch {
      setSubmitError("Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <span className="font-display text-xl font-bold tracking-tighter">A LÓGICA</span>
        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted md:block">
            29 Julho 2026 — Balneário Camboriú
          </span>
          <a
            href="#inscricao"
            className="inline-flex min-h-[44px] items-center bg-foreground px-5 py-2 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Inscrever-se
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 inline-block">
            <span className="rounded-full border border-accent/30 px-3 py-1 font-mono text-xs text-accent">
              Workshop Presencial Gratuito
            </span>
          </div>
          <h1 className="mb-12 text-balance font-display text-6xl font-extrabold leading-[0.9] tracking-tighter md:text-8xl">
            Dinheiro &amp;
            <br />
            <span className="font-normal italic text-accent">Abundância Sistêmica</span>
          </h1>

          <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="max-w-[36ch] text-pretty text-xl leading-relaxed text-muted md:text-2xl">
                Uma investigação profunda sobre as leis invisíveis que governam sua prosperidade
                financeira e os emaranhados geracionais que a sustentam.
              </p>
            </div>
            <div className="flex flex-col gap-5 border-l border-border pl-8 md:col-span-5">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Data e Local
                </span>
                <p className="font-medium">Quarta-feira, 29 de Julho · 19h30</p>
                <p className="text-sm text-muted">Balneário Camboriú, SC</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Disponibilidade
                </span>
                <p className="font-medium">Apenas 60 vagas presenciais</p>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
        />
      </header>

      {/* Dores */}
      <section className="bg-foreground py-28 text-background md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <div className="space-y-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                01 / Reconhecimento
              </span>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Você se reconhece em algum destes padrões?
              </h2>
              <p className="max-w-md text-background/60">
                Se você se identifica com um ou mais dos pontos ao lado, saiba: isso não é uma
                fraqueza sua. É algo muito mais profundo.
              </p>
            </div>
            <ul className="space-y-6">
              {pains.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-6 border-b border-background/10 pb-6 last:border-0"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed opacity-80 md:text-lg">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* A Verdade */}
      <section className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <img
            src={truthImage}
            srcSet={`${truthImage800} 800w, ${truthImage1600} 1600w`}
            sizes="(max-width: 768px) 100vw, 896px"
            alt="Luz atravessando uma superfície cristalina escura"
            width={1600}
            height={768}
            loading="lazy"
            decoding="async"
            className="mb-16 aspect-[21/9] w-full rounded-sm object-cover opacity-90"
          />
          <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">
            A Verdade Que Ninguém Te Contou
          </h2>
          <blockquote className="mb-10 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            "A maioria dos seus problemas com dinheiro não são sobre dinheiro. São sobre como sua
            consciência funciona."
          </blockquote>
          <p className="mx-auto max-w-xl leading-relaxed text-muted">
            Enquanto você não compreender a lógica sistêmica por trás disso, continuará tentando
            resolver sintomas. E sintomas, por definição, sempre voltam se a raiz não for tratada.
          </p>
        </div>
      </section>

      {/* O que vai descobrir */}
      <section className="bg-surface py-28 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                02 / Conteúdo
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                O que você vai descobrir
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Você sairá deste encontro com uma percepção diferente — vai acessar a si mesmo de um
              jeito que nunca pôde antes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {discoveries.map((d) => (
              <div key={d.n} className="space-y-5 bg-surface p-10 md:p-12">
                <span className="font-display text-3xl font-bold text-accent/40">{d.n}</span>
                <h3 className="text-xl font-bold">{d.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Detalhes */}
      <section id="inscricao" style={{
        position: "relative", overflow: "hidden",
        backgroundColor: C.darkBg, color: C.darkInk,
        padding: "clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,3rem)",
        borderTop: `1px solid ${C.lineDark}`,
      }}>
        <style>{`
          @keyframes l-spin { to { transform: rotate(360deg); } }
          @keyframes l-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.35); } }
          #inscricao .l-cta:hover { background-color: ${C.accentLight} !important; transform: translateY(-1px); }
          #inscricao input:focus { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accent}22; }
          #inscricao .l-cta:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
          #inscricao input[type="checkbox"]:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
          #inscricao .form-card { transition: box-shadow .4s ease, transform .4s ease; }
          #inscricao .form-card:hover { box-shadow: 0 40px 100px -30px ${C.darkBg}CC, 0 0 0 1px ${C.accent}40; transform: translateY(-2px); }
        `}</style>

        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 60% 50% at 85% 20%, ${C.accent}22, transparent 60%), radial-gradient(ellipse 50% 45% at 5% 90%, ${C.accent}14, transparent 60%)`,
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
              <span style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent }}>
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
              <span style={{ color: C.accent, fontStyle: "italic", fontWeight: 400 }}>compreender</span>
            </h2>

            <p style={{
              fontFamily: SANS, fontSize: "1rem", lineHeight: 1.7,
              color: C.darkMuted, margin: "0 0 2rem", maxWidth: "38ch",
            }}>
              Uma noite presencial em Balneário Camboriú dedicada às leis sistêmicas invisíveis que governam sua relação com o dinheiro.
            </p>

            <div style={{ display: "grid", gap: "0.875rem", maxWidth: "360px" }}>
              {[
                { k: "Quando", v: "29 jul · 2026 · 19h30" },
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
            <div aria-hidden style={{
              position: "absolute", top: 0, left: "1.5rem", right: "1.5rem",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
            }} />

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentDeep, margin: "0 0 0.625rem" }}>
                Garanta sua vaga
              </p>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)", lineHeight: 1.2, letterSpacing: "-0.015em", color: C.lightInk, margin: 0 }}>
                Preencha para receber o acesso ao grupo.
              </h3>
            </div>

            <p style={{
              fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: C.accentDeep, margin: "0 0 1.25rem", lineHeight: 1.55,
            }}>
              Presencial e gratuito · Sem venda dura durante o evento — a Formação Completa é apresentada apenas ao final, para quem quiser.
            </p>

            <form onSubmit={submit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {([
                  { k: "name" as const, label: "Nome completo", type: "text", placeholder: "Seu nome completo", autoComplete: "name", inputMode: undefined as React.HTMLAttributes<HTMLInputElement>["inputMode"], enterKeyHint: "next" as const },
                  { k: "email" as const, label: "E-mail", type: "email", placeholder: "seu@email.com", autoComplete: "email", inputMode: "email" as const, enterKeyHint: "next" as const },
                  { k: "phone" as const, label: "WhatsApp", type: "tel", placeholder: "(47) 99999-0000", autoComplete: "tel", inputMode: "numeric" as const, enterKeyHint: "send" as const },
                ]).map((f) => (
                  <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: "0.4375rem" }}>
                    <label htmlFor={`f-${f.k}`} style={{ fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.lightMuted }}>
                      {f.label}
                    </label>
                    <input
                      id={`f-${f.k}`} type={f.type} autoComplete={f.autoComplete}
                      inputMode={f.inputMode} enterKeyHint={f.enterKeyHint}
                      placeholder={f.placeholder} value={fields[f.k]}
                      onChange={(e) => set(f.k, e.target.value)}
                      aria-invalid={!!errors[f.k]}
                      aria-describedby={errors[f.k] ? `f-${f.k}-error` : undefined}
                      style={inputStyle(errors[f.k])}
                    />
                    {errors[f.k] && (
                      <p id={`f-${f.k}-error`} style={{ fontFamily: SANS, fontSize: "0.75rem", color: "#C0392B", margin: 0 }}>{errors[f.k]}</p>
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4375rem" }}>
                  <label
                    htmlFor="confirmedPresencial"
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "0.625rem",
                      padding: "0.625rem 0", minHeight: "44px",
                      cursor: "pointer",
                      fontFamily: SANS, fontSize: "0.8125rem", lineHeight: 1.5,
                      color: C.lightMuted,
                    }}
                  >
                    <input
                      id="confirmedPresencial"
                      type="checkbox"
                      checked={fields.confirmedPresencial}
                      onChange={(e) => setConfirmedPresencial(e.target.checked)}
                      aria-invalid={!!errors.confirmedPresencial}
                      aria-describedby={errors.confirmedPresencial ? "confirmedPresencial-error" : undefined}
                      style={{
                        accentColor: C.accentDeep,
                        width: "1.125rem", height: "1.125rem",
                        marginTop: "0.15rem", flexShrink: 0, cursor: "pointer",
                        outlineOffset: "2px",
                        border: `1px solid ${errors.confirmedPresencial ? "#C0392B" : C.lineLight}`,
                      }}
                    />
                    <span>Estou ciente de que o evento é PRESENCIAL em Balneário Camboriú/SC e pretendo comparecer.</span>
                  </label>
                  {errors.confirmedPresencial && (
                    <p id="confirmedPresencial-error" style={{ fontFamily: SANS, fontSize: "0.75rem", color: "#C0392B", margin: 0 }}>
                      {errors.confirmedPresencial}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={submitting} className="l-cta" style={{
                  marginTop: "0.5rem",
                  width: "100%", padding: "1.125rem", backgroundColor: C.accentDeep,
                  color: C.lightBg, border: "none", borderRadius: "2px",
                  fontFamily: SANS, fontSize: "0.9375rem", fontWeight: 600,
                  letterSpacing: "0.02em", cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.75 : 1,
                  transition: "background-color .2s ease, transform .2s ease, opacity .2s ease",
                  boxShadow: `0 14px 36px -14px ${C.accentDeep}AA`,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
                }}>
                  {submitting ? (
                    <>
                      <span aria-hidden style={{
                        width: "0.9em", height: "0.9em", borderRadius: "50%",
                        border: `2px solid ${C.lightBg}`, borderTopColor: "transparent",
                        display: "inline-block", animation: "l-spin .8s linear infinite",
                      }} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Confirmar minha inscrição
                      <span aria-hidden style={{ fontSize: "1.1em", lineHeight: 1 }}>→</span>
                    </>
                  )}
                </button>

                {submitError && (
                  <p role="alert" style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "#C0392B", margin: 0, lineHeight: 1.5 }}>
                    {submitError}
                  </p>
                )}

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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-28 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              04 / Dúvidas
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Perguntas frequentes
            </h2>
          </div>
          <div>
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              const triggerId = `faq-trigger-${i}`;
              const panelId = `faq-panel-${i}`;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    id={triggerId}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-7 text-left transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <h3 className="pr-6 font-bold">{item.q}</h3>
                    <span className="font-mono text-xl text-accent">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="animate-reveal pb-7 pr-10 text-sm leading-relaxed text-muted"
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="bg-surface px-6 py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl">
            Você merece compreender.
          </h2>
          <p className="mb-10 text-muted">
            Dia 29 de julho. Vagas limitadas. Jonas está esperando por você.
          </p>
          <a
            href="#inscricao"
            className="inline-block bg-foreground px-10 py-5 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Garantir meu lugar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-display text-lg font-bold tracking-tighter">A LÓGICA</span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            © 2026 Jonas Sistêmica — Balneário Camboriú, SC
          </p>
        </div>
      </footer>

      {/* Sticky CTA mobile */}
      <a
        href="#inscricao"
        aria-label="Garantir minha vaga no workshop"
        className="fixed inset-x-4 bottom-4 z-50 flex min-h-[52px] items-center justify-center rounded-full border border-accent bg-foreground px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
      >
        Garantir vaga · 29 jul
      </a>
      <div aria-hidden className="h-20 md:hidden" />
    </div>
  );
}


