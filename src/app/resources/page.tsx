import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import TopicCard from "@/components/TopicCard";
import { topics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Resource hub | Project 3AM",
  description:
    "Plain-language explainers on common future-planning tools. General information, not legal advice.",
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Resource hub</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Each topic below is a short, plain-language explainer: what the tool
          is, and when it tends to matter. There is no right order to read them
          in. Start wherever feels useful.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <TopicCard topic={topic} />
          </li>
        ))}
      </ul>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-calm-700">
          Future Caregiver Folder, a blank template
        </h2>
        <p className="text-sm leading-relaxed">
          A blank planning template to help you gather your thoughts across the
          bigger picture: hopes for the future, health, housing, meaningful
          engagement and money. You fill it in privately, at your own pace, and
          the person being cared for can take part wherever possible. It asks
          for no personal details here and nothing is sent anywhere.
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
