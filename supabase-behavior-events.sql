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

-- The Next.js server writes with the Supabase service role key.
-- Do not expose the service role key in browser/client code.
