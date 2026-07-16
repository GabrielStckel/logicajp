## Alterações

### 1. Remover sticky CTA mobile (ambas)

**`src/routes/index.tsx` (~linhas 683–691):** remover o bloco
```tsx
<a href="#inscricao" ... className="fixed inset-x-4 bottom-4 z-50 ... md:hidden">Garantir vaga · 29 jul</a>
<div aria-hidden className="h-20 md:hidden" />
```

**`src/routes/1.tsx` (~linhas 925–933):** remover o `<a>` sticky com as mesmas classes/finalidade e o `<div className="h-20 md:hidden" />` que o acompanha.

### 2. Header não-fixo

**`src/routes/index.tsx` linha 219** — `<nav className="fixed top-0 z-50 flex w-full …">`
- Remover `fixed top-0 z-50 w-full` (mantém demais classes: flex/items/justify/border/bg/padding/backdrop).
- Ajustar o `<header>` da linha 235: `pt-40` → `pt-16` (nav já ocupa espaço no fluxo; mantém respiro superior). `pb-24` intacto.

**`src/routes/1.tsx` linhas 185–195** — `<nav style={{ position: "fixed", top: 0, left: "1rem", right: "1rem", zIndex: 50, ... }}>`
- Remover `position: "fixed"`, `top: 0`, `left: "1rem"`, `right: "1rem"`, `zIndex: 50`.
- Remover `borderRadius: "0 0 24px 24px"` (só faz sentido colado ao topo) — manter demais estilos (padding, bg, blur, border, shadow) para preservar identidade visual do nav.
- Ajustar o hero da linha 210: `paddingTop: "clamp(7rem,14vw,11rem)"` → `paddingTop: "clamp(2rem,4vw,3rem)"` (o offset atual compensava o nav fixo).

### Não mexer

Formulários, `submitLead`, `source`, redirect `/obrigado`, copy, demais seções, imagens, FAQ, footer.

### Verificação

- `bun run build` passa.
- `/` e `/1`: nav rola junto; sem CTA flutuante; sem gap grande no topo do hero.
- Submit continua com `source: "landing_principal"` (/) e `"landing_1"` (/1).