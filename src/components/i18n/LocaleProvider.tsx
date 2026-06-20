"use client";

// Holds the current language in browser memory only (React state). It does NOT
// use localStorage, cookies, or any network call, in keeping with the project's
// privacy rules. The choice resets to English on a full page reload.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { messages, type MessageKey } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en-GB";
  }, [locale]);

  const t = useCallback(
    (key: MessageKey) => {
      const value = messages[locale]?.[key];
      if (value) return value;
      return messages[defaultLocale][key] ?? key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LocaleProvider");
  }
  return ctx;
}
