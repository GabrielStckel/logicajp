# Aprimoramento da página /4

## 1. Texto justificado
- Aplicar `textAlign: "justify"` + `hyphens: "auto"` em todos os parágrafos de corpo (`<p>` longos) das seções: Abertura, Por que este encontro, Sobre o método, Para quem é, e textos de apoio.
- Manter alinhamento original (centro/esquerda) em: H1 do hero, eyebrows, títulos de seção, listas curtas, labels de formulário, citações em destaque e rodapé.

## 2. Organização e aprimoramentos de design
- Padronizar espaçamento vertical entre seções (usar escala consistente: 6rem desktop / 4rem mobile).
- Padronizar `max-width` dos blocos de texto (~640px) para melhorar leitura junto ao justificado.
- Refinar hierarquia: aumentar respiro acima de eyebrows, padronizar tamanho dos H2 e line-height dos parágrafos (1.7).
- Garantir consistência de cor verde já corrigida (`C.accentDeep` em fundos claros, `C.accent` em fundos escuros).
- Pequenos ajustes de divisores entre seções para ritmo visual mais claro.

## 3. Rodapé — remover e melhorar
- **Remover** a linha: "Documento elaborado em 09 de junho de 2026. As informações contidas são de responsabilidade do organizador."
- **Novo rodapé** (fundo escuro, mesma paleta), com 3 blocos em grid responsivo:
  1. **Marca**: "Jonas Peress" + tagline curta "Ciência Sistêmica do Dinheiro" + breve descrição (1 linha).
  2. **Evento**: data, local e link "Garantir vaga" (âncora para o formulário).
  3. **Contato/Links**: e-mail de contato + links sociais (placeholders editáveis).
- Linha inferior fina com: `© 2026 Jonas Peress` à esquerda e um link discreto "Voltar ao topo" à direita.
- Tipografia: `MONO` para labels/eyebrows do rodapé, `SANS` para textos, mantendo coerência com o resto da página.
- Em mobile: colunas empilham, mantendo alinhamento à esquerda (não justificado no rodapé).

## Detalhes técnicos
- Arquivo único: `src/routes/4.tsx`.
- Sem mudanças em lógica/dados — apenas estilos inline e markup do `<footer>`.
- Preservar fontes atuais (DISPLAY/SANS/MONO/SERIF) e o H1 do hero intactos.
