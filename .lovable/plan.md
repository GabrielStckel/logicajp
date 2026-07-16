Two small edits to `src/lib/api/leads.functions.ts`, nothing else:

1. **Payload do createSubscriber** — adicionar `has_opt_in_email: true` no corpo enviado a `https://api.manychat.com/fb/subscriber/createSubscriber`, mantendo `has_opt_in_sms: true`, `first_name`, `whatsapp_phone`, `phone`, `email` e `consent_phrase`.

2. **Mensagem de erro detalhada** — na função `syncManychat`, quando a resposta do createSubscriber vier com erro (não-ok ou `status === "error"` e não for duplicado), extrair a mensagem mais específica disponível do JSON de resposta, na ordem:
   - `json.details.messages[0].message` (quando é objeto) ou `json.details.messages[0]` (quando é string)
   - `json.details.message`
   - `json.message`
   - fallback `HTTP <status>`
   
   Serializar objeto se necessário, truncar em ~500 caracteres, e retornar como `{ status: "error", message }`. O handler já grava esse texto em `manychat_status` como `error: <message>`. Aplicar a mesma extração no ramo do `addTagByName` para consistência.

Comportamento inalterado: erro no ManyChat não bloqueia o fluxo — o lead continua salvo e o handler apenas atualiza `manychat_status`.
