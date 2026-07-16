Instalar o Meta Pixel `489930819102829` de forma global via `src/routes/__root.tsx`. Nenhuma outra rota é tocada.

## Onde cada parte entra

**1) Snippet inline do fbq — via `head().scripts` da rota raiz**

Adicionar em `Route.head().scripts` um item com `children` contendo o snippet oficial da Meta, terminado em `fbq('init', '489930819102829'); fbq('track', 'PageView');`. TanStack renderiza `head().scripts` no `<Scripts />` (fim do `<body>`), o que:
- Não bloqueia o LCP (o inline é minúsculo e o `fbevents.js` externo é `async` no próprio snippet).
- É SSR-safe: mesmo markup em servidor e cliente, sem hydration mismatch.
- Define o stub `window.fbq` imediatamente, então o PageView de navegação subsequente sempre encontra `fbq` disponível.

**2) `<noscript>` com pixel de imagem — no `<body>` via `RootShell`**

O `<noscript><img .../></noscript>` é conteúdo de fluxo e NÃO pode entrar em `<head>` (parse5/Vite recusa). Vai no início do `<body>` dentro de `RootShell`, antes de `{children}`:

```
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=489930819102829&ev=PageView&noscript=1" />
</noscript>
```

**3) PageView em navegações sem duplicar o inicial — em `RootComponent`**

O snippet já dispara o PageView inicial. Para as navegações do TanStack Router, dentro de `RootComponent` (client-side):

```
const pathname = useRouterState({ select: s => s.location.pathname });
const initial = useRef(true);
useEffect(() => {
  if (initial.current) { initial.current = false; return; }
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  fbq?.('track', 'PageView');
}, [pathname]);
```

- `initial.current` garante que a hidratação (que roda o `useEffect` a primeira vez) NÃO redisparar o PageView já emitido pelo snippet.
- Só o pathname é observado — evita triggers redundantes por mudanças de search/hash a menos que o path mude.
- Guardado com `typeof window` implicitamente (roda só em `useEffect`).

**4) Sem "Lead" e sem CAPI**

Nenhum outro `fbq('track', ...)` é adicionado. Nenhum código server-side, nenhum secret. Nada relacionado à API de Conversões.

## Detalhes técnicos

- Adicionar `useRef` e `useRouterState` aos imports existentes (`react` e `@tanstack/react-router`); nenhuma dependência nova.
- O ID `489930819102829` fica hard-coded no snippet e na URL do noscript (é público, aparece no client de qualquer forma).
- Não altero `head().meta`, `head().links` de fontes, nem estrutura do `RootShell` além do `<noscript>`.
- Nada em `src/routes/index.tsx` ou `src/routes/4.tsx` — o rastreamento é global por vir do root.

## Impacto esperado

- Pixel ativo em todas as rotas presentes e futuras.
- PageView correto: 1 na carga inicial, 1 por navegação SPA, sem duplicação.
- Sem impacto no LCP (script no fim do body, `async`).
- Sem hydration mismatch (nada condicional no markup SSR/CSR do snippet).
