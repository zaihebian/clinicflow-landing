"use client";

import { useState } from "react";
import { trackBehavior } from "./VisitorTracker";

const languages = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
  { code: "pl", label: "PL" },
  { code: "zh", label: "ZH" }
];

export function LanguageSwitcher() {
  const [active, setActive] = useState("en");

  return (
    <div className="language-switcher" aria-label="Language selector">
      {languages.map((language) => (
        <button
          type="button"
          key={language.code}
          className={active === language.code ? "language-button active" : "language-button"}
          onClick={() => {
            setActive(language.code);
            document.documentElement.lang = language.code;
            trackBehavior({ type: "language_change", value: language.code, target: "language-switcher" });
          }}
          data-track-click={`language-${language.code}`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
