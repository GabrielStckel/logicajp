## Escopo
Apenas `src/routes/4.tsx`. Sem novas deps, sem backend, sem mudar copy/cores/design existentes.

## Mudanças

### 1. Estado (linhas 101-102)
- `fields`: adicionar `confirmedPresencial: false`.
- `errors` type: adicionar `confirmedPresencial?: string`.

### 2. Handler `onChange` (linha ~107)
Já é genérico via `setFields`; adicionar helper específico para checkbox que atualiza `confirmedPresencial` e limpa `errors.confirmedPresencial` no mesmo padrão do texto.

### 3. Validação em `submit` (linhas 110-119)
Após a validação de `phone`, adicionar:
```
if (!fields.confirmedPresencial) errs.confirmedPresencial = "Confirme que está ciente de que o evento é presencial.";
```

### 4. UI (após os inputs mapeados, antes do `<button type="submit">` — depois da linha ~684)
Inserir bloco:
- `<label htmlFor="confirmedPresencial">` englobando checkbox + texto (área de toque total, cursor pointer, `display: flex`, `gap`, `alignItems: flex-start`, `padding: 0.5rem 0` para atingir ≥44px de altura).
- `<input type="checkbox" id="confirmedPresencial">` com `checked`, `onChange`, `aria-invalid`, `style={{ accentColor: C.accentDeep, width: "1.125rem", height: "1.125rem", marginTop: "0.15rem", flexShrink: 0, cursor: "pointer" }}`. Borda via `accent-color` nativo + outline de foco visível (`:focus-visible` já herdado do browser; garantir com `outlineOffset`).
- Texto exato: "Estou ciente de que o evento é PRESENCIAL em Balneário Camboriú/SC e pretendo comparecer." — fonte SANS, `fontSize: "0.8125rem"`, `color: C.lightMuted`, `lineHeight: 1.5`.
- Abaixo do label, se houver erro: `<p>` no mesmo estilo dos demais (`fontFamily: SANS, fontSize: "0.75rem", color: "#C0392B", margin: 0`) exibindo `errors.confirmedPresencial`. Margem/gap coerente com o espaçamento do formulário atual.

### 5. Acessibilidade
- `id="confirmedPresencial"`, `htmlFor="confirmedPresencial"`.
- `aria-invalid={!!errors.confirmedPresencial}`.
- `aria-describedby` apontando para o `<p>` de erro (com `id="confirmedPresencial-error"`) quando presente.

Sem alterações fora dessas duas regiões (estado + submit + JSX do form).