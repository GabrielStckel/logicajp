## Objetivo
Remover as linhas decorativas de fundo de duas seções da página.

## Alterações

### 1. Hero (seção inicial)
Remover:
- A **hairline grid** (div com `backgroundImage: linear-gradient(...)` e `backgroundSize` que cria linhas horizontais)
- O **SVG decorativo** com círculos concêntricos e linhas cruzadas (crosshair + círculos dourados)

Mantém o radial glow de fundo e todo o conteúdo textual/CTA.

### 2. Seção "O que você vai compreender" (BENEFITS)
Remover:
- A **linha vertical decorativa dourada** no topo central da seção (`position: absolute`, gradiente dourado de cima para baixo)

Mantém os cards com borda superior dourada, grid, tipografia e conteúdo.

## Escopo
Edição única no arquivo `src/routes/4.tsx`. Sem alterações de lógica, apenas remoção de elementos decorativos.