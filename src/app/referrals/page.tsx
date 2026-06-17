import type { Metadata } from "next";
import { referralCategories } from "@/lib/referrals";

export const metadata: Metadata = {
  title: "Where to go next | Project 3AM",
  description:
    "A signposting list of organisations and services for further help. Not an endorsement.",
};

export default function ReferralsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Where to go next</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          After reading here, or after a clinic, you may want to speak to other
          organisations. This is a starting list to point you in the right
          direction. Listing a group here is signposting, not a recommendation,
          and you do not need to share any details to use it.
        </p>
        <p className="max-w-2xl rounded-md border border-calm-200 bg-calm-100 px-4 py-3 text-sm leading-relaxed text-calm-700">
          PLACEHOLDER: these entries are examples. Replace them with real,
          checked organisations before this page goes live.
        </p>
      </header>

      <div className="space-y-8">
        {referralCategories.map((category) => (
          <section key={category.heading} className="space-y-3">
            <h2 className="text-xl font-semibold text-calm-700">
              {category.heading}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-calm-700">
              {category.blurb}
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5"
                >
                  <span className="mb-1 font-semibold text-calm-700">
                    {item.name}
                  </span>
                  <span className="mb-2 text-sm leading-relaxed text-ink">
                    {item.description}
                  </span>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-sm font-semibold text-calm-600 underline underline-offset-2"
                    >
                      Visit website
                    </a>
                  ) : (
                    <span className="mt-auto text-xs text-calm-500">
                      Link to be added
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
