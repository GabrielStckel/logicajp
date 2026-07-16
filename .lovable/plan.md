## Objetivo

Criar backend reutilizável de captura de leads: tabela `leads` no Lovable Cloud + server function `submitLead` que persiste o lead e dispara integração best-effort com ManyChat.

Nenhuma landing page é tocada. Nenhuma dependência nova. Sem segredos no código — usa apenas `MANYCHAT_API_KEY` já configurado.

## 1. Migração SQL (tabela `leads`)

Criada via ferramenta de migração do Lovable Cloud, seguindo a ordem obrigatória CREATE → GRANT → RLS → POLICY.

```sql
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  confirmed_presencial boolean NOT NULL DEFAULT false,
  source text NOT NULL,
  manychat_status text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Sem acesso público (anon/authenticated). Somente service_role escreve/lê,
-- que é o cliente usado pela server function.
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Sem policies: qualquer acesso via anon/authenticated fica bloqueado.
-- service_role bypassa RLS.
```

Índice auxiliar opcional por `source` e `created_at` para futuras consultas administrativas — incluído na migração.

## 2. Server function `src/lib/api/leads.functions.ts`

Segue exatamente o padrão de `example.functions.ts` (createServerFn + zod inputValidator). Sem middleware de auth: é endpoint público chamado pelos formulários das landings.

Estrutura:

- **Schema zod de entrada**:
  - `name`: string, min 3, trim
  - `email`: string, email válido, max 255
  - `phone`: string (máscara brasileira aceita)
  - `confirmedPresencial`: boolean
  - `source`: string, min 1
- **Normalização do telefone** (helper local no arquivo):
  - remover tudo que não é dígito
  - se 10 ou 11 dígitos → prefixar `+55`
  - se já começa com `55` e tem 12/13 → prefixar `+`
  - validar regex final: `^\+55\d{2}\d{8,9}$`
  - se inválido → lançar erro de validação (retornado ao cliente)
- **Passo 1 — persistência (crítico)**:
  - Import dinâmico dentro do handler: `const { supabaseAdmin } = await import("@/integrations/supabase/client.server")` (evita vazar módulo server-only para o bundle do cliente)
  - Insert em `public.leads` com `phone` normalizado, `manychat_status: null` inicialmente
  - Se falhar → `throw new Error(...)` → cliente recebe erro
- **Passo 2 — ManyChat (best-effort)**:
  - Helper `callManychat(url, body)`: `fetch` com `AbortSignal.timeout(5000)`, header `Authorization: Bearer ${process.env.MANYCHAT_API_KEY}` (lido dentro do handler), `Content-Type: application/json`
  - `createSubscriber` com corpo especificado no prompt (first_name = primeira palavra de `name`, whatsapp_phone/phone = telefone normalizado com `+`, email, consent_phrase, has_opt_in_sms: true)
  - Detecção de duplicado: resposta com `status: "error"` cuja mensagem/detalhes indicam contato já existente — extrair o `subscriber_id` do payload de erro quando presente; caso contrário tentar buscar via `getInfoByUserRef`/campo do erro. Marcar `duplicated = true`.
  - Se `ok` ou `duplicado` e temos `subscriber_id` → chamar `addTagByName` com `tag_name: "inscrito_confirmou"`
  - Atualizar `manychat_status` no lead recém-criado:
    - `"ok"` — createSubscriber + addTag concluídos com sucesso
    - `"duplicado"` — contato já existia; tag aplicada quando id disponível
    - mensagem de erro curta (truncada) — qualquer outra falha
  - Todo o passo 2 é envolvido em try/catch — nunca propaga erro ao cliente
- **Retorno**: `{ ok: true }` sempre que passo 1 for bem-sucedido

## 3. Notas técnicas

- `MANYCHAT_API_KEY` já está nos secrets do projeto — lido via `process.env.MANYCHAT_API_KEY` dentro do `.handler()` (nunca em escopo de módulo).
- `supabaseAdmin` importado dinamicamente dentro do handler para respeitar o guard de bundle client-side (arquivo `.functions.ts` é alcançável pelo cliente; só o corpo do handler é stripado).
- Timeout de 5s via `AbortSignal.timeout(5000)` nas duas chamadas ManyChat.
- Sem alteração em `src/start.ts`, `client.ts`, `types.ts`, ou qualquer landing page.
- `types.ts` é regenerado automaticamente após a migração ser aprovada; o código da server function usa `supabaseAdmin.from("leads")` que ficará tipado.

## Arquivos afetados

- **novo**: migração SQL (tabela `leads` + grants + RLS)
- **novo**: `src/lib/api/leads.functions.ts`
- `src/integrations/supabase/types.ts` regenerado automaticamente após a migração

Nenhum outro arquivo é modificado.
