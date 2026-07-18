## Objetivo

Eliminar as duas requisições render-blocking ao Google Fonts servindo todas as fontes localmente via `@fontsource`, sem alterar nomes, pesos ou aparência intencional. Playfair Display passa a carregar globalmente (correção do fallback acidental para Georgia em `/` e `/obrigado`).

## Passos

### 1. Instalar pacotes (bun add)

- `@fontsource/playfair-display`
- `@fontsource/inter`
- `@fontsource/inter-tight`
- `@fontsource/jetbrains-mono`

### 2. Imports por peso em `src/styles.css`

Adicionar no topo do arquivo, **antes** de `@import "tailwindcss"` (Lightning CSS exige que todos os `@import` venham antes de qualquer outra regra):

```css
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/700.css";
@import "@fontsource/playfair-display/400-italic.css";

@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

@import "@fontsource/inter-tight/600.css";
@import "@fontsource/inter-tight/700.css";
@import "@fontsource/inter-tight/800.css";

@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
@import "@fontsource/jetbrains-mono/600.css";

@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";
```

`@fontsource` já emite `font-display: swap` nos seus `@font-face` — nada a sobrescrever.

### 3. Remover Google Fonts

- `src/routes/__root.tsx` (dentro de `links:`): remover os 2 `preconnect` para `fonts.googleapis.com` / `fonts.gstatic.com` e o `stylesheet` para `fonts.googleapis.com/css2?...`. Manter o `stylesheet` de `appCss`.
- `src/routes/1.tsx`: remover os 2 `preconnect` e o `stylesheet` de Playfair Display do `head().links`.
- `src/routes/index.tsx` e `src/routes/obrigado.tsx`: já sem links de Google Fonts — nada a fazer.

### 4. Nada mais muda

- Constantes `SERIF/DISPLAY/SANS/MONO` nas rotas, pesos usados nos componentes, Meta Pixel, formulários, server functions — todos intactos.
- Não tocar em `.env`, `src/integrations/supabase/*`, `routeTree.gen.ts`.

## Verificação final

- DevTools → Network: zero requests para `fonts.googleapis.com` / `fonts.gstatic.com`; `.woff2` do `@fontsource` servidos localmente pelo Vite.
- Build de produção compila sem erros.
- `/`, `/1`, `/obrigado`: SERIF renderiza em Playfair Display em todas as rotas; DISPLAY/SANS/MONO inalterados.
