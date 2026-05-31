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
        clinicSize: form.get("clinicSize"),
        hasChallenge: Boolean(String(form.get("challenge") ?? "").trim()),
        maxScrollDepth,
        clickedTargets,
        viewedSections
      },
      contact: {
        email,
        name,
        clinic
      }
    });
  };

  return (
    <form className="form-card" onSubmit={submit} onFocus={markStarted}>
      <div className="form-row">
        <label>
          Your name
          <input name="name" required placeholder="Dr. Martin" autoComplete="name" />
        </label>
        <label>
          Work email
          <input name="email" type="email" required placeholder="you@clinic.com" autoComplete="email" />
        </label>
      </div>
      <label>
        Clinic name
        <input name="clinic" required placeholder="Cork Family Clinic" autoComplete="organization" />
      </label>
      <label>
        Clinic size
        <select name="clinicSize" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="1-3">1-3 clinicians</option>
          <option value="4-10">4-10 clinicians</option>
          <option value="10-plus">10+ clinicians</option>
        </select>
      </label>
      <label>
        Main challenge
        <textarea name="challenge" placeholder="Manual reminders, GDPR worries, lost follow-ups..." />
      </label>
      <button className="primary-button wide" type="submit" disabled={status === "sent"} data-track-click="form-submit">
        {status === "sent" ? "Received. We will reply within 48 hours." : "Book free assessment"}
      </button>
      <p className="privacy-note">Your details are used only for this consultation request.</p>
    </form>
  );
}
