import { NextRequest, NextResponse } from "next/server";
import { insertBehaviorEvent, insertLeadSubmission, isBehaviorDbConfigured, longTextValue, textValue } from "../../lib/behaviorEvents";
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
    clinicSize?: string;
    challenge?: string;
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
    const clickedTargets = Array.isArray(body.metadata?.clickedTargets) ? body.metadata.clickedTargets.map(String) : [];
    const viewedSections = Array.isArray(body.metadata?.viewedSections) ? body.metadata.viewedSections.map(String) : [];
    const maxScrollDepth = Number(body.metadata?.maxScrollDepth ?? 0);
    const clinicSize =
      textValue(body.contact.clinicSize) ?? (typeof body.metadata?.clinicSize === "string" ? body.metadata.clinicSize : null);

    await insertLeadSubmission({
      visitor_id: textValue(body.visitorId),
      session_id: textValue(body.sessionId),
      name: textValue(body.contact.name),
      email: textValue(body.contact.email) ?? "",
      clinic: textValue(body.contact.clinic),
      clinic_size: clinicSize,
      challenge: longTextValue(body.contact.challenge),
      page_url: textValue(body.pageUrl),
      page_path: textValue(body.pagePath),
      referrer: textValue(body.referrer),
      max_scroll_depth: maxScrollDepth,
      clicked_targets: clickedTargets,
      viewed_sections: viewedSections,
      user_agent: request.headers.get("user-agent"),
      ip_hint: request.headers.get("x-forwarded-for")?.split(",")[0] ?? null
    });

    await syncBehaviorToMautic(
      {
        email: body.contact.email,
        name: body.contact.name,
        clinic: body.contact.clinic
      },
      {
        maxScrollDepth,
        clickedTargets,
        viewedSections,
        clinicSize,
        hasChallenge: Boolean(body.metadata?.hasChallenge)
      }
    );
  }

  return NextResponse.json({ ok: true });
}
