"use client";

import { FormEvent, useState } from "react";
import { trackBehavior } from "./VisitorTracker";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [started, setStarted] = useState(false);

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    trackBehavior({ type: "form_start", section: "contact", target: "assessment-form" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const clinic = String(form.get("clinic") ?? "");
    const clinicSize = String(form.get("clinicSize") ?? "");
    const challenge = String(form.get("challenge") ?? "").trim();
    const maxScrollDepth = Number(window.localStorage.getItem("clinicflow_max_scroll_depth") ?? "0");
    const clickedTargets = JSON.parse(window.localStorage.getItem("clinicflow_clicked_targets") ?? "[]") as string[];
    const viewedSections = JSON.parse(window.localStorage.getItem("clinicflow_viewed_sections") ?? "[]") as string[];

    window.mt?.("send", "pageview", {
      email,
      firstname: name,
      company: clinic
    });

    setStatus("sent");
    trackBehavior({
      type: "form_submit",
      section: "contact",
      target: "assessment-form",
      metadata: {
        clinicSize,
        hasChallenge: Boolean(challenge),
        maxScrollDepth,
        clickedTargets,
        viewedSections
      },
      contact: {
        email,
        name,
        clinic,
        clinicSize,
        challenge
      }
    });
  };

  return (
    <form className="form-card" onSubmit={submit} onFocus={markStarted}>
      <div className="form-row">
        <label>
          Your name
          <input name="name" required placeholder="Dr. Smith" autoComplete="name" />
        </label>
        <label>
          Work email
          <input name="email" type="email" required placeholder="doctor@yourclinic.ie" autoComplete="email" />
        </label>
      </div>
      <label>
        Clinic name
        <input name="clinic" required placeholder="Cork City Clinic" autoComplete="organization" />
      </label>
      <label>
        Clinic size
        <select name="clinicSize" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="1-3">1-3 doctors (small practice)</option>
          <option value="4-10">4-10 doctors (mid-size clinic)</option>
          <option value="10-plus">10+ doctors (multi-department)</option>
        </select>
      </label>
      <label>
        What's your biggest challenge? (optional)
        <textarea name="challenge" placeholder="e.g. follow-up reminders too manual, GDPR compliance concerns..." />
      </label>
      <button className="primary-button wide" type="submit" disabled={status === "sent"} data-track-click="form-submit">
        {status === "sent" ? "✓ Received! We'll contact you within 48 hours." : "Book free assessment →"}
      </button>
      {status === "sent" ? (
        <div className="form-success" role="status" aria-live="polite">
          <h3>✓ You're confirmed for a free assessment!</h3>
          <p>Here's what happens next:</p>
          <ol>
            <li>You'll receive a calendar invite within 24 hours</li>
            <li>We'll review your clinic profile before the call</li>
            <li>The call takes 30 minutes — no preparation needed</li>
          </ol>
          <p>
            While you wait, <a href="#">download our GDPR Compliance Guide →</a>
          </p>
        </div>
      ) : null}
      <p className="privacy-note">
        Your information is used only for this consultation and nothing else, in accordance with GDPR Art. 6(1).
      </p>
    </form>
  );
}
