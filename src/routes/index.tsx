import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import truthImage from "@/assets/truth.jpg";
import venueImage from "@/assets/venue.jpg";
import { submitLead } from "@/lib/api/leads.functions";

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

  const inputCls =
    "w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/30 focus:border-accent outline-none min-h-[44px]";
  const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-background/50 mb-2";
  const errCls = "mt-2 font-mono text-[10px] uppercase tracking-widest text-accent";

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
      <section id="inscricao" className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden bg-foreground p-10 text-background md:p-20">
            <div className="relative z-10 grid items-center gap-16 md:grid-cols-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  03 / Garantir vaga
                </span>
                <h2 className="mb-8 mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                  Garanta sua presença.
                </h2>
                <p className="mb-10 text-background/60">
                  As vagas são limitadas a 60 participantes devido à capacidade do auditório. Não
                  deixe para depois o que pode ser a chave da sua liberdade emocional e financeira.
                </p>

                <dl className="mb-10 space-y-4">
                  <Row label="Data" value="29 de julho de 2026" />
                  <Row label="Horário" value="19h30 às 22h30" />
                  <Row label="Local" value="Rua 1500, 820 — 25º andar, Centro, BC" />
                  <Row label="Vagas" value="60 (limitadas)" />
                  <Row label="Investimento" value="Gratuito" accent />
                </dl>

                <p className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">
                  Presencial e gratuito · Sem venda dura durante o evento — a Formação Completa é apresentada apenas ao final, para quem quiser.
                </p>

                <form onSubmit={submit} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="lead-name" className={labelCls}>Nome completo</label>
                    <input
                      id="lead-name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={inputCls}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "lead-name-error" : undefined}
                    />
                    {errors.name && <p id="lead-name-error" className={errCls}>{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="lead-email" className={labelCls}>E-mail</label>
                    <input
                      id="lead-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputCls}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "lead-email-error" : undefined}
                    />
                    {errors.email && <p id="lead-email-error" className={errCls}>{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className={labelCls}>WhatsApp</label>
                    <input
                      id="lead-phone"
                      type="tel"
                      inputMode="numeric"
                      enterKeyHint="send"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      value={fields.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputCls}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                    />
                    {errors.phone && <p id="lead-phone-error" className={errCls}>{errors.phone}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-presencial"
                      className="flex items-start gap-3 py-2 min-h-[44px] cursor-pointer text-sm leading-relaxed text-background/80"
                    >
                      <input
                        id="lead-presencial"
                        type="checkbox"
                        checked={fields.confirmedPresencial}
                        onChange={(e) => setConfirmedPresencial(e.target.checked)}
                        className="mt-1 h-5 w-5 accent-accent"
                        aria-invalid={!!errors.confirmedPresencial}
                        aria-describedby={errors.confirmedPresencial ? "lead-presencial-error" : undefined}
                      />
                      <span>
                        Estou ciente de que o evento é PRESENCIAL em Balneário Camboriú/SC e pretendo comparecer.
                      </span>
                    </label>
                    {errors.confirmedPresencial && (
                      <p id="lead-presencial-error" className={errCls}>{errors.confirmedPresencial}</p>
                    )}
                  </div>

                  {submitError && (
                    <p role="alert" className="font-mono text-xs uppercase tracking-widest text-accent">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="block w-full bg-accent py-5 text-center text-base font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:bg-background disabled:opacity-60 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {submitting ? "Enviando..." : "Quero me inscrever agora"}
                  </button>
                </form>
              </div>
              <div className="hidden md:block">
                <img
                  src={venueImage}
                  alt="Auditório onde o workshop será realizado em Balneário Camboriú"
                  width={800}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-sm object-cover"
                />
              </div>
            </div>
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

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-background/15 pb-3">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-background/50">
        {label}
      </dt>
      <dd
        className={
          accent
            ? "font-display text-lg font-bold tracking-tight text-accent"
            : "text-right text-sm"
        }
      >
        {value}
      </dd>
    </div>
  );
}
