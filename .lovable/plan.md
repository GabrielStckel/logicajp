## Plano: corrigir data e adicionar formulário funcional em `src/routes/index.tsx`

Escopo estrito: editar apenas `src/routes/index.tsx`. Nenhuma nova dependência, nenhuma mudança visual/estrutural.

### 1. Correção da data (crítico)
Substituir em todas as ocorrências textuais do arquivo:
- `08 de julho de 2026` → `29 de julho de 2026`
- `08 Julho 2026` (nav) → `29 Julho 2026`
- `Quarta-feira, 08 de Julho · 19h30` (hero) → `Quarta-feira, 29 de Julho · 19h30`
- `Dia 08 de julho.` (seção final) → `Dia 29 de julho.`
- Meta description e og:description: `08 de julho de 2026` → `29 de julho de 2026`
- JSON-LD: `startDate` `2026-07-08T19:30:00-03:00` → `2026-07-29T19:30:00-03:00`; `endDate` `2026-07-08T22:30:00-03:00` → `2026-07-29T22:30:00-03:00`

Nenhum outro texto alterado.

### 2. Formulário de inscrição na seção `#inscricao`
Substituir o `<a href="https://wa.me/">Quero me inscrever agora</a>` (linhas 302–307) e o parágrafo "Confirmação enviada por e-mail" por um `<form>` real, mantendo o container escuro atual (`bg-foreground` / `text-background`) e a paleta/tipografia do arquivo.

Comportamento — espelha `src/routes/1.tsx`:
- Import: `useNavigate` de `@tanstack/react-router` e `submitLead` de `@/lib/api/leads.functions`.
- Estado local no componente `Index`: `fields { name, email, phone, confirmedPresencial }`, `errors`, `submitting`, `submitError`.
- Função `maskPhone` duplicada localmente no topo do arquivo (idêntica à de `1.tsx`).
- Campos, todos com `<label htmlFor>`:
  - Nome completo — `type="text"`, `autoComplete="name"`.
  - E-mail — `type="email"`, `autoComplete="email"`, `inputMode="email"`.
  - WhatsApp — `type="tel"`, `inputMode="numeric"`, `autoComplete="tel"`, aplica `maskPhone` no onChange.
  - Inputs: `w-full bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/30 focus:border-accent outline-none min-h-[44px]`.
- Checkbox obrigatório com texto exato:
  `"Estou ciente de que o evento é PRESENCIAL em Balneário Camboriú/SC e pretendo comparecer."`
  com `<label>` clicável e área de toque adequada.
- Erros: `aria-invalid`, `aria-describedby="<field>-error"`; `<p id="<field>-error" className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent">`.
- Validações client-side idênticas às de `1.tsx`:
  - `name.trim().length >= 3`
  - regex e-mail `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - `phone.replace(/\D/g,"").length >= 10`
  - `confirmedPresencial === true`
- Botão submit reaproveita o estilo do CTA atual (`w-full bg-accent py-5 text-base font-bold uppercase tracking-widest text-foreground`), `disabled:opacity-60`, label alterna `"Quero me inscrever agora"` ↔ `"Enviando..."`.
- Ao submeter:
  ```ts
  await submitLead({ data: {
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone,
    confirmedPresencial: fields.confirmedPresencial,
    source: "landing_principal",
  }});
  sessionStorage.setItem("lead_ok", "1");
  navigate({ to: "/obrigado" });
  ```
  Sem `as any`. Se o typecheck reclamar (por ex. o `routeTree.gen.ts` ainda não reflete `/obrigado`), investigar a causa (arquivo de rota presente, imports, regen do route tree) e corrigir na raiz. O padrão `as any` visto em `1.tsx` não será replicado aqui.
- Em erro:
  ```ts
  setSubmitError("Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente.");
  ```
  exibido em `<p role="alert">` acima do botão; campos preservados; `submitting` volta a false no `finally`.
- O parágrafo "Confirmação enviada por e-mail" é removido (não corresponde ao novo fluxo → /obrigado).

### 3. Remoção de outros `wa.me` quebrados
Verificado: no arquivo há apenas um `wa.me/` (linha 303). Os demais CTAs ("Inscrever-se" no nav, "Garantir meu lugar" no final) já apontam para `#inscricao` e ficam inalterados.

### 4. Fora de escopo
Não tocar em fontes, imagens, animações, componente `Row`, FAQ, hero, seção de dores, etc. Nenhuma alteração em `src/routes/1.tsx`, `obrigado.tsx` ou `leads.functions.ts`.