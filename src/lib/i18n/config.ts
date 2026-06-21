// Internationalisation config.
//
// English is the default and is always complete. Mandarin (zh) strings live in
// messages.ts as empty placeholders for a translator to fill. The legal content
// in the MDX pages is deliberately NOT auto-translated: it must be translated
// by a qualified person.

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Shown on the language toggle. These are language names, not UI copy.
export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};
