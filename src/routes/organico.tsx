import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/organico")({
  head: () => ({
    meta: [
      { title: "A Lógica — Dinheiro & Abundância Sistêmica (Orgânico)" },
      {
        name: "description",
        content:
          "Workshop presencial gratuito em Balneário Camboriú, 08 de julho de 2026. Variação visual orgânico-terapêutica.",
      },
      { property: "og:title", content: "A Lógica — Dinheiro & Abundância Sistêmica" },
      {
        property: "og:description",
        content:
          "Workshop presencial gratuito em Balneário Camboriú. 08 de julho de 2026. Vagas limitadas.",
      },
    ],
    links: [
      { rel: "canonical", href: "/organico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: OrganicoPage,
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
  { n: "01", title: "A origem da vergonha", body: "Por que falar sobre dinheiro te paralisa — e como dissolver esse peso na raiz." },
  { n: "02", title: "Lealdades invisíveis", body: "Os padrões herdados que te mantêm preso à escassez para pertencer ao seu sistema familiar." },
  { n: "03", title: "O motivo sistêmico", body: "Por que o dinheiro não fica com você — ou nem chega a entrar — independente do seu esforço." },
  { n: "04", title: "A lógica que governa", body: "Qual é a lógica sistêmica que opera silenciosamente na sua vida material hoje." },
  { n: "05", title: "Destravar a cobrança", body: "Por que você tem dificuldade real de cobrar pelo seu trabalho — e como mudar isso." },
  { n: "06", title: "Mudança na raiz", body: "Como realizar uma mudança de postura real, não superficial, mas na raiz da sua consciência." },
];

const faqs = [
  { q: "Preciso ter conhecimento prévio sobre Ciência Sistêmica?", a: "Não. O workshop é estruturado para quem está começando do zero. Você aprenderá tudo o que precisa para compreender sua própria dinâmica." },
  { q: "Isso é uma sessão de terapia em grupo?", a: "Não. É uma imersão em compreensão sistêmica aplicada. O foco é entender a lógica por trás dos seus padrões para que você possa alterá-los." },
  { q: "Quanto tempo leva para ver resultados?", a: "A mudança de percepção é imediata. Muitas pessoas relatam insights transformadores durante o próprio evento." },
  { q: "O que acontece depois do evento?", a: "O workshop é completo em si mesmo. Para quem desejar aprofundamento, Jonas apresentará ao final os detalhes da Formação Completa." },
];

const serif = { fontFamily: "'Cormorant Garamond', serif" } as const;
const sans = { fontFamily: "'Inter', sans-serif" } as const;

function OrganicoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2d2a26] selection:bg-[#e8decb]" style={sans}>
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#e8e2d8]/60 bg-[#fdfbf7]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span style={serif} className="text-2xl font-light tracking-tight text-[#2d2a26]">
            A <span className="italic text-[#8c7851]">Lógica</span>
          </span>
          <a
            href="#inscricao"
            className="rounded-full bg-[#2d2a26] px-6 py-2 text-[11px] uppercase tracking-[0.2em] text-[#fdfbf7] transition-colors hover:bg-[#3d3a35]"
          >
            Inscrever-se
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#f3efe6] opacity-60 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-72 h-96 w-96 rounded-full bg-[#e9e2d5] opacity-50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#8c7851]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c7851]">
              Workshop Presencial Gratuito
            </span>
            <span className="h-px w-8 bg-[#8c7851]" />
          </div>

          <h1
            style={serif}
            className="mb-10 text-center text-6xl font-light leading-[0.95] text-[#2d2a26] md:text-8xl"
          >
            Dinheiro <span className="italic font-normal">&amp;</span>
            <br />
            <span className="text-[#8c7851]">Abundância</span> Sistêmica
          </h1>

          <p className="mx-auto mb-16 max-w-2xl text-center text-lg font-light leading-relaxed text-[#5a544d] md:text-xl">
            Uma investigação profunda sobre as leis invisíveis que governam sua prosperidade
            financeira e os emaranhados geracionais que a sustentam.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#e8e2d8] bg-[#e8e2d8] shadow-sm md:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-3 bg-[#fcfaf7] p-8 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#a39a8d]">Data e Local</span>
              <p style={serif} className="text-2xl text-[#2d2a26]">
                Quarta-feira, 08 de Julho · 19h30
              </p>
              <p className="text-sm text-[#8c7851]">Balneário Camboriú, SC</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 bg-[#fcfaf7] p-8 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#a39a8d]">Disponibilidade</span>
              <p style={serif} className="text-2xl text-[#2d2a26]">Apenas 60 vagas presenciais</p>
              <p className="text-sm italic text-[#8c7851]">Entrada gratuita mediante inscrição</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dores */}
      <section className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8c7851]">01 — Reconhecimento</span>
            <h2 style={serif} className="mt-5 text-4xl font-light leading-tight text-[#2d2a26] md:text-5xl">
              Você se reconhece em algum <br />
              <span className="italic text-[#8c7851]">destes padrões?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[#5a544d]">
              Se você se identifica com um ou mais dos pontos abaixo, saiba: isso não é uma fraqueza sua.
              É algo muito mais profundo.
            </p>
          </div>

          <ul className="space-y-px overflow-hidden rounded-2xl border border-[#e8e2d8] bg-[#e8e2d8]">
            {pains.map((p, i) => (
              <li key={i} className="flex gap-6 bg-[#fcfaf7] p-7 md:p-8">
                <span style={serif} className="text-3xl italic text-[#8c7851]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 leading-relaxed text-[#3d3a35] md:text-lg">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Verdade */}
      <section className="bg-[#f3efe6] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8c7851]">
            A verdade que ninguém te contou
          </span>
          <blockquote
            style={serif}
            className="mt-10 text-3xl font-light leading-[1.15] text-[#2d2a26] md:text-5xl"
          >
            <span className="text-[#8c7851]">“</span>A maioria dos seus problemas com dinheiro não são
            sobre <span className="italic">dinheiro</span>. São sobre como sua{" "}
            <span className="italic">consciência</span> funciona.<span className="text-[#8c7851]">”</span>
          </blockquote>
          <p className="mx-auto mt-12 max-w-xl leading-relaxed text-[#5a544d]">
            Enquanto você não compreender a lógica sistêmica por trás disso, continuará tentando
            resolver sintomas. E sintomas, por definição, sempre voltam se a raiz não for tratada.
          </p>
        </div>
      </section>

      {/* Descobertas */}
      <section className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8c7851]">02 — Conteúdo</span>
            <h2 style={serif} className="mt-5 text-4xl font-light leading-tight text-[#2d2a26] md:text-5xl">
              O que você vai <span className="italic text-[#8c7851]">descobrir</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[#5a544d]">
              Você sairá deste encontro com uma percepção diferente — vai acessar a si mesmo de um jeito
              que nunca pôde antes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discoveries.map((d) => (
              <article
                key={d.n}
                className="group rounded-3xl border border-[#e8e2d8] bg-[#fcfaf7] p-8 transition-shadow hover:shadow-md"
              >
                <span style={serif} className="block text-4xl italic text-[#8c7851]/70">
                  {d.n}
                </span>
                <h3 style={serif} className="mt-5 text-2xl font-normal text-[#2d2a26]">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a544d]">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="inscricao" className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2d2a26] p-10 text-[#fdfbf7] shadow-xl md:p-16">
            <div aria-hidden className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#8c7851]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#8c7851]/10 blur-3xl" />
            <div className="relative z-10 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4b08a]">
                03 — Garantir Vaga
              </span>
              <h2 style={serif} className="mt-5 text-4xl font-light leading-tight md:text-5xl">
                Garanta sua <span className="italic text-[#c4b08a]">presença.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-[#a39a8d]">
                As vagas são limitadas a 60 participantes devido à capacidade do auditório. Não deixe
                para depois o que pode ser a chave da sua liberdade emocional e financeira.
              </p>

              <dl className="mx-auto mt-12 max-w-md space-y-3 text-left">
                <Row label="Data" value="08 de julho de 2026" />
                <Row label="Horário" value="19h30 às 22h30" />
                <Row label="Local" value="Rua 1500, 820 — 25º andar, Centro, BC" />
                <Row label="Vagas" value="60 (limitadas)" />
                <Row label="Investimento" value="Gratuito" accent />
              </dl>

              <a
                href="https://wa.me/"
                className="group relative mt-12 inline-block overflow-hidden rounded-full bg-[#fdfbf7] px-12 py-5 text-xs uppercase tracking-[0.25em] text-[#2d2a26] transition-all hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10">Quero me inscrever agora</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#8c7851]/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </a>
              <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#a39a8d]">
                Confirmação enviada por e-mail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-28 md:py-32">
        <div className="mx-auto max-w-2xl">
          <div className="mb-14 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8c7851]">04 — Dúvidas</span>
            <h2 style={serif} className="mt-5 text-4xl font-light text-[#2d2a26] md:text-5xl">
              Perguntas <span className="italic text-[#8c7851]">frequentes</span>
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e8e2d8] bg-[#fcfaf7]">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-[#e8e2d8] last:border-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-6 py-6 text-left transition-colors hover:bg-[#f3efe6] md:px-8"
                  >
                    <h4 style={serif} className="pr-6 text-xl font-normal text-[#2d2a26]">
                      {item.q}
                    </h4>
                    <span style={serif} className="text-2xl italic text-[#8c7851]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-7 pr-12 text-sm leading-relaxed text-[#5a544d] md:px-8">
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
      <section className="bg-[#f3efe6] px-6 py-28 text-center md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 style={serif} className="text-4xl font-light leading-tight text-[#2d2a26] md:text-6xl">
            Você merece <span className="italic text-[#8c7851]">compreender.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[#5a544d]">
            Dia 08 de julho. Vagas limitadas. Jonas está esperando por você.
          </p>
          <a
            href="#inscricao"
            className="mt-10 inline-block rounded-full bg-[#2d2a26] px-12 py-5 text-xs uppercase tracking-[0.25em] text-[#fdfbf7] transition-colors hover:bg-[#3d3a35]"
          >
            Garantir meu lugar
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e2d8] px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <span style={serif} className="text-xl font-light text-[#2d2a26]">
            A <span className="italic text-[#8c7851]">Lógica</span>
          </span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#a39a8d]">
            © 2026 Jonas Sistêmica — Balneário Camboriú, SC
          </p>
        </div>
      </footer>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#a39a8d]">{label}</dt>
      <dd
        className={
          accent
            ? "text-right text-lg italic text-[#c4b08a]"
            : "text-right text-sm text-[#fdfbf7]/90"
        }
        style={accent ? serif : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
