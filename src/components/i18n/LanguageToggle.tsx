"use client";

import { locales, localeNames } from "@/lib/i18n/config";
import { useI18n } from "./LocaleProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("common.langLabel")}
      className="flex items-center gap-1"
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code === "zh" ? "zh-Hans" : "en"}
            className={`rounded-md px-2 py-1 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600 ${
              active
                ? "bg-calm-600 text-white"
                : "text-calm-700 hover:bg-calm-100"
            }`}
          >
            {localeNames[code]}
          </button>
        );
      })}
    </div>
  );
}
