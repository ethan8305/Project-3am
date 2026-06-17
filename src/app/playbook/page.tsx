import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { playbookSections } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "Planning playbook | Project 3AM",
  description:
    "Bite-sized sections on the wider parts of planning: a flourishing life, health, housing, meaningful engagement and money.",
};

export default function PlaybookPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Planning playbook</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          The legal tools are only one part of planning. These sections look at
          the wider picture of a person&apos;s life. They pair with the blank Future
          Caregiver Folder, which you can fill in privately.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {playbookSections.map((section) => (
          <li key={section.slug}>
            <Link
              href={`/playbook/${section.slug}`}
              className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 transition hover:border-calm-500 hover:shadow-sm"
            >
              <span className="mb-2 text-lg font-semibold text-calm-700">
                {section.title}
              </span>
              <span className="text-sm leading-relaxed text-ink">
                {section.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-calm-700">
          The blank folder template
        </h2>
        <p className="text-sm leading-relaxed">
          These sections follow the same shape as the blank Future Caregiver
          Folder. Download it to gather your thoughts in one place. It asks for
          no personal details here and nothing is sent anywhere.
        </p>
        <a
          href="/templates/future-caregiver-folder.pdf"
          download
          className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700"
        >
          Download the blank folder template (PDF)
        </a>
      </section>
    </div>
  );
}
