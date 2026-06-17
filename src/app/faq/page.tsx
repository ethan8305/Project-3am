import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Common questions | Project 3AM",
  description:
    "Plain-language answers to common questions. General information only, not legal advice.",
};

export default function FaqPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Common questions</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Short, plain-language answers to questions people often ask. These are
          general explanations, not advice about your own situation.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <dl className="max-w-2xl space-y-4">
        {faqItems.map((item) => (
          <div
            key={item.question}
            className="rounded-lg border border-calm-200 bg-white p-5"
          >
            <dt className="mb-2 font-semibold text-calm-700">
              {item.question}
            </dt>
            <dd className="text-sm leading-relaxed text-ink">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
