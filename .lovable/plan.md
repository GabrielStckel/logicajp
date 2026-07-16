## Escopo

**Alvo:** `src/routes/index.tsx`.
**Intocado:** `src/routes/1.tsx`, `obrigado.tsx`, `leads.functions.ts`, sticky CTA mobile em ambas as páginas, todas as demais seções da /.

---

## Tarefa 1 — Replicar seção `#inscricao` da /1 na /

Substituir a seção `id="inscricao"` atual da / (linhas ~335–459 de `index.tsx`, container escuro com `<dl>` de detalhes, form Tailwind e `venueImage`) por uma **réplica visual e estrutural exata** da seção `#inscricao` da /1 (linhas 564–792 de `1.tsx`).

**Copiar para dentro de `index.tsx`** (não extrair componente — mantém /1 completamente intocada):

1. **Paleta `C`** (subset usado pela seção): `darkBg`, `darkInk`, `darkMuted`, `lightBg`, `lightInk`, `lightMuted`, `accent`, `accentDeep`, `accentLight`, `lineDark`, `lineLight`.
2. **Constantes de fonte** usadas na seção: `SERIF`, `DISPLAY`, `SANS`, `MONO` (mesmos valores de `1.tsx`).
3. **Helper** `inputStyle(err?: string)` idêntico ao de `1.tsx`.
4. **Bloco `<style>`** local à seção com apenas os keyframes/regras que ela usa:
   - `@keyframes l-spin` (usado no spinner do botão submit)
   - `@keyframes l-pulse` (usado no dot de escassez "60 vagas")
   - `.l-cta:hover { background-color: ${C.accentLight}; transform: translateY(-1px); }`
   - `.form-card:hover { box-shadow: ... ; transform: translateY(-2px); }`
   - `input:focus { border-color: ${C.accent}; box-shadow: 0 0 0 3px ${C.accent}22; }` (escopo por seletor de contexto se preciso, mas o próprio /1 aplica globalmente; aqui vale global no bloco `<style>` da seção)
   - `.l-cta:focus-visible, input[type="checkbox"]:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }`

**Estrutura da nova seção (cópia fiel):**
- `<section id="inscricao">` com fundo `C.darkBg`, backdrop glow radial.
- **Coluna esquerda** (pitch editorial):
  - Eyebrow "Inscrição · Edição única" com dot dourado.
  - `<h2>` Playfair "Você merece *compreender*".
  - Parágrafo "Uma noite presencial em Balneário Camboriú…".
  - **Recap chips** com 3 linhas: `Quando · 29 jul · 2026 · 19h30`, `Onde · Balneário Camboriú · SC`, `Investimento · Gratuito`.
  - **Bloco de escassez** "60 vagas · estritamente limitadas pelo espaço." com dot pulsante.
- **Coluna direita** — `.form-card` claro com ribbon accent, contendo:
  - Eyebrow "Garanta sua vaga" + `<h3>` "Preencha para receber o acesso ao grupo."
  - **[LINHA ANTI-OBJEÇÃO — EXCLUSIVA DA /]** inserida imediatamente após o `<h3>` do form-card e **antes** do `<form>`, com estilo adaptado à seção:
    ```tsx
    <p style={{
      fontFamily: MONO, fontSize: "0.6875rem", fontWeight: 500,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: C.accentDeep, margin: "0 0 1.25rem", lineHeight: 1.55,
    }}>
      Presencial e gratuito · Sem venda dura durante o evento — a Formação Completa é apresentada apenas ao final, para quem quiser.
    </p>
    ```
    Essa linha **NÃO** existe em `1.tsx` e **NÃO** deve ser adicionada lá.
  - `<form onSubmit={submit}>` com os 3 campos (Nome, E-mail, WhatsApp) renderizados pelo mesmo array/map do /1, checkbox `confirmedPresencial`, botão `l-cta` com spinner `l-spin`, `submitError` com `role="alert"`, trust row com cadeado.

**Lógica preservada da / atual (NÃO copiar do /1):**
- `submit()` usa `source: "landing_principal"` (nunca `"landing_1"`).
- `sessionStorage.setItem("lead_ok", "1")` + `navigate({ to: "/obrigado" })`.
- Validações existentes (nome ≥3, regex email, telefone ≥10 dígitos, `confirmedPresencial === true`).
- Mensagem de erro: "Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente."
- `maskPhone` já existe — reutilizar.

**Remoções:**
- `import venueImage from "@/assets/venue.jpg"` — remover.
- Todo uso de `venueImage` na seção antiga — sumirá com a substituição.
- Após grep confirmar zero referências a `venue.jpg` no projeto, apagar `src/assets/venue.jpg`.
- `Row` component da / — se ficar sem uso após substituição, remover a função também. (Confirmar via grep antes.)
- Imports/CSS classes do form antigo (`inputCls`, `labelCls`, `errCls`) — se não forem mais usados, remover.

---

## Tarefa 2 — WebP responsivo para `truth.jpg`

**Geração (ferramentas do sandbox, sem dependências novas):**
```bash
ffmpeg -y -i src/assets/truth.jpg -vf "scale=800:-2" -q:v 80 src/assets/truth-800.webp
ffmpeg -y -i src/assets/truth.jpg -vf "scale=1600:-2" -q:v 80 src/assets/truth-1600.webp
```
Verificar tamanhos (esperado bem menor que 49 KB para 800px). Manter `truth.jpg` original — segue como fallback do `<img src>` e destino dos crawlers via `og:image`.

**Uso no JSX (substituir o `<img>` da seção "A Verdade"):**
```tsx
import truthImage from "@/assets/truth.jpg";
import truth800 from "@/assets/truth-800.webp";
import truth1600 from "@/assets/truth-1600.webp";
// ...
<img
  src={truthImage}
  srcSet={`${truth800} 800w, ${truth1600} 1600w`}
  sizes="(max-width: 768px) 100vw, 896px"
  alt="Luz atravessando uma superfície cristalina escura"
  width={1600}
  height={768}
  loading="lazy"
  decoding="async"
  className="mb-16 aspect-[21/9] w-full rounded-sm object-cover opacity-90"
/>
```

**Head/SEO (não mexer):**
`og:image` e `twitter:image` continuam apontando para `${SITE_URL}${truthImage}` (JPEG absoluto, já configurado).

---

## Verificação após implementar

1. `bun run build` — passa.
2. Diff em `src/routes/1.tsx`: **vazio**. Confirmar via `git diff --stat src/routes/1.tsx` mentalmente (arquivo não é editado).
3. Preview `/`:
   - Seção `#inscricao` visualmente idêntica à `/1` (fundo escuro, form-card claro, dot pulsante, hovers).
   - Linha anti-objeção visível **acima do `<form>`** dentro do form-card, em uppercase dourado.
   - Sticky CTA mobile continua fixo no rodapé em `< md`.
   - `venue.jpg` some do HTML gerado; `srcset` do WebP presente na `<img>` da seção "A Verdade".
4. Preview `/1`: identica ao estado atual (linha anti-objeção **não** aparece; nenhum estilo alterado).
5. Submit em `/` → grava lead com `source: "landing_principal"` → navega para `/obrigado`.

## Fora de escopo

Hero, dores, "A Verdade" (só a `<img>` muda), "O que vai descobrir", FAQ, closing, footer, sticky CTA, `__root.tsx`, `styles.css`, tokens Tailwind, `1.tsx`, `obrigado.tsx`, `leads.functions.ts`. Nenhuma dependência nova.