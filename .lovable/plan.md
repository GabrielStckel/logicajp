# Rota `/obrigado` — plano final (com ajustes aprovados)

Criar somente `src/routes/obrigado.tsx`. Nada mais é tocado.

## Ajustes incorporados

1. **Fonts**: a página **não** usa Playfair Display — logo, **nenhum `<link>` de fonte** é adicionado no `head()`. Inter Tight / Inter / JetBrains Mono já vêm do `__root.tsx`.
2. **Ícone de check**: círculo 72px com **borda 1.5px `C.accent`**, **fundo transparente**, `✓` em **`C.accentDeep`** (Inter Tight 700), leve halo `${C.accent}22`. Sem preenchimento sólido.

## `head()`

```ts
meta: [
  { title: "Inscrição confirmada · A Lógica" },
  { name: "robots", content: "noindex, nofollow" },
]
```
Sem `og:*`, sem canonical (página noindex, pós-conversão).

## Sistema visual (copiado de `/4`)

- `C`: `darkBg #171D26`, `darkInk #FBFAF9`, `lightBg #FBFAF9`, `lightBgSoft #F4F2F1`, `lightInk #171D26`, `lightMuted #627084`, `accent #C9A84C`, `accentDeep #9E7E30`, `accentLight #E0C878`, `lineLight #E5E3E0`.
- `DISPLAY = "'Inter Tight', sans-serif"`, `SANS = "'Inter', system-ui, sans-serif"`, `MONO = "'JetBrains Mono', monospace"`.
- Botões: `borderRadius: 2px`, mesmo padrão de sombra/hover do CTA dourado da `/4`.

## Pixel Lead — client-only, idempotente

```ts
const fired = useRef(false);
useEffect(() => {
  if (fired.current) return;
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem("lead_ok") !== "1") return;
  fired.current = true;
  (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq?.("track", "Lead");
  sessionStorage.removeItem("lead_ok");
}, []);
```
- StrictMode-safe via `useRef` + `removeItem`.
- Sem redirect quando `lead_ok` ausente: página renderiza normalmente.

## Layout (mobile-first, uma coluna, max-width 560px)

```text
[ ✓ ]  círculo borda dourada, ✓ accentDeep
Sua vaga está reservada.    h1 DISPLAY
┌─────────────────────────────┐
│ Você receberá a confirmação │  destaque bg accent/0F + borda accent/40
│ no seu WhatsApp em instantes│
└─────────────────────────────┘
┌ DETALHES DO EVENTO ─────────┐  card lightBgSoft, radius 4px
│ DATA     29 de julho de 2026│  labels MONO uppercase muted
│          Quarta-feira       │  valores DISPLAY
│ HORÁRIO  19h30 – 22h30      │
│          3 horas de imersão │
│ LOCAL    Rua 1500, 820 – 25º│
│          Centro · Balneário │
│          Camboriú/SC        │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
│ • EVENTO PRESENCIAL ·       │  eyebrow accentDeep + dot glow
│   COMPARECIMENTO OBRIGATÓRIO│
└─────────────────────────────┘
[  Entrar no grupo do WhatsApp  ]  CTA accent, radius 2px, minHeight 52px
Guarde este endereço no seu mapa →  link discreto muted, underline accent
```

- CTA WhatsApp: `href="https://chat.whatsapp.com/C2fkN1xmpaE6H5agOyKBjx?mode=gi_t"`, `target="_blank"`, `rel="noopener noreferrer"`, bg `C.accent`, texto `C.darkBg`, hover `C.accentLight` + translateY(-1px), sombra `accentDeep/66`.
- Link mapa: `https://maps.google.com/?q=Rua+1500,+820+-+Centro,+Balneário+Camboriú+-+SC`, `target="_blank"`, `rel="noopener noreferrer"`, `minHeight: 44px` via inline-flex.

## Acessibilidade

- `h1` único; ícone com `aria-hidden`.
- `role="status"` no aviso de WhatsApp.
- `:focus-visible` outline 2px `C.accent` offset 2px em CTA e link.
- Áreas de toque ≥44px em ambos os links; CTA 52px.
- Contraste: `accentDeep` sobre `lightBg` ≈ 4.9:1; texto principal `lightInk` sobre `lightBg` — passa AA.
- `lang="pt-BR"` já herdado do `__root.tsx`.

## Não faço

- Não altero `index.tsx`, `4.tsx`, `__root.tsx`, `styles.css`.
- Não adiciono dependências nem Playfair.
- Não redireciono acesso direto à URL.
- Não configuro CAPI nem outros eventos.

## Verificação

Após criação: build/typecheck automático da plataforma. Rápida inspeção do arquivo para confirmar imports (`createFileRoute`, `useEffect`, `useRef`) e ausência de referências a `Playfair`.
