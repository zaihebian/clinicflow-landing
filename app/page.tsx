import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LeadForm } from "./components/LeadForm";
import { VisitorTracker } from "./components/VisitorTracker";

const features = [
  ["Automated reminders", "Send follow-up emails and SMS automatically based on treatment dates, appointment windows, and patient segments."],
  ["Appointment confirmations", "Confirm, cancel, and no-show messages reduce missed visits and free up front desk time."],
  ["Segmented patient journeys", "Group patients by condition, age, visit type, or consent status for more relevant communication."],
  ["Health newsletters", "Deliver GDPR-safe educational content and clinic updates without manual work."],
  ["Lead scoring & triggers", "Assign scores from patient behavior and trigger follow-up actions automatically."],
  ["Self-hosted data control", "Run Mautic on your own European server so patient data stays under your control."]
];

const steps = [
  ["Understand your clinic's needs", "We assess your patient workflows, existing systems, and the processes that most urgently need automation."],
  ["Deploy and configure", "We deploy Mautic on your server or a European data centre, then configure reminders, confirmations, and health newsletters."],
  ["Go live, train, and support", "We train your team and provide reporting so you can see which patients need follow-up."]
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
            Free Consultation
          </a>
        </div>
      </nav>

      <section id="hero" className="hero" data-track-section="hero">
        <div className="hero-copy">
          <p className="eyebrow">Designed for small & mid-size European clinics</p>
          <h1>The average European clinic loses revenue to missed follow-up appointments.</h1>
          <p className="hero-text">
            ClinicFlow automates patient reactivation, appointment confirmations, health newsletters, and GDPR-safe
            behavior tracking, powered by self-hosted Mautic.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact" data-track-click="hero-primary-cta">
              Book a Free Assessment
            </a>
            <a className="text-link" href="#how" data-track-click="hero-how-link">
              See how it works
            </a>
          </div>
          <p className="small-note">No credit card. Completely free. Reply within 48 hours.</p>
        </div>
        <div className="hero-media" aria-label="Clinic automation workspace">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
            alt="Clinician reviewing digital patient workflow on a tablet"
          />
        </div>
      </section>

      <section className="trust-strip" data-track-section="trust">
        <span>100% GDPR Compliant</span>
        <span>Self-hosted, no third parties</span>
        <span>Healthcare-specific setup</span>
        <span>Open source, no monthly lock-in</span>
      </section>

      <section className="section" data-track-section="features">
        <div className="section-heading">
          <p className="eyebrow">Core automation features</p>
          <h2>ClinicFlow gives clinics these automation capabilities.</h2>
          <p>From appointment reminders to self-hosted GDPR control, turn patient follow-up into a measurable workflow.</p>
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
          <p className="eyebrow">How we help</p>
          <h2>Three steps to your patient automation system.</h2>
          <p>We handle the technical work so you can focus on your patients.</p>
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
          <p className="eyebrow">Why choose us</p>
          <h2>Compare your options.</h2>
          <p>There are many marketing tools, but very few are designed with healthcare compliance in mind.</p>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>ClinicFlow</th>
                <th>Mailchimp / HubSpot</th>
                <th>Do nothing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GDPR self-hosted data</td>
                <td>Data on your server</td>
                <td>Data on vendor servers</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Automated follow-up reminders</td>
                <td>Rule-based auto-trigger</td>
                <td>Manual setup required</td>
                <td>Manual calls only</td>
              </tr>
              <tr>
                <td>Healthcare-specific templates</td>
                <td>Ready out of the box</td>
                <td>Build from scratch</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Monthly cost</td>
                <td>One-time setup + low maintenance</td>
                <td>€300-€1500+/month</td>
                <td>Hidden cost from patient churn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="contact" className="contact-section" data-track-section="contact">
        <div className="contact-copy">
          <p className="eyebrow">Free assessment</p>
          <h2>Book your free assessment.</h2>
          <p>
            Tell us about your clinic and we will get back to you within 48 hours, with no sales pressure whatsoever.
          </p>
        </div>
        <LeadForm />
      </section>

      <footer>
        <strong>ClinicFlow</strong>
        <p>Marketing automation for small and mid-size European healthcare practices. Built on open-source Mautic.</p>
      </footer>
    </main>
  );
}
