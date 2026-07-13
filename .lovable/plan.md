## Alterações em `src/routes/4.tsx`

### 1. Data do evento → 29/07/2026 (todos os lugares)
- Linha 50: `"08 de julho de 2026"` / `"Segunda-feira"` → `"29 de julho de 2026"` / `"Quarta-feira"`
- Linha 68 (meta description): `"08 de julho de 2026"` → `"29 de julho de 2026"`
- Linha 253 (hero meta strip): `"08 jul · 2026"` / `"Quarta · 19h30"` → `"29 jul · 2026"` / `"Quarta · 19h30"` (já quarta, mantém)
- Linha 585 (recap chip inscrição): `"08 jul · 2026 · 19h30"` → `"29 jul · 2026 · 19h30"`
- Linha 771 (bloco final): `"Dia 08 de julho"` → `"Dia 29 de julho"`
- Linha 811 (footer): `"08 de julho · 2026"` → `"29 de julho · 2026"`

### 2. Seção "Isso não é uma fraqueza sua." (PAIN MIRROR)
- Reduzir `maxWidth` do h2 (linha 314) de `"18ch"` para valor amplo o suficiente para caber a frase em uma única linha no desktop (`"32ch"` ou remover a restrição), mantendo `text-align: center`.
- Parágrafo abaixo (linhas 321–333): ajustar `maxWidth` de `"52ch"` para `"64ch"` (ou similar) de modo a caber em exatamente 2 linhas — "disciplina." não sobra sozinha na 3ª linha.

### 3. Card "Identidade" centralizado
Como são 7 cards em grid de 3 colunas no desktop, o 7º (Identidade) fica sozinho na última linha, alinhado à esquerda.

- Trocar o `gridTemplateColumns` (linha 337) de `auto-fit, minmax(...)` para uma grid explícita responsiva via classe CSS (`.pain-grid`) definida no bloco `<style>` (linhas 133–151):
  - Mobile: 1 coluna
  - Tablet: 2 colunas
  - Desktop (≥900px): 3 colunas
- Adicionar regra CSS: `.pain-grid > :last-child:nth-child(3n - 2) { grid-column: 2 / 3; }` para centralizar o card órfão quando ele for o único na última linha em 3 colunas.

### 4. Seção pull-quote "A verdade é diferente..." — reestilizar
Atual (linhas 388–401): bloco itálico com aspas grandes decorativas, texto justificado. Visualmente pesado/desorganizado.

Nova composição:
- Fundo: mantém a faixa suave existente.
- Container centralizado, `maxWidth: "760px"`, padding vertical maior.
- Barra dourada fina (`1px × 40px`) centralizada acima do texto como marcador editorial (em vez das aspas grandes).
- Texto em `SERIF` (Playfair) em vez de sans-itálico, peso 400, `fontSize: clamp(1.375rem, 2.6vw, 1.875rem)`, `line-height: 1.4`, `text-align: center`, `letter-spacing: -0.01em`, cor `C.lightInk`.
- Destaques "lógica sistêmica" e "tudo muda" com `color: C.accentDeep`, `fontWeight: 700`.
- Remover as duas aspas decorativas (`"` posicionadas absolutamente) e o `fontStyle: italic` no parágrafo.
- Adicionar assinatura discreta abaixo: uma linha curta dourada + eyebrow "— Jonas Peress" em MONO/uppercase, opcional (fica mais editorial).

### 5. Seção "Você merece compreender." (INSCRIÇÃO)
- Linha 572: remover o `.` final após `</span>` (título vira `Você merece compreender`).
- Remover as linhas horizontais decorativas do fundo: excluir o segundo `<div aria-hidden>` (linhas 541–547) que aplica `backgroundImage: linear-gradient(${C.lineDark} 1px, ...)` com `backgroundSize` — este é o grid horizontal ao fundo. Mantém apenas o radial glow (linhas 537–540).

## Escopo
Edição única em `src/routes/4.tsx`. Sem alterações de dependências, rotas ou lógica.
