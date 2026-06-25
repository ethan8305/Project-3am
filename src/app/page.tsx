import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import OpenAssistantButton from "@/components/chat/OpenAssistantButton";

const moreLinks = [
  {
    href: "/talks",
    label: "Talks and sessions",
    body: "Short talks that explain common planning topics in plain language.",
  },
  {
    href: "/referrals",
    label: "Where to go next",
    body: "Other organisations and where to turn for further help.",
  },
  {
    href: "/faq",
    label: "Common questions",
    body: "Plain answers to questions people often ask.",
  },
  {
    href: "/feedback",
    label: "Give feedback",
    body: "Tell us anonymously how to make this more useful.",
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-calm-700">
          Two ways to begin
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <OpenAssistantButton
              title="Not sure where to begin? Ask the assistant"
              body="Answer a few short questions and the assistant points you to the topics that tend to be relevant. It also stays within reach at the bottom of every page. Nothing you tap is saved."
            />
          </li>
          <li>
            <Link
              href="/roadmap"
              className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 transition hover:border-calm-500 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
            >
              <span className="mb-2 text-lg font-semibold text-calm-700">
                Prefer the whole picture? Follow the roadmap
              </span>
              <span className="text-sm leading-relaxed text-ink">
                A general order of the steps caregivers tend to take, each
                linking to a plain-language explainer on wills, LPA, trusts, CPF,
                insurance, guardianship, deputyship and more.
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="max-w-2xl space-y-3 rounded-lg border border-calm-200 bg-calm-100 p-6">
        <h2 className="text-xl font-semibold text-calm-700">
          When you are ready, talk to someone
        </h2>
        <p className="text-sm leading-relaxed text-calm-700">
          A free clinic slot is a chance to talk things through with a
          volunteer. You share only a name, one way to reach you, and a general
          topic.
        </p>
        <Link
          href="/booking"
          className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
        >
          Book a clinic
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-calm-700">More on this site</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {moreLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 transition hover:border-calm-500 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
              >
                <span className="mb-1 font-semibold text-calm-700">
                  {link.label}
                </span>
                <span className="text-sm leading-relaxed text-ink">
                  {link.body}
                </span>
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
