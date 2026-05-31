import { NextRequest, NextResponse } from "next/server";
import { insertBehaviorEvent, isBehaviorDbConfigured, textValue } from "../../lib/behaviorEvents";
import { syncBehaviorToMautic } from "../../lib/mautic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BehaviorEvent = {
  type?: string;
  visitorId?: string;
  sessionId?: string;
  pageUrl?: string;
  pagePath?: string;
  referrer?: string;
  section?: string;
  target?: string;
  value?: string | number | boolean;
  metadata?: Record<string, unknown>;
  contact?: {
    email?: string;
    name?: string;
    clinic?: string;
  };
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as BehaviorEvent | null;
  if (!body?.type) {
    return NextResponse.json({ error: "type is required" }, { status: 400 });
  }

  if (!isBehaviorDbConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  await insertBehaviorEvent({
    type: textValue(body.type) ?? "unknown",
    visitor_id: textValue(body.visitorId),
    session_id: textValue(body.sessionId),
    page_url: textValue(body.pageUrl),
    page_path: textValue(body.pagePath),
    referrer: textValue(body.referrer),
    section: textValue(body.section),
    target: textValue(body.target),
    value: textValue(body.value),
    metadata_json: body.metadata ?? null,
    user_agent: request.headers.get("user-agent"),
    ip_hint: request.headers.get("x-forwarded-for")?.split(",")[0] ?? null
  });

  if (body.type === "form_submit" && body.contact?.email) {
    await syncBehaviorToMautic(
      {
        email: body.contact.email,
        name: body.contact.name,
        clinic: body.contact.clinic
      },
      {
        maxScrollDepth: Number(body.metadata?.maxScrollDepth ?? 0),
        clickedTargets: Array.isArray(body.metadata?.clickedTargets) ? body.metadata.clickedTargets.map(String) : [],
        viewedSections: Array.isArray(body.metadata?.viewedSections) ? body.metadata.viewedSections.map(String) : [],
        clinicSize: typeof body.metadata?.clinicSize === "string" ? body.metadata.clinicSize : null,
        hasChallenge: Boolean(body.metadata?.hasChallenge)
      }
    );
  }

  return NextResponse.json({ ok: true });
}
