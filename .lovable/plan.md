## Estado atual

Este pedido já foi totalmente implementado no turno anterior em `src/routes/4.tsx`. Verificação por `grep` confirma:

- `WHATSAPP_GROUP_URL` removido do arquivo (constante e todos os usos: submit, bloco `submitted` e link do footer).
- Estado `submitted` removido; substituído por `submitting` + `submitError`.
- Import de `useNavigate` do `@tanstack/react-router` e de `submitLead` de `@/lib/api/leads.functions` adicionados.
- Submit é `async`, mantém toda a validação client-side (name, email, phone, checkbox `confirmedPresencial`), chama `await submitLead({ data: { name, email, phone, confirmedPresencial, source: "landing_4" } })`.
- Sucesso: `sessionStorage.setItem("lead_ok", "1")` + `navigate({ to: "/obrigado" })`.
- Erro: exibe "Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente." abaixo do botão, no mesmo estilo dos erros existentes (`#C0392B`), sem limpar os campos, e o botão volta ao normal.
- Botão em loading: `disabled`, texto "Enviando...", spinner usando o keyframe `l-spin` já existente, dimensões e cor preservadas (apenas `opacity` e `cursor` mudam durante loading).
- Footer: link "Grupo no WhatsApp" removido; e-mail de contato e resto do layout intactos.

## Ação proposta

Nenhuma. Não há mudanças a fazer neste turno — o trabalho descrito já está no arquivo.

Se quiser que eu revalide algo específico (rodar o build, testar o fluxo no preview via Playwright, ou revisar visualmente um trecho), me diga qual — caso contrário este pedido está concluído.