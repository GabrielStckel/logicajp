## Contexto

Refino do redesign vigente de `src/routes/obrigado.tsx`. Apenas duas correções de copy vs. o plano anterior — todo o resto (hierarquia, contraste, banner PRESENCIAL, animações, espaçamentos) permanece exatamente como aprovado.

## Travas respeitadas

- Pixel Lead: `useRef` + `sessionStorage.getItem("lead_ok")` + `fbq("track","Lead")` + `removeItem` intactos.
- `noindex, nofollow` intacto.
- Link `WHATSAPP_GROUP` intacto.
- Data "29 de julho de 2026 (Quarta-feira)" intacta.
- Sem dependências novas; sem tocar em `/`, `/1`, `leads.functions.ts`.
- Paleta dourada (`C.accent/accentDeep/accentLight`) e fontes (Inter Tight / Inter / JetBrains Mono) preservadas.
- Linha "PRESENCIAL E GRATUITO · SEM VENDA DURA…" removida e não reintroduzida.

## Hierarquia mobile (390 CSS px)

Ordem de leitura, do topo para baixo:

1. **Check icon dominante** — 88×88, borda dourada, fundo `accent12`, halo `accent33`, `✓` grande. Animação `o-check` 0.6s (entrada única).
2. **Eyebrow mono** "Inscrição confirmada" + **H1** "Sua vaga está reservada." (`clamp(2rem, 8vw, 2.75rem)`, `lineHeight: 1.1`, `maxWidth: 16ch`).
3. **Subline** (`maxWidth: 38ch`, `text-muted`, centralizada):

   > **"Você receberá a confirmação e as instruções no seu WhatsApp. Entre também no grupo para avisos e para se conectar com os outros participantes."**

   *(substitui a versão anterior — as instruções chegam por DM automatizada; o grupo é complementar, não gatekeeper.)*

4. **CTA WhatsApp — dominante**, `w-full`, `minHeight: 56px`, `bg: C.accent` + `color: C.darkBg` (AA ~7,5:1), sombra `${C.darkBg}44`. Texto: **"Entrar no grupo e receber o link →"**. Microcopy mono abaixo:

   > **"Recomendado · avisos e comunidade do evento em um só lugar"**

   *(substitui "Passo obrigatório · sem o grupo, sem instruções" — a anterior era factualmente falsa.)*

5. **Card do evento** com **banner PRESENCIAL** no topo:
   - Faixa `bg: C.darkBg` full-bleed no topo do card, com dot dourado pulsante + label mono `accentLight`: **"Evento presencial · Balneário Camboriú/SC"**.
   - Corpo do card: Data / Horário / Local em grid `4.5rem 1fr`. "Local" com `fontWeight: 700` e cor `accentDeep` — reforço tipográfico do endereço físico.
6. **Nota final** discreta (`text-muted`, `text-[13px]`, `maxWidth: 36ch`, centralizada):

   > **"Se não puder comparecer, responda à mensagem de confirmação no WhatsApp — assim sua vaga vai para outra pessoa."**

   *(substitui a versão que direcionava para o grupo — a desistência é tratada pela automação por DM.)*

## Espaçamento e larguras

- Container `maxWidth: 560px`, `gap: 1.5rem` entre blocos.
- Padding vertical `clamp(1.5rem, 5vw, 2.5rem)` topo / `clamp(3.5rem, 12vw, 6rem)` base.
- H1 em 16ch, subline em 38ch, nota final em 36ch.

## Psicologia aplicada

- **CTA único dourado** — nenhuma competição visual; botão é o elemento mais legível.
- **Sequência**: confirmação → subline honesta (DM = fonte da verdade, grupo = valor social) → CTA → contexto do evento → contrato social.
- **Prevenção de no-show**: banner escuro PRESENCIAL + BC inescapável; "Local" destacado; nota final aponta o canal correto (DM) para desistência.
- **Contraste AA** (`#C9A84C` / `#171D26` ≈ 7,5:1); hover `accentLight` mantém texto escuro legível.
- **Honestidade**: copy do CTA e da nota final agora refletem o funil real (automação por DM, grupo opcional-mas-recomendado). Elimina risco de ruído reputacional quando o lead perceber que as instruções chegam mesmo sem entrar no grupo.

## Verificação

- `bun run build` / typecheck passam.
- `/obrigado` em 390×689: check + título na primeira dobra; CTA dourado a ≤ um flick.
- Nenhuma outra rota afetada.

## Diff de copy vs. plano anterior

| Local | Antes | Depois |
|---|---|---|
| Subline (item 3) | "Falta o passo mais importante: entrar no grupo do WhatsApp onde enviaremos o mapa, os lembretes e as instruções do dia." | "Você receberá a confirmação e as instruções no seu WhatsApp. Entre também no grupo para avisos e para se conectar com os outros participantes." |
| Microcopy sob CTA | "Passo obrigatório · sem o grupo, sem instruções" | "Recomendado · avisos e comunidade do evento em um só lugar" |
| Nota final | "Se não conseguir comparecer, avise no grupo — a vaga é de outra pessoa." | "Se não puder comparecer, responda à mensagem de confirmação no WhatsApp — assim sua vaga vai para outra pessoa." |

Ao aprovar, aplico apenas essas três substituições de string em `src/routes/obrigado.tsx`; o restante do arquivo já reflete o design aprovado.