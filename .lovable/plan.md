## Escopo

Arquivo único: `src/routes/index.tsx`. Sem novas dependências, sem sticky, sem tocar em `1.tsx`/`obrigado.tsx`/`leads.functions.ts`. Funil, textos longos e checkbox presencial intactos. Apenas: recomposição mobile do hero, passe mobile seção por seção, e microcopy/posicionamento dos CTAs.

## 1) Hero recomposto (mobile-first, 360–390px como alvo)

Ordem de leitura em 3 segundos: **CHIP → H1 → subheadline curta → data/local compactos → CTA primário → nota de vagas**.

- Chip "Workshop Presencial Gratuito": reduzir para `text-[10px] tracking-widest` em mobile, com bolinha `bg-accent` à esquerda (continuidade com o dot pulsante do form).
- H1 (copy exata "Dinheiro & Abundância Sistêmica"):
  - mobile `text-[2.75rem] leading-[0.95]`; itálico dourado preservado.
  - `md:text-7xl lg:text-8xl` (reduz do 8xl atual). `text-balance` mantido.
- Subheadline: copy mantida, `max-w-[38ch] text-base leading-relaxed md:text-xl` (hoje começa em `text-xl` mobile e compete com o H1).
- Bloco Data/Local: no mobile deixa de ser coluna com `border-l pl-8`. Vira **duas colunas compactas** com hairline `border-t border-border`:
  - "Quando": `29 Jul · Qua · 19h30`
  - "Onde": `Balneário Camboriú · SC`
  - Nota "60 vagas presenciais" abaixo em mono, `text-accent text-[11px]`.
  - `grid grid-cols-2 gap-x-6 gap-y-1` mobile; layout editorial atual preservado em `md:`.
- **CTA primário no hero (novo)**: `bg-accent text-background`, `w-full md:w-auto`, `min-h-[52px] px-8`, `text-sm font-bold uppercase tracking-widest`. Microcopy padronizada abaixo (ver §3).
- Glow reduzido em mobile (`h-64 w-64`) para evitar overflow horizontal.
- Padding: `px-5 pt-10 pb-16` mobile. Meta: CTA visível a ≤ um flick em 375×667.

## 2) Passe mobile — seção por seção

Ritmo vertical unificado: `py-20 md:py-28`. Paleta/fontes intocadas.

- **Nav**: `px-5 py-3.5 md:px-6 md:py-4`; logo `text-lg md:text-xl`; CTA nav secundário (§3).
- **Dores**: `py-20 md:py-28`, `px-5 md:px-6`, grid `gap-10 md:gap-20`. H2 `text-3xl md:text-5xl`. Itens `gap-4 pb-5 text-[15px] md:text-lg`.
- **A Verdade**: imagem `aspect-[4/3] md:aspect-[21/9]`, `mb-10 md:mb-16`. Blockquote `text-2xl md:text-5xl`. Container `max-w-[62ch] md:max-w-4xl`.
- **O que vai descobrir**: header `gap-3`; H2 `text-3xl md:text-5xl`. Em mobile trocar `gap-px` por `divide-y divide-border border border-border`; `md:` mantém grid 3-col com `gap-px`. Cards `p-8 md:p-12`. Números `text-3xl md:text-4xl`. **CTA secundário-primário ao fim do bloco** (§3).
- **#inscricao**: padding vertical `clamp(3rem,7vw,6rem)`; gap mobile `2rem`; pitch H2 `clamp(1.75rem,7vw,3.25rem)` com `maxWidth:16ch` mobile; card form `padding: clamp(1.5rem, 5vw, 2.75rem)`; anti-objeção `lineHeight:1.6`; submit com padding maior e texto novo (§3); bloco "60 vagas" `marginTop:1.5rem`.
- **FAQ**: `py-20 md:py-28 px-5 md:px-6`; header `mb-10 md:mb-16`; trigger `py-5 md:py-7 min-h-[56px]`; pergunta `text-[15px] leading-snug pr-4`; painel `pb-6 pr-2 md:pr-10 text-[14px]`.
- **Final**: `py-20 md:py-24 px-5`; H2 `text-3xl md:text-5xl`; CTA `w-full md:w-auto min-h-[56px] px-8 py-4` (§3).
- **Footer**: `px-5 py-8 md:py-12 gap-4`; centro em mobile.

## 3) CTAs — hierarquia, texto e posicionamento

Regra: **um primário por ponto de decisão**, todos apontando `#inscricao`, mesma promessa. Primário = `bg-accent text-background` (dourado sólido dominante). Secundário = fantasma `border-accent/40 text-accent`.

**Microcopy padronizada sob TODOS os CTAs primários fora do form** (idêntica nas 3 posições, sem variação):

> `Gratuito · Presencial em Balneário Camboriú · 60 vagas`

Estilo: `font-mono text-[11px] tracking-widest text-muted`, `mt-3`, centralizada com o CTA.

| # | Posição | Tipo | Texto do botão | Microcopy abaixo |
|---|---------|------|----------------|------------------|
| 0 | Nav | Secundário fantasma, `min-h-[44px]`, `text-xs uppercase tracking-widest` | **"Quero minha vaga"** | — |
| 1 | Hero | **Primário dominante** (accent sólido), `w-full md:w-auto min-h-[52px]` | **"Garantir minha vaga presencial"** | `Gratuito · Presencial em Balneário Camboriú · 60 vagas` |
| 2 | Fim de "O que vai descobrir" | **Primário** (accent sólido), `w-full md:w-auto` | **"Garantir minha vaga presencial"** | `Gratuito · Presencial em Balneário Camboriú · 60 vagas` |
| 3 | Submit do form | Botão dourado existente, texto novo | Idle: **"Confirmar minha vaga presencial →"** · Loading: **"Enviando..."** (mantido) | — (dentro do form; nota 🔒 já cobre) |
| 4 | Fechamento | **Primário** (accent sólido), `w-full md:w-auto min-h-[56px]` | **"Garantir minha vaga presencial"** | `Gratuito · Presencial em Balneário Camboriú · 60 vagas` |

**Não** haverá CTA antes do FAQ (dúvida ≠ decisão; CTA #2 e #4 cobrem o percurso).

## 4) Psicologia aplicada

- **Hierarquia**: um único elemento dourado sólido por dobra; fantasmas subordinados.
- **Zona do polegar**: primários `w-full` no mobile, ≥52px, na metade inferior de cada dobra.
- **Proximidade + consistência**: microcopy idêntica sob cada primário cria repetição de âncoras factuais ("gratuito · presencial · 60 vagas") — o cérebro para de reavaliar o "custo" a cada CTA.
- **Consistência de texto**: mesmo botão (1, 2, 4), ecoado no submit (3). Repetição → confiança.
- **Uma-ação-por-tela**: nenhum CTA compete com outro clicável na mesma seção.
- **Carga cognitiva**: infos do hero reagrupadas em pares (data | local).
- **Ética**: zero contador, zero depoimento, zero escassez fabricada. "60 vagas" é fato do briefing.

## 5) Verificação

- `bun run build` passa.
- Preview em 375×667: hero cabe até o CTA primário ou ≤ ~120px de rolagem.
- FAQ triggers ≥ 44px de toque.
- Sem overflow horizontal em 360px.
- `submitLead({..., source: "landing_principal"})` inalterado; checkbox presencial inalterado; anti-objeção presente.

## Relatório final

Após aplicar: mudanças por seção, tabela final de textos de botões (com microcopy padronizada), e racional resumido de cada decisão.