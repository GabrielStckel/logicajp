## Ajuste ManyChat — remove antes de add tag

Em `src/lib/api/leads.functions.ts`, dentro de `syncManychat`, quando houver `subscriberId` (seja de contato novo ou duplicado), inserir uma chamada a `removeTagByName` **antes** do `addTagByName` já existente. Erros dessa chamada são engolidos silenciosamente (esperado na 1ª inscrição, quando a tag ainda não existe no contato).

### Mudança pontual

No bloco `if (subscriberId) { ... }` (hoje só faz `addTagByName`):

```ts
if (subscriberId) {
  // 1) Remover a tag primeiro — garante que o gatilho "Tag aplicada"
  // dispare no addTagByName seguinte, mesmo para contatos duplicados
  // que já tinham a tag. Erros aqui são ignorados de propósito
  // (contato sem a tag retorna erro esperado na 1ª inscrição).
  try {
    await manychatFetch(
      "https://api.manychat.com/fb/subscriber/removeTagByName",
      params.apiKey,
      { subscriber_id: subscriberId, tag_name: "inscrito_confirmou" },
    );
  } catch {
    // silencioso — comportamento esperado
  }

  // 2) Aplicar a tag (código existente, inalterado)
  const tagRes = await manychatFetch(
    "https://api.manychat.com/fb/subscriber/addTagByName",
    params.apiKey,
    { subscriber_id: subscriberId, tag_name: "inscrito_confirmou" },
  );
  if (!tagRes.ok || tagRes.json?.status === "error") {
    return {
      status: "error",
      message: `tag: ${extractManychatErrorMessage(tagRes.json, tagRes.status).slice(0, 480)}`,
    };
  }
}
```

### O que NÃO muda

- Nenhuma outra função, validação, schema ou lógica.
- `syncManychat` segue best-effort, envolvido no `try/catch` externo existente (timeout 5s por chamada via `AbortSignal.timeout` dentro de `manychatFetch`).
- `manychat_status` continua registrando `"ok"` / `"duplicado"` / `"error: ..."` exatamente como hoje — a remoção não altera esse status, só o `addTagByName` posterior pode marcar erro.
- Nenhum outro arquivo é tocado.
