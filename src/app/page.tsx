import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

const cards = [
  {
    href: "/triage",
    title: "Where do I start?",
    body: "Answer a few short questions and we will point you to the topics that tend to be relevant. Nothing you enter is saved.",
  },
  {
    href: "/resources",
    title: "Resource hub",
    body: "Plain-language explainers on wills, LPA, trusts, CPF nomination, insurance, guardianship and deputyship.",
  },
  {
    href: "/booking",
    title: "Book a clinic",
    body: "Ready to talk to someone? Book a free clinic slot. You only share a name, one way to reach you, and a topic.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-calm-500">
          Project 3AM
        </p>
        <h1 className="text-3xl font-bold text-calm-700 sm:text-4xl">
          A calmer first step in planning for the future
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Planning for the future care of a person with Autism Spectrum Disorder
          can feel overwhelming, especially in the quiet hours. This site breaks
          the first questions into small, plain-language pieces. You can read at
          your own pace, and the person being cared for can be part of the
          conversation wherever that is possible.
        </p>
        <Disclaimer className="max-w-2xl" />
      </section>

      <section>
        <ul className="grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 transition hover:border-calm-500 hover:shadow-sm"
              >
                <span className="mb-2 text-lg font-semibold text-calm-700">
                  {card.title}
                </span>
                <span className="text-sm leading-relaxed text-ink">
                  {card.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-calm-700">Explore more</h2>
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            { href: "/roadmap", label: "Step-by-step roadmap" },
            { href: "/playbook", label: "Planning playbook" },
            { href: "/talks", label: "Talks and sessions" },
            { href: "/referrals", label: "Where to go next" },
            { href: "/faq", label: "Common questions" },
            { href: "/feedback", label: "Give feedback" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-md border border-calm-200 bg-white px-4 py-2 font-medium text-calm-700 hover:border-calm-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-calm-700">
          What this site does not do
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>It does not store any of your information.</li>
          <li>It does not ask for health, financial or family records.</li>
          <li>It does not give advice about your own situation.</li>
          <li>It does not replace speaking with a qualified professional.</li>
        </ul>
      </section>
    </div>
  );
}
