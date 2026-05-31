import { getAnalyticsData, isBehaviorDbConfigured, type BehaviorEventRow, type CountRow } from "../lib/behaviorEvents";
import "../globals.css";
import "./styles.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  if (!isBehaviorDbConfigured()) {
    return (
      <main className="analytics-page">
        <h1>Supabase is not configured</h1>
        <p>Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to your environment.</p>
      </main>
    );
  }

  const { totals, eventTypes, scrollDepth, sections, clicks, recent } = await getAnalyticsData();

  return (
    <main className="analytics-page">
      <header className="analytics-header">
        <div>
          <p className="eyebrow">Traffic tool</p>
          <h1>Landing page behavior</h1>
        </div>
        <a className="primary-button" href="/">
          Back to page
        </a>
      </header>

      <section className="summary-grid">
        <SummaryCard label="Events" value={totals.events} />
        <SummaryCard label="Visitors" value={totals.visitors} />
        <SummaryCard label="Sessions" value={totals.sessions} />
        <SummaryCard label="Form submits" value={totals.form_submits ?? 0} />
      </section>

      <section className="analytics-grid">
        <Panel title="Event types" rows={eventTypes} />
        <Panel title="Scroll depth" rows={scrollDepth} suffix="%" />
        <Panel title="Viewed sections" rows={sections} />
        <Panel title="Clicked items" rows={clicks} />
      </section>

      <section className="event-list">
        <h2>Recent events</h2>
        <div className="event-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Page</th>
                <th>Section</th>
                <th>Target</th>
                <th>Value</th>
                <th>Visitor</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((event: BehaviorEventRow) => (
                <tr key={event.id}>
                  <td>{event.created_at}</td>
                  <td>{event.type}</td>
                  <td>{event.page_path ?? "-"}</td>
                  <td>{event.section ?? "-"}</td>
                  <td>{event.target ?? "-"}</td>
                  <td>{event.value ?? "-"}</td>
                  <td>{event.visitor_id?.slice(0, 18) ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Panel({ title, rows, suffix = "" }: { title: string; rows: CountRow[]; suffix?: string }) {
  return (
    <article className="analytics-panel">
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p className="empty">No data yet.</p>
      ) : (
        <ul>
          {rows.map((row) => (
            <li key={row.label ?? "unknown"}>
              <span>{row.label ?? "unknown"}{suffix}</span>
              <strong>{row.count}</strong>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
