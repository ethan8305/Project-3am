import type { Metadata } from "next";
import Link from "next/link";
import { talks } from "@/lib/talks";

export const metadata: Metadata = {
  title: "Talks and sessions | Project 3AM",
  description:
    "Short talks and workshops on common future-planning topics. General information only.",
};

export default function TalksPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Talks and sessions</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Short talks and workshops that explain common future-planning topics
          in plain language. They are a chance to learn at your own pace and ask
          general questions.
        </p>
        <p className="max-w-2xl rounded-md border border-calm-200 bg-calm-100 px-4 py-3 text-sm leading-relaxed text-calm-700">
          PLACEHOLDER: these sessions are examples. Replace them with real
          titles, dates and speakers when they are confirmed.
        </p>
      </header>

      <ul className="space-y-4">
        {talks.map((talk) => (
          <li
            key={talk.title}
            className="max-w-2xl rounded-lg border border-calm-200 bg-white p-5"
          >
            <h2 className="text-lg font-semibold text-calm-700">
              {talk.title}
            </h2>
            <p className="mt-1 text-sm text-calm-500">
              {talk.when} | {talk.speaker}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {talk.description}
            </p>
          </li>
        ))}
      </ul>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-calm-100 p-6 text-sm leading-relaxed text-calm-700">
        <h2 className="text-base font-semibold text-calm-700">
          Want to take part?
        </h2>
        <p>
          You can register your interest through the same booking page used for
          clinics. You only share a name, one way to reach you, and a topic.
        </p>
        <Link
          href="/booking"
          className="inline-block rounded-md bg-calm-600 px-4 py-2 font-semibold text-white hover:bg-calm-700"
        >
          Go to booking
        </Link>
      </section>
    </div>
  );
}
