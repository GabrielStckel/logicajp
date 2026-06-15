## Objetivo

Resolver a sensação de "tudo misturado" entre as seções da página, mantendo o design claro.

## Mudanças em `src/routes/4.tsx`

1. **Alternar fundos** entre `C.lightBg` (branco) e `C.lightBgSoft` (off-white) em todas as seções, seguindo a ordem real da página:

   - Hero → `lightBg`
   - Seção 290 (depois do hero) → `lightBgSoft`
   - Seção 308 → `lightBg`
   - Seção 328 → `lightBgSoft`
   - Seção 344 (imagem) → `lightBg`
   - Seção 373 → `lightBgSoft`
   - Seção 395 → `lightBg`
   - Seção 418 (inscrição) → `lightBgSoft` (destaque)
   - Seção 482 → `lightBg`
   - Seção 522 (CTA final) → `lightBgSoft`
   - Footer → mantém `lightBgSoft` com borda superior

2. **Divisor sutil** (`borderTop: 1px solid ${C.lineLight}`) em cada seção a partir da segunda, reforçando o limite visual sem poluir.

3. **Ajustes menores de contraste** onde o fundo mudou:
   - Cartão de imagem (linha 348/352): trocar `lightBgSoft` por `lightBg` se a seção agora for `lightBgSoft`, para a moldura continuar destacando.
   - Botão da seção 418 (CTA "Garantir vaga"): garantir contraste contra o novo `lightBgSoft`.

## Fora do escopo

- Sem mudanças em tipografia, hero, navbar ou conteúdo textual.
- Sem mexer em tokens de cor em `styles.css`.
