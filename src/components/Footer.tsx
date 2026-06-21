"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-calm-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-calm-700">
        <p className="mb-2 font-semibold">{t("footer.title")}</p>
        <p className="mb-2">{t("footer.body1")}</p>
        <p>{t("footer.body2")}</p>
      </div>
    </footer>
  );
}
