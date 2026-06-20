// UI string dictionaries.
//
// `en` is the source of truth and must stay complete. For `zh`, fill each empty
// string with the Mandarin translation. Any entry left empty falls back to the
// English text at runtime, so the app stays usable while translation is in
// progress. Do NOT machine-translate the legal content in content/*.

import type { Locale } from "./config";

export type MessageKey =
  | "brand"
  | "nav.label"
  | "nav.resources"
  | "nav.playbook"
  | "nav.roadmap"
  | "nav.triage"
  | "nav.talks"
  | "nav.referrals"
  | "nav.faq"
  | "nav.feedback"
  | "nav.booking"
  | "footer.title"
  | "footer.body1"
  | "footer.body2"
  | "common.skip"
  | "common.langLabel"
  | "common.langPending";

const en: Record<MessageKey, string> = {
  brand: "Project 3AM",
  "nav.label": "Main",
  "nav.resources": "Resource hub",
  "nav.playbook": "Playbook",
  "nav.roadmap": "Roadmap",
  "nav.triage": "Where do I start?",
  "nav.talks": "Talks",
  "nav.referrals": "Where to go next",
  "nav.faq": "FAQ",
  "nav.feedback": "Feedback",
  "nav.booking": "Book a clinic",
  "footer.title": "Project 3AM",
  "footer.body1":
    "This site is an educational and signposting tool. It explains what some common planning tools are and when they tend to matter. It is not legal advice and it is not a replacement for a lawyer.",
  "footer.body2":
    "Everything you read here is general information. Please speak to a qualified professional about your own situation.",
  "common.skip": "Skip to main content",
  "common.langLabel": "Language",
  "common.langPending":
    "PLACEHOLDER: the Mandarin (中文) translation is in progress. Showing English for now.",
};

// PLACEHOLDER: fill each value with the Mandarin translation. Leave empty to
// fall back to English.
const zh: Record<MessageKey, string> = {
  brand: "",
  "nav.label": "",
  "nav.resources": "",
  "nav.playbook": "",
  "nav.roadmap": "",
  "nav.triage": "",
  "nav.talks": "",
  "nav.referrals": "",
  "nav.faq": "",
  "nav.feedback": "",
  "nav.booking": "",
  "footer.title": "",
  "footer.body1": "",
  "footer.body2": "",
  "common.skip": "",
  "common.langLabel": "",
  "common.langPending": "",
};

export const messages: Record<Locale, Record<MessageKey, string>> = { en, zh };
