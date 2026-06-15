## Objetivo
Transformar a página vazia em `/3` na variação de design **"A Lógica"** — direção sábio/mago, fundo quase-preto verde, tipografia Playfair Display + Inter, accent único `#3ECF8E`. Conteúdo: o copy do workshop presencial do Jonas (Ciência Sistêmica, Balneário Camboriú, 08/jul/2026).

## O que vou construir

### 1. Fundação visual
- Importar Playfair Display + Inter via Google Fonts em `index.html` (preconnect + stylesheet) e setar `lang="pt-BR"` e `theme-color="#0A0F0C"`.
- Criar `src/lib/colors.ts` com o objeto `C` (bg, bgSoft, ink, muted, accent, accentDeep, line, gold).
- Garantir fundo escuro global sem flash (html/body em `#0A0F0C`).

### 2. Página `/3` (arquivo `src/routes/3.tsx`)
Single-column, max 720px, espaço negativo generoso, mobile-first. Todas as cores inline via objeto `C` (sem Tailwind para cor — evitar purge). Animações sutis com framer-motion.

Seções, em ordem:
1. **Navbar fixa** — nome do evento à esquerda, CTA "Inscreva-se" à direita, blur transparente.
2. **Hero** — eyebrow "Workshop Presencial · 08 Jul 2026", título grande Playfair com 2–3 palavras em accent itálico (ex.: *"A lógica por trás"*), subtítulo Inter, círculos concêntricos SVG ao fundo com rotação lenta, CTA primário + meta (vagas/local).
3. **Diagnóstico da dor** — bloco de copy direto ("você sente vergonha…", "você se culpa…") com palavras em bold ink e destaques em accent itálico conforme léxico do design system.
4. **A virada** — "seus problemas com dinheiro *não são sobre dinheiro*" — afirmação curta tipográfica.
5. **O que você vai entender** — lista com 5–7 itens, hairline entre eles, verbos iniciais em bold.
6. **Sobre Jonas** — bloco curto de autoridade (sem foto no hero; opcional aqui).
7. **Informações do evento** — grid 2 colunas (data, local, duração, investimento "Gratuito", vagas "60 pessoas").
8. **FAQ** — 5–6 perguntas em Playfair, respostas Inter limpas (sem destaques).
9. **CTA final** — repetição do botão de inscrição com escassez ("60 pessoas").
10. **Footer** — minimalista, hairline + crédito.

### 3. Copy
Extrair os blocos do `.docx` do Jonas e distribuí-los pelas seções acima, aplicando o léxico de destaque definido no design system (accent itálico para "lógica sistêmica", "consciência", "tudo muda", "na raiz", "abundância"; bold ink para "impotência profunda", "não são sobre dinheiro", "60 pessoas").

### 4. Detalhes técnicos
- Reusar o padrão de `createFileRoute("/3")` já existente.
- `head()` com title/description/og específicos do workshop.
- Componentes inline no arquivo da rota (mesmo padrão de `organico.tsx`) para manter a variação isolada — não toca em `/`, `/organico`, nem no `__root`.
- framer-motion já está no projeto; instalar só se faltar.

## Fora de escopo
- Backend / formulário de inscrição funcional (CTA será link/anchor).
- Alterar outras rotas ou o tema global do app.
- Foto do Jonas (não temos arquivo; seção textual apenas).

Confirma que sigo por este caminho?
