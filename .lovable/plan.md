## Diagnóstico auditado

**Uso real de pesos/estilos (rotas / e /4):**

| Família | Pesos usados | Itálico? |
|---|---|---|
| Inter Tight (`--font-display` / DISPLAY) | 600, 700, 800 | não |
| Inter (`--font-sans` / SANS, corpo) | 400, 500, 600 | não |
| JetBrains Mono (`--font-mono` / MONO) | 400, 500, 600 | não |
| Playfair Display (SERIF, só /4) | 400, 700 | 400 (linhas ~517, ~597) |

**O que carrega hoje x o que sobra:**

- `__root.tsx` puxa Inter Tight `0,400; 0,700; 1,400; 0,800` — **400 e italic 400 nunca são usados**; falta o 600 e o Mono 600.
- `__root.tsx` puxa JetBrains Mono `400;500` — **falta 600** (usado em /4 linha ~381).
- `__root.tsx` puxa Inter `400;500;600` ✅.
- `/4` puxa Inter `300;400;500;600` **por cima do root** — Inter inteiro duplicado e peso 300 nunca usado.
- `/4` puxa Playfair `0,400; 0,700; 1,400` ✅ exato.
- Preconnect em /4 usa `crossOrigin: ""` (inconsistente com o root, que usa `"anonymous"`).

Nenhum código morto relevante em `/4` (todos os identificadores top-level são referenciados; imports mínimos: `createFileRoute`, `useNavigate`, `useState`, `submitLead`). Nada a remover além das fontes.

Sem CLS acima da dobra: hero usa `clamp()` + `line-height` fixo; fallbacks Georgia/system-ui são métricas próximas o suficiente para as famílias variáveis com `display=swap` — não vou trocar fallbacks nem adicionar `@font-face` custom (mudaria visual e/ou exigiria hospedar arquivos).

## Mudanças

**1) `src/routes/__root.tsx` — trocar a URL do Google Fonts por:**

```
https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap
```

- Remove Inter Tight 400 e italic 400 (não usados).
- Adiciona Inter Tight 800 (usado em / via `font-extrabold`) — hoje o browser está sintetizando bold.
- Adiciona JetBrains Mono 600 (usado em /4).
- Mantém Inter 400/500/600 e preconnects.

**2) `src/routes/4.tsx` — trocar a URL do Google Fonts por apenas Playfair:**

```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap
```

- Remove a família Inter inteira da URL (já vem do root).
- Corrige `crossOrigin: ""` → `"anonymous"` no preconnect do gstatic (mesmo padrão do root, evita re-uso de conexão errado).
- Mantém preconnects e `display=swap`.

**3) SSR pleno em /4:** o arquivo já é 100% server-friendly — sem `window`/`document`/`localStorage` no caminho de render, sem `<ClientOnly>`, sem `ssr: false`. Nada a mudar.

**4) Layout shift:** só transformação/opacidade nas animações `l-rise`; hero usa dimensões fluidas com `line-height` fixo. Sem alterações de tamanho na hidratação. Nada a mudar.

**5) Dead code:** nenhum encontrado em `src/routes/4.tsx`. Nada a remover.

## Impacto esperado

- **1 requisição CSS a menos** em /4 (fonts.googleapis.com é bloqueante para render).
- **~40% menos bytes de fonte** baixados em /4 (elimina Inter duplicado + peso 300).
- **-2 variantes de Inter Tight** carregadas em toda a app (400 e italic 400).
- **+1 variante Inter Tight 800** e **+1 JetBrains Mono 600** — corrige falta silenciosa (antes o browser sintetizava, prejudicando o desenho tipográfico e potencialmente disparando um repaint sutil quando a fonte real chega).
- LCP em 4G: espera-se redução perceptível na /4 pela remoção do segundo stylesheet do Google Fonts e menor payload de fonts.
- Sem qualquer mudança visual, de copy, cor ou dependência.
