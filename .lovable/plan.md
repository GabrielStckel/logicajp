## Plano: renomear rota `/4` → `/1`

1. **Renomear arquivo**: `mv src/routes/4.tsx src/routes/1.tsx`.
2. **Editar `src/routes/1.tsx`**:
   - `createFileRoute("/4")` → `createFileRoute("/1")`
   - `function Page4()` → `function Page1()` e `component: Page4` → `component: Page1`
   - `source: "landing_4"` → `source: "landing_1"` na chamada `submitLead`
3. **Comentário em `src/routes/obrigado.tsx`** (linha 4): atualizar o comentário `Paleta espelhada de /4` → `Paleta espelhada de /1` (apenas comentário, sem mudança de comportamento).
4. **`src/routeTree.gen.ts`**: não editar — é regenerado automaticamente pelo plugin do TanStack Router.
5. **Não tocar**: `src/routes/index.tsx`, `src/routes/__root.tsx` (nenhum link para `/4` neles), nem qualquer outro arquivo.

Sem mudanças visuais, de copy ou de comportamento.