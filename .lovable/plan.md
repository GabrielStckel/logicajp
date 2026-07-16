## Escopo

Arquivo único: `src/routes/1.tsx`. Preserva estilos inline + paleta `C`. Sem sticky, sem dependências, sem tocar em `/`, `/obrigado`, `leads.functions.ts`. Sem a linha anti-objeção da variante A. Textos longos, checkbox presencial, data e funil (`source: "landing_1"`) intactos.

## 1) Hero mobile (390×689 alvo)

- **Remover animações `l-rise`, `l-rise-2`, `l-rise-3`, `l-rise-4`** do JSX do hero (escalonamento 0.15/0.3/0.45s atrasa o LCP). Manter keyframes `l-spin`/`l-pulse` no `<style>` (usados abaixo da dobra).
- **Section**: remover `minHeight: "100svh"` — evita espaço vazio artificial e mantém o CTA a ≤ um flick.
- **H1**: `clamp(2.25rem, 8vw, 5rem)` (hoje `2.5rem` estoura em 360px), `maxWidth: "14ch"`. Copy intacta.
- **Subtítulo**: `textAlign: "left"` (hoje `justify` gera rios), `maxWidth: "40ch"`. Copy intacta.
- **CTA row**: no mobile CTA principal `width: "100%"`; microcopy padronizada abaixo em linha própria (ver §3).
- **Meta strip**: trocar `minmax(160px,1fr)` por `repeat(3, minmax(0,1fr))` — Data/Local/Vagas lado a lado mesmo em 360px. Valor `clamp(0.9375rem, 2.6vw, 1.0625rem)`; `gap: 1rem`.

## 2) Passe mobile — seção por seção

Adicionar no bloco `<style>` central:

```css
@media (max-width: 640px) {
  .l-justify { text-align: left !important; }
}
.event-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: 1.125rem 0; border-bottom: 1px solid ${C.lineLight}; }
@media (max-width: 480px) {
  .event-row { flex-direction: column; align-items: flex-start; gap: 0.375rem; }
  .event-row .event-value { text-align: left !important; }
}
```

- **PAIN INTRO / PAIN MIRROR / ABOUT JONAS / QUOTE / EVENT / FAQ / CLOSING**: adicionar `className="l-justify"` nos `<p>` que usam `textAlign: "justify"` — desktop mantém justify, mobile volta para left.
- **EVENT INFO rows**: trocar o `div` inline por `className="event-row"` com filho `event-value` — no mobile empilha limpo (label acima, valor à esquerda).
- Pain grid, benefits grid, form dark, footer: já responsivos, sem mudança de layout.
- FAQ trigger: `minHeight: 44px` já garantido; nenhuma mudança.

## 3) CTAs — texto, posicionamento e contraste

**Contraste corrigido**: par primário passa a ser `backgroundColor: C.accent` (#C9A84C) + `color: C.darkBg` (#171D26) — ~7,5:1 AA com folga; hover `accentLight` mantém texto escuro legível. Aplicado em **hero, closing e submit**.

Sombras acompanham: onde hoje se usa `${C.accentDeep}55/AA`, trocar para `${C.darkBg}33` (sombra neutra escura, mantém profundidade sem depender do dourado).

**Microcopy padronizada** sob TODOS os primários fora do form (idêntica, sem variação):

> `Gratuito · Presencial em Balneário Camboriú · 60 vagas`

Estilo: `fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.lightMuted, marginTop: "0.75rem"`.

| # | Posição | Tipo | Cores | Texto | Microcopy |
|---|---|---|---|---|---|
| 0 | Nav (`l-ghost`) | Secundário fantasma | `color: C.accentDeep`, borda `${C.accent}33` (mantido) | **"Quero minha vaga"** | — |
| 1 | Hero (`l-cta`) | Primário mobile `w-full` | `bg: C.accent`, `color: C.darkBg`, `boxShadow: 0 14px 40px -12px ${C.darkBg}33` | **"Garantir minha vaga presencial"** | `Gratuito · Presencial em Balneário Camboriú · 60 vagas` |
| 2 | Submit form | Botão dourado | `bg: C.accent`, `color: C.darkBg`, `boxShadow: 0 14px 36px -14px ${C.darkBg}55`; spinner `border-color: C.darkBg` (era `lightBg` — agora precisa ser escuro para aparecer no fundo dourado) | Idle: **"Confirmar minha vaga presencial →"** · Loading: **"Enviando..."** (mantido) | — |
| 3 | Closing CTA | Primário | `bg: C.accent`, `color: C.darkBg` (já era essa combinação — apenas atualizar texto e adicionar microcopy) | **"Garantir minha vaga presencial"** (hoje "Garantir meu lugar em \"A Lógica\"") | Substituir o `<p>` "Dia 29 de julho · Vagas limitadas..." pela microcopy padronizada |
| 4 | Footer link | Link textual | mantido | **"Garantir vaga →"** mantido | — |

**Sem CTA extra pós-benefícios**: Benefits → Event Info → Form são imediatos; CTAs 1, 3 e submit (2) cobrem os pontos de decisão.

## 4) Psicologia aplicada

- **Contraste AA**: par `accent`/`darkBg` (~7,5:1) garante que o CTA seja o elemento mais legível de cada dobra — pré-requisito de acessibilidade e de dominância visual.
- **Hierarquia**: um único par primário em toda a página; fantasma no nav e link textual no footer subordinados.
- **Consistência**: mesmo texto em hero, closing e ecoado no submit — "presencial" repetido combate a objeção nº1 (é online?).
- **Repetição factual**: microcopy idêntica ancora custo, formato e escassez real em cada primário.
- **LCP**: remoção das animações `l-rise*` acima da dobra libera o hero para renderização imediata.
- **Mobile-first**: primário `w-full`, ≥52px de altura, dentro da zona do polegar.
- **Ética**: nenhum contador, depoimento inventado ou escassez fabricada.

## 5) Verificação

- `bun run build` passa.
- `/1` em 390×689: hero cabe até o CTA primário; meta strip em 3 col; sem overflow horizontal em 360px.
- Contraste do CTA verificado: `#C9A84C` + `#171D26` ≈ 7,5:1 (AA/AAA).
- `submitLead({..., source: "landing_1"})`, `sessionStorage.setItem("lead_ok","1")` e redirect `/obrigado` inalterados.
- Checkbox presencial: texto e estado inicial intactos.
- `/` não sofre alteração.

## Relatório final

Após aplicar: mudanças por seção, tabela final dos botões (nav, hero, submit, closing, footer) com o par de cores AA, e racional psicológico de cada decisão.