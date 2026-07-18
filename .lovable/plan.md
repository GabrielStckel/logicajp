## Auditoria PageSpeed Insights (mobile)

Sem baseline anterior fornecido, o plano é medir o estado atual e deixar os números registrados na conversa para servirem de baseline para a próxima comparação (pós self-host de fontes).

### Passos

1. Chamar a API pública do PSI (`https://www.googleapis.com/pagespeedonline/v5/runPagespeed`) via `curl`, com `strategy=mobile` e `category=performance`, para cada URL:
   - `https://alogica.lovable.app/`
   - `https://alogica.lovable.app/1`
   - `https://alogica.lovable.app/obrigado`
2. Extrair de cada resposta:
   - `lighthouseResult.categories.performance.score` (nota 0–100)
   - `audits["first-contentful-paint"].numericValue` → FCP (ms)
   - `audits["largest-contentful-paint"].numericValue` → LCP (ms)
   - `audits["total-blocking-time"].numericValue` → TBT (ms)
   - `audits["cumulative-layout-shift"].numericValue` → CLS
   - `audits["speed-index"].numericValue` → SI (ms)
3. Consolidar em uma tabela markdown única (rota × métrica), destacando FCP e LCP.
4. Comentar brevemente o que o self-host de fontes deve ter impactado (FCP/LCP via remoção de round-trip para `fonts.googleapis.com` + preload dos `.woff2` críticos) e o que ainda pode ser otimizado se algum LCP > 2.5s.
5. Pedir ao usuário que, na próxima rodada, cole os números atuais como baseline — assim a comparação futura fica automática.

### Observações

- PSI é lab data (Lighthouse) — variações de ±5–10% entre runs são normais; se algum resultado parecer fora da curva, rodo uma segunda vez naquela URL.
- Sem alterações de código nesta tarefa. Apenas medição e relatório.
- Se a API do PSI responder com erro de quota/rede para alguma rota, reporto e tento novamente.
