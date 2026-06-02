import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LeadForm } from "./components/LeadForm";
import { VisitorTracker } from "./components/VisitorTracker";

const steps = [
  [
    "Understand your clinic's needs (Week 1)",
    "We conduct a deep-dive assessment of your patient workflows, existing systems (booking software, HIS), and which processes need automation most urgently."
  ],
  [
    "Deploy and configure (Weeks 2–3)",
    "We deploy Mautic on your server (or a European data centre), configure follow-up reminders, appointment confirmations, and health newsletters — fully GDPR-compliant. Your data stays in your hands."
  ],
  [
    "Go live, train, and ongoing support",
    "After launch, we train your team on using the system. Monthly reports show you which patients need follow-up, with continuous optimisation."
  ]
];

const packages = [
  {
    icon: "⏰",
    name: "Starter",
    description: "Perfect for clinics just getting started with automation",
    note: "Does not include behavioural triggers — you may miss high-intent patients",
    negative: true,
    features: ["Automated reminder emails", "SMS & appointment confirmations", "Basic patient segments"]
  },
  {
    icon: "✅",
    name: "Standard",
    description: "Most popular: full automation for growing clinics",
    highlighted: true,
    features: [
      "Automated reminder emails",
      "SMS & appointment confirmations",
      "Advanced patient segmentation",
      "Health education newsletters",
      "Monthly performance reports"
    ]
  },
  {
    icon: "🔐",
    name: "Premium",
    description: "Enterprise: full customization & dedicated support",
    note: "Equivalent to 2 months of HubSpot Professional",
    features: [
      "Automated reminder emails",
      "SMS & appointment confirmations",
      "Lead scoring & behavior triggers",
      "Custom workflow design",
      "HIS/EHR integration support",
      "Dedicated account manager"
    ]
  }
];

const pains = [
  {
    icon: "📋",
    key: "retention",
    title: "Low return visit rate",
    body: "Annual check-ups, follow-up appointments — patients know they should come, but forget, and no one follows up.",
    solution:
      "Here's how ClinicFlow solved this for Murphy Family Practice: targeted follow-up sequences were sent automatically after every appointment, boosting return visits without adding work for reception.",
    metrics: ["34% higher return visits", "20+ automated workflows"],
    cta: "Schedule a free clinic review"
  },
  {
    icon: "📞",
    key: "reception",
    title: "Overloaded reception",
    body: "Nurses spend hours manually calling to remind patients. That time could be spent on actual patient care.",
    solution:
      "ClinicFlow replaced manual calls with automated reminders and confirmations, freeing reception staff to focus on patient care while improving response rates.",
    metrics: ["2 hours saved per day", "Automated appointment confirmations"],
    cta: "Start your automation plan"
  },
  {
    icon: "📊",
    key: "visibility",
    title: "No visibility on marketing",
    body: "You send emails or texts but have no idea how many people opened them or booked an appointment.",
    solution:
      "By tracking engagement and appointment outcomes, ClinicFlow gave clinics clear insight into what messages work and where the patient journey needs refinement.",
    metrics: ["4x clearer campaign results", "Real-time engagement tracking"],
    cta: "See the metrics that matter"
  },
  {
    icon: "🔐",
    key: "compliance",
    title: "Data compliance worries",
    body: "Patient data is extremely sensitive. US cloud services make you uneasy, and GDPR fines are a real risk.",
    solution:
      "Our self-hosted setup keeps patient data in Europe, with audit-ready consent records so clinics can automate follow-up without compromising GDPR compliance.",
    metrics: ["100% EU data residency", "Audit-ready consent logging"],
    cta: "Protect your patient data"
  }
];

const scenarios = [
  [
    "Chronic care follow-up",
    "Patients with diabetes, hypertension, or pregnancy receive scheduled care reminders and education."
  ],
  [
    "New patient onboarding",
    "Automatically send welcome messages, preparation instructions and follow-up guidance after the first visit."
  ],
  ["No-show & cancellation flow", "Automatically handle missed appointments, cancellations and rescheduling follow up."]
];

