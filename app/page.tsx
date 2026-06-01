import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LeadForm } from "./components/LeadForm";
import { VisitorTracker } from "./components/VisitorTracker";

const features = [
  ["Automated reminders", "Send follow-up emails and appointment reminders from patient dates and consent status."],
  ["Appointment confirmations", "Reduce missed visits with confirmation, cancellation, and no-show workflows."],
  ["Segmented journeys", "Group contacts by visit type, service line, interest, or source for relevant follow-up."],
  ["Health newsletters", "Send clinic updates and education without giving patient data to a third-party marketing cloud."],
  ["Lead scoring", "Score high-intent visitors and hand the best leads to your CRM or front desk."],
  ["EU self-hosting", "Run the system on your own European server with clear data control."]
];

const steps = [
  ["Map the patient journey", "We identify forms, landing pages, reminders, and follow-up points that should be tracked."],
  ["Deploy Mautic safely", "Mautic runs on your server, while visitor interest and form activity are captured for follow-up."],
  ["Send hot leads to CRM", "High-intent contacts can be pushed to HubSpot, Pipedrive, or a task queue for your team."]
];

export default function Home() {
  return (
    <main>
      <VisitorTracker />
      <nav className="top-nav">
        <a className="brand" href="#hero" data-track-click="nav-brand">
          Clinic<span>Flow</span>
        </a>
        <div className="nav-actions">
          <LanguageSwitcher />
          <a className="nav-cta" href="#contact" data-track-click="nav-consultation">
            Free consultation
          </a>
        </div>
      </nav>

      <section id="hero" className="hero" data-track-section="hero">
        <div className="hero-copy">
          <p className="eyebrow">Built for European clinics</p>
          <h1>Bring patients back before they forget to return.</h1>
          <p className="hero-text">
            A GDPR-aware marketing automation setup for appointment reminders, health content, landing page tracking,
            and high-intent lead follow-up, powered by self-hosted Mautic.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact" data-track-click="hero-primary-cta">
              Book free assessment
            </a>
            <a className="text-link" href="#how" data-track-click="hero-how-link">
              See how it works
            </a>
          </div>
          <p className="small-note">No credit card. Reply within 48 hours.</p>
        </div>
        <div className="hero-media" aria-label="Clinic automation workspace">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
            alt="Clinician reviewing digital patient workflow on a tablet"
          />
        </div>
      </section>

      <section className="trust-strip" data-track-section="trust">
        <span>GDPR-conscious</span>
        <span>Self-hosted Mautic</span>
        <span>EU server ready</span>
        <span>CRM handoff</span>
      </section>

      <section className="section" data-track-section="features">
        <div className="section-heading">
          <p className="eyebrow">Core features</p>
          <h2>Everything the landing page needs to become measurable.</h2>
          <p>
            See which clinic prospects are engaging, what they care about, and when they are ready for a timely follow-up.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(([title, body]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="section muted" data-track-section="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Three practical steps from visitor to follow-up.</h2>
        </div>
        <div className="steps">
          {steps.map(([title, body], index) => (
            <article className="step" key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section comparison" data-track-section="comparison">
        <div className="section-heading">
          <p className="eyebrow">Why self-hosted</p>
          <h2>Designed for clinics that care about patient data control.</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Need</th>
                <th>ClinicFlow</th>
                <th>Generic marketing tools</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data hosting</td>
                <td>Client-controlled EU server</td>
                <td>Vendor cloud</td>
              </tr>
              <tr>
                <td>Patient reminders</td>
                <td>Clinic-specific automation</td>
                <td>Manual configuration</td>
              </tr>
              <tr>
                <td>Landing tracking</td>
                <td>Mautic plus behavior database</td>
                <td>Usually pageview-only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="contact" className="contact-section" data-track-section="contact">
        <div className="contact-copy">
          <p className="eyebrow">Free assessment</p>
          <h2>Tell us what your clinic needs to track.</h2>
          <p>
            Submit the form and the page will record a safe metadata event in the behavior database. It does not record
            typed message content.
          </p>
        </div>
        <LeadForm />
      </section>

      <footer>
        <strong>ClinicFlow</strong>
        <p>Self-hosted marketing automation for European clinics.</p>
      </footer>
    </main>
  );
}
