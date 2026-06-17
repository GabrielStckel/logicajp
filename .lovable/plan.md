## Redesign da seção "O que você vai compreender"

Substituir a seção de benefícios atual (cards em grid 2 colunas com badges numéricos) pelo design **Elegant three-column grid** escolhido.

### Mudanças
- **Layout**: grid de 3 colunas no desktop, 2 no tablet, 1 no mobile — mais compacto verticalmente
- **Cards**: fundo claro, borda sutil, borda superior dourada (2px) como único acento
- **Numeração**: número em itálico serif (Playfair Display) na cor dourada — sem badge, sem número grande no fundo
- **Hover**: sombra sutil aumenta levemente (sem elevação, sem transform)
- **Densidade**: padding reduzido, gap menor entre cards

### Referência visual
Design v1 — "Elegant three-column grid" com estética minimalista, limpo e editorial.

### Arquivo alterado
- `src/routes/4.tsx` — substituição da seção BENEFITS (linhas 453–576)