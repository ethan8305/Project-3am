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
    </div>
  );
}
