"use client";

// Loads the official Calendly inline widget.
//
// No booking data passes through this app. The Calendly iframe handles the
// form and the scheduling. We never see, store, or forward what a person
// types. Configure which Calendly page to show with NEXT_PUBLIC_CALENDLY_URL
// (see README). Until that is set, a placeholder message is shown instead.

import { useEffect } from "react";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export default function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (!url) return;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, [url]);

  if (!url) {
    return (
      <div className="rounded-lg border border-dashed border-calm-500 bg-white p-6 text-sm leading-relaxed text-calm-700">
        <p className="mb-2 font-semibold">PLACEHOLDER: Calendly not yet set</p>
        <p>
          No Calendly link has been added yet. To turn this on, set the
          environment variable <code>NEXT_PUBLIC_CALENDLY_URL</code> to your
          Calendly scheduling link. See the README for the exact steps.
        </p>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget rounded-lg border border-calm-200 bg-white"
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
