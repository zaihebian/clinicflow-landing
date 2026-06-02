create table if not exists public.behavior_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type text not null,
  visitor_id text,
  session_id text,
  page_url text,
  page_path text,
  referrer text,
  section text,
  target text,
  value text,
  metadata_json jsonb,
  user_agent text,
  ip_hint text
);

create index if not exists behavior_events_created_at_idx
  on public.behavior_events (created_at desc);

create index if not exists behavior_events_type_idx
  on public.behavior_events (type);

create index if not exists behavior_events_visitor_id_idx
  on public.behavior_events (visitor_id);

alter table public.behavior_events enable row level security;

create table if not exists public.lead_submissions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text,
  session_id text,
  name text,
  email text not null,
  clinic text,
  clinic_size text,
  challenge text,
  page_url text,
  page_path text,
  referrer text,
  max_scroll_depth integer,
  clicked_targets text[],
  viewed_sections text[],
  user_agent text,
  ip_hint text
);

create index if not exists lead_submissions_created_at_idx
  on public.lead_submissions (created_at desc);

create index if not exists lead_submissions_email_idx
  on public.lead_submissions (email);

alter table public.lead_submissions enable row level security;

-- The Next.js server writes with the Supabase service role key.
-- Do not expose the service role key in browser/client code.
