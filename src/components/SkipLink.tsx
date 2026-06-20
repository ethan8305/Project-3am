"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

// Visually hidden until focused, so keyboard users can jump straight to the
// main content.
export default function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-calm-700 focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-calm-600"
    >
      {t("common.skip")}
    </a>
  );
}
