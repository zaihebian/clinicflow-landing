import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type BehaviorEventInput = {
  type: string;
  visitor_id?: string | null;
  session_id?: string | null;
  page_url?: string | null;
  page_path?: string | null;
  referrer?: string | null;
  section?: string | null;
  target?: string | null;
  value?: string | null;
  metadata_json?: Record<string, unknown> | null;
  user_agent?: string | null;
  ip_hint?: string | null;
};

export type BehaviorEventRow = BehaviorEventInput & {
  id: number;
  created_at: string;
};

export type LeadSubmissionInput = {
  visitor_id?: string | null;
  session_id?: string | null;
  name?: string | null;
  email: string;
  clinic?: string | null;
  clinic_size?: string | null;
  challenge?: string | null;
  page_url?: string | null;
  page_path?: string | null;
  referrer?: string | null;
  max_scroll_depth?: number | null;
  clicked_targets?: string[] | null;
  viewed_sections?: string[] | null;
  user_agent?: string | null;
  ip_hint?: string | null;
};

export type CountRow = {
  label: string;
  count: number;
};

let supabase: SupabaseClient | null = null;

export function isBehaviorDbConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdmin() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return supabase;
}

export function textValue(value: unknown) {
  if (value === undefined || value === null) return null;
  return String(value).slice(0, 500);
}

export function longTextValue(value: unknown) {
  if (value === undefined || value === null) return null;
  return String(value).slice(0, 5000);
}

export async function insertBehaviorEvent(event: BehaviorEventInput) {
  const { error } = await getSupabaseAdmin().from("behavior_events").insert(event);
  if (error) throw error;
}

export async function insertLeadSubmission(submission: LeadSubmissionInput) {
  const { error } = await getSupabaseAdmin().from("lead_submissions").insert(submission);
  if (error) throw error;
}

export async function getAnalyticsData() {
  const { data, error } = await getSupabaseAdmin()
    .from("behavior_events")
    .select("*")
    .order("id", { ascending: false })
    .limit(5000);

  if (error) throw error;

  const events = (data ?? []) as BehaviorEventRow[];
  const visitors = new Set(events.map((event) => event.visitor_id).filter(Boolean));
  const sessions = new Set(events.map((event) => event.session_id).filter(Boolean));

  return {
    totals: {
      events: events.length,
      visitors: visitors.size,
      sessions: sessions.size,
      form_submits: events.filter((event) => event.type === "form_submit").length
    },
    eventTypes: countBy(events, (event) => event.type),
    scrollDepth: countBy(
      events.filter((event) => event.type === "scroll_depth"),
      (event) => event.value ?? "unknown",
      true
    ),
    sections: countBy(
      events.filter((event) => event.type === "section_view"),
      (event) => event.section ?? "unknown"
    ),
    clicks: countBy(
      events.filter((event) => event.type === "click"),
      (event) => event.target ?? "unknown"
    ).slice(0, 12),
    recent: events.slice(0, 80)
  };
}

function countBy(rows: BehaviorEventRow[], getLabel: (row: BehaviorEventRow) => string, numeric = false): CountRow[] {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    const label = getLabel(row);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  });

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => {
      if (numeric) return Number(a.label) - Number(b.label);
      return b.count - a.count;
    });
}
