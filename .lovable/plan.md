## Escopo aprovado

Aplicar Parte 1 completa em `src/routes/index.tsx` com `SITE_URL = "https://logicajp.lovable.app"` (domínio Lovable atual do projeto — o único definitivo disponível hoje; se um domínio próprio for conectado depois, trocar em um lugar só). Da Parte 2: implementar apenas **(1) sticky CTA mobile** em `/` e `/1` (idêntico) e **(5) linha anti-objeção** acima do formulário em `/`. Itens 2, 3 e 4 ficam de fora.

---

### `src/routes/index.tsx` — edições

**Head / SEO absoluto**
- Adicionar `const SITE_URL = "https://logicajp.lovable.app";` no topo do arquivo.
- `og:image` e `twitter:image` → `` `${SITE_URL}${truthImage}` `` (o import do bundle já começa com `/assets/…`).
- `og:url` → `` `${SITE_URL}/` ``.
- `canonical` → `` `${SITE_URL}/` ``.

**LCP — remover `animate-reveal` do hero (acima da dobra)**
- Chip "Workshop Presencial Gratuito" (linha 149): remover `animate-reveal`.
- `<h1>` (linha 154): remover `animate-reveal` **e** `[animation-delay:100ms]`.
- Grid "Data e Local / Disponibilidade" (linha 160): remover `animate-reveal` **e** `[animation-delay:200ms]`.
- Manter `animate-reveal` no painel expandido do FAQ (única outra ocorrência, abaixo da dobra).

**Imagens**
- `truthImage` e `venueImage`: adicionar `decoding="async"` (mantém `loading="lazy"`). Sem conversão para WebP (proibido adicionar dependências).

**Hierarquia de headings** (classes visuais 100% preservadas — só a tag muda)
- Seção "A Verdade": `<h3>A Verdade Que Ninguém Te Contou</h3>` → `<h2>`.
- Cards "discoveries": `<h4>{d.title}</h4>` → `<h3>`.
- FAQ: `<h4>{item.q}</h4>` → `<h3>`.

**Acessibilidade / foco / toque**
- Adicionar `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` em: CTA do nav ("Inscrever-se"), botão de cada FAQ, submit do formulário, CTA final ("Garantir meu lugar").
- Nav CTA: garantir `min-h-[44px]` + `inline-flex items-center` (mantém `px-5 py-2` visualmente).
- Campo telefone: `enterKeyHint="send"`.
- FAQ: para cada item `i`, botão recebe `id={` `` `faq-trigger-${i}` `` `}` e `aria-controls={` `` `faq-panel-${i}` `` `}`; painel recebe `id={` `` `faq-panel-${i}` `` `}`, `role="region"`, `aria-labelledby={` `` `faq-trigger-${i}` `` `}`. `aria-expanded` já existe.

**Item 5 — linha anti-objeção acima do formulário**
Imediatamente acima do `<form onSubmit={submit} …>` (dentro do card escuro `#inscricao`, após a `<dl>`), inserir:

```tsx
<p className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">
  Presencial e gratuito · Sem venda dura durante o evento — a Formação Completa é apresentada apenas ao final, para quem quiser.
</p>
```

Usa tokens do design system, mesma família tipográfica dos eyebrows já presentes na seção — não altera copy existente, só acrescenta uma linha.

**Item 1 — sticky CTA mobile (fim do componente, antes do `</div>` externo)**

```tsx
{/* Sticky CTA mobile — só < md, discreto, com spacer para não cobrir o footer */}
<a
  href="#inscricao"
  aria-label="Garantir minha vaga no workshop"
  className="fixed inset-x-4 bottom-4 z-50 flex min-h-[52px] items-center justify-center rounded-full border border-accent bg-foreground px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
>
  Garantir vaga · 29 jul
</a>
<div aria-hidden className="h-20 md:hidden" />
```

---

### `src/routes/1.tsx` — única edição

Adicionar o **mesmo** sticky CTA (markup idêntico, mesmas classes Tailwind, mesmo href `#inscricao`), imediatamente antes do `</div>` externo que fecha o wrapper da página (após o `</footer>`). Nenhuma outra mudança na /1 — copy, cores inline, estrutura permanecem exatamente como estão. O sticky fica visual e funcionalmente idêntico entre as duas páginas (usa tokens `bg-foreground` / `text-background` / `border-accent` que resolvem para os mesmos valores nas duas rotas).

---

### Verificação após implementar
- Preview em viewport mobile: sticky CTA aparece em `/` e `/1`, some em `≥ md`, não cobre o footer (spacer de 80px).
- Ver o HTML gerado: `og:image`, `og:url`, `canonical` são URLs absolutas iniciadas com `https://logicajp.lovable.app`.
- Hero: sem `animate-reveal` — h1 pinta imediatamente.
- DevTools > Elements: h1 → h2 → h3, sem h4 órfão. Botões do FAQ com `aria-controls` apontando para `id`s existentes.

### Fora de escopo
`obrigado.tsx`, `leads.functions.ts`, `__root.tsx`, `styles.css`, fontes, imagens (além de `decoding`), copy existente, animações abaixo da dobra, itens 2/3/4 da Parte 2.