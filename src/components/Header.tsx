"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/LocaleProvider";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import type { MessageKey } from "@/lib/i18n/messages";

const navLinks: { href: string; key: MessageKey }[] = [
  { href: "/resources", key: "nav.resources" },
  { href: "/playbook", key: "nav.playbook" },
  { href: "/roadmap", key: "nav.roadmap" },
  { href: "/talks", key: "nav.talks" },
  { href: "/referrals", key: "nav.referrals" },
  { href: "/faq", key: "nav.faq" },
  { href: "/feedback", key: "nav.feedback" },
  { href: "/booking", key: "nav.booking" },
];

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <header className="border-b border-calm-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex-none text-lg font-semibold text-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
        >
          {t("brand")}
        </Link>
        <nav
          aria-label={t("nav.label")}
          className="min-w-0 flex-1 overflow-x-auto"
        >
          <ul className="flex flex-nowrap items-center gap-x-4 gap-y-0 whitespace-nowrap text-sm">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600 ${
                      active
                        ? "font-semibold text-calm-700 underline"
                        : "text-ink"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex-none">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