const complianceChecks = [
  [
    "📁",
    "Local data ownership",
    "Patient information stays on your European server and never goes to U.S. or third-party cloud providers.",
    "VERIFIED"
  ],
  [
    "🧾",
    "Consent & audit records",
    "Supports consent logging, withdrawal tracking and GDPR-required access logs.",
    "AUDIT-READY"
  ],
  [
    "🛡️",
    "DPA-ready deployment",
    "We deploy with DPA compatibility, HTTPS encryption, role-based access controls, and automated backup strategy.",
    "DPA COMPLIANT"
  ]
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
          <div className="kpi-bar" aria-hidden="true">
            <div className="kpi-item">
              <strong>€2,400</strong>
              <span>Monthly loss</span>
            </div>
            <div className="kpi-item">
              <strong>34%</strong>
              <span>Return visit uplift</span>
            </div>
            <div className="kpi-item">
              <strong>3 wks</strong>
              <span>Time to launch</span>
            </div>
          </div>
          <h1>
            The average European clinic loses <strong>€2,400/month</strong> to missed follow-up appointments
          </h1>
          <p className="hero-text">ClinicFlow automates patient reactivation — so you recover that revenue on autopilot.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact" data-track-click="hero-primary-cta">
              Book a Free Assessment →
            </a>
            <a className="text-link" href="#how" data-track-click="hero-how-link">
              See how it works
            </a>
          </div>
          <div className="scarcity-badge" role="status" aria-live="polite">
            <span className="scarcity-dot" aria-hidden="true" />
            We onboard max 3 clinics/month — 2 spots remaining for June
          </div>
          <p className="small-note">🔒 No credit card · Completely free · Reply within 48 hours</p>
        </div>
        <div className="hero-media" aria-label="Clinic automation workspace">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
            alt="Clinician reviewing digital patient workflow on a tablet"
          />
        </div>
      </section>

      <section className="trust-strip" data-track-section="trust">
        <span>
          <strong>200k+</strong>
          organisations
        </span>
        <span>
          <strong>EU-hosted</strong>
          data residency
        </span>
        <span>
          <strong>GDPR</strong>
          compliant
        </span>
        <span>
          <strong>-80%</strong>
          costs
        </span>
      </section>

      <section className="section" data-track-section="features">
        <div className="section-heading">
          <p className="eyebrow">Core automation features</p>
          <h2>ClinicFlow gives clinics these automation capabilities</h2>
          <p>From appointment reminders to self-hosted GDPR control, turn patient follow-up into a measurable workflow.</p>
        </div>
        <div className="package-grid">
          {packages.map((plan) => (
            <article className={plan.highlighted ? "package-card highlighted" : "package-card"} key={plan.name}>
              <div className="package-icon">{plan.icon}</div>
              <h3>{plan.name}</h3>
              <p className="package-desc">{plan.description}</p>
              {plan.note ? <p className={plan.negative ? "package-note negative" : "package-note"}>{plan.note}</p> : null}
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="primary-button wide" href="#contact" data-track-click={`package-${plan.name.toLowerCase()}`}>
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" data-track-section="problems">
        <div className="section-heading">
          <p className="eyebrow">Do any of these sound familiar?</p>
          <h2>Your clinic is losing patients you could have kept</h2>
          <p>
            Most patients don't leave because they're unhappy — they leave because no one reached out at the right
            moment.
          </p>
        </div>
        <div className="pain-grid">
          {pains.map((pain) => (
            <article className="pain-card" key={pain.key} data-pain-key={pain.key}>
              <div className="package-icon">{pain.icon}</div>
              <h3>{pain.title}</h3>
              <p>{pain.body}</p>
              <p className="pain-solution">{pain.solution}</p>
              <div className="pain-metrics">
                {pain.metrics.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>
              <a className="text-link" href="#contact" data-track-click={`pain-${pain.key}`}>
                {pain.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted" data-track-section="scenarios">
        <div className="section-heading">
          <p className="eyebrow">Real clinic use cases</p>
          <h2>Common automation scenarios for clinics</h2>
          <p>These are the most valuable Mautic workflows we build for healthcare practices.</p>
        </div>
        <div className="steps">
          {scenarios.map(([title, body], index) => (
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

      <section className="section" data-track-section="gdpr">
        <div className="section-heading">
          <p className="eyebrow">GDPR self-hosting advantages</p>
          <h2>Keep patient data fully under your control</h2>
          <p>
            Mautic is both a marketing tool and a compliance tool. We help you build local workflows that are
            audit-ready.
          </p>
        </div>
        <div className="feature-grid">
          {complianceChecks.map(([icon, title, body, badge]) => (
            <article className="feature-card compliance-card" key={title}>
              <div className="package-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
              <span>{badge}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="section muted" data-track-section="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How we help</p>
          <h2>Three steps to your patient automation system</h2>
          <p>We handle all the technical work — you focus on your patients.</p>
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
          <h2>Compare your options</h2>
          <p>There are many marketing tools, but very few are designed with healthcare compliance in mind.</p>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>ClinicFlow (us)</th>
                <th>Mailchimp / HubSpot</th>
                <th>Do nothing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GDPR self-hosted data</td>
                <td>Data on your server</td>
                <td>Data on US servers</td>
                <td>—</td>
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
                <td>—</td>
              </tr>
              <tr>
                <td>Monthly cost</td>
                <td>One-time setup + low maintenance</td>
                <td>€300–€1500+/month</td>
                <td>Hidden cost from patient churn</td>
              </tr>
              <tr>
                <td>Local language support</td>
                <td>Direct communication</td>
                <td>English support only</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="testimonial-section" data-track-section="social-proof">
        <div>
          <p className="eyebrow">Social proof</p>
          <blockquote>Built on Mautic — trusted by 200,000+ organisations worldwide.</blockquote>
          <p>
            <strong>GDPR-compliant architecture</strong> used by healthcare providers across the EU.
          </p>
        </div>
      </section>

      <section id="contact" className="contact-section" data-track-section="contact">
        <div className="contact-copy">
          <p className="eyebrow">Free assessment</p>
          <h2>Book your free assessment</h2>
          <p>
            Tell us about your clinic and we will get back to you within 48 hours, with no sales pressure whatsoever.
          </p>
        </div>
        <LeadForm />
      </section>

      <footer>
        <strong>
          Clinic<span>Flow</span>
        </strong>
        <p>Marketing automation for small and mid-size European healthcare practices. Built on open-source Mautic — your data, your control.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Data Processing Agreement (DPA)</a>
          <a href="#">About us</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="copyright">© 2026 ClinicFlow · Athlone, Ireland · Registered in Ireland</p>
      </footer>
    </main>
  );
}
