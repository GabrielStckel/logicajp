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

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX leads_source_idx ON public.leads (source);
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);