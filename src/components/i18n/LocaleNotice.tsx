"use client";

import { useI18n } from "./LocaleProvider";

// Shown only while a non-English language is selected and its translation is
// still pending. Honest about the scaffolding: the UI falls back to English.
export default function LocaleNotice() {
  const { locale, t } = useI18n();
  if (locale === "en") return null;
  return (
    <p
      role="status"
      className="bg-calm-100 px-4 py-2 text-center text-xs text-calm-700"
    >
      {t("common.langPending")}
    </p>
  );
}
