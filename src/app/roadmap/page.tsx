import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { roadmapSteps } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Step-by-step planning roadmap | Project 3AM",
  description:
    "A general order of things caregivers tend to consider when planning for the future. General information only, not legal advice.",
};

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">
          Step-by-step planning roadmap
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Planning can feel like a lot at once. This is a general order of the
          things caregivers tend to consider. Each step links to the topics that
          explain it in plain language, so you can read at your own pace and in
          whatever order suits you.
        </p>
        <Disclaimer className="max-w-2xl" />
        <p className="max-w-2xl rounded-md border border-calm-200 bg-calm-100 px-4 py-3 text-sm leading-relaxed text-calm-700">
          PLACEHOLDER: this sequence is a general starting map. A qualified
          person should confirm the order and adjust it for your situation.
        </p>
      </header>

      <ol className="space-y-5">
        {roadmapSteps.map((step, index) => (
          <li
            key={step.title}
            className="max-w-2xl rounded-lg border border-calm-200 bg-white p-5"
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-calm-600 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-calm-700">
                  <span className="sr-only">{`Step ${index + 1}: `}</span>
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink">{step.body}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {step.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block rounded-md border border-calm-200 px-3 py-1 text-sm font-medium text-calm-700 underline-offset-2 hover:border-calm-500 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-calm-700">
          Future Caregiver Folder, a blank template
        </h2>
        <p className="text-sm leading-relaxed">
          A blank planning template to gather your thoughts across the bigger
          picture: hopes for the future, health, housing, meaningful engagement
          and money. You fill it in privately, at your own pace, and the person
          being cared for can take part wherever possible. It asks for no
          personal details here and nothing is sent anywhere.
        </p>
        <a
          href="/templates/future-caregiver-folder.pdf"
          download
          className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
        >
          Download the blank folder template (PDF)
        </a>
      </section>
    </div>
  );
}
