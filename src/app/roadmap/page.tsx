import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Step-by-step planning roadmap | Project 3AM",
  description:
    "A general order of things caregivers tend to consider when planning for the future. General information only, not legal advice.",
};

type Step = {
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

// PLACEHOLDER: a qualified person should confirm this general sequence and
// adjust it for the relevant jurisdiction. It is a starting map, not advice,
// and the right order differs from family to family.
const steps: Step[] = [
  {
    title: "Start with the person and the life they want",
    body: "Before any document, picture what a good, flourishing life looks like for the person being cared for. Involve them wherever that is possible.",
    links: [{ href: "/playbook/flourishing-life", label: "Towards a flourishing life" }],
  },
  {
    title: "Note their age: under 21, or 21 and over",
    body: "Age gives a general steer on which routes tend to come up. For a child under 21, naming a guardian in a will is often considered. For an adult, the question shifts to who can make decisions.",
    links: [
      { href: "/resources/testamentary-guardianship", label: "Testamentary guardianship" },
    ],
  },
  {
    title: "Consider who makes decisions",
    body: "If the person can understand and make the decision themselves, a Lasting Power of Attorney lets them choose who would act for them. If an adult cannot make certain decisions and no LPA is in place, deputyship is the route through the court.",
    links: [
      { href: "/resources/lpa", label: "Lasting Power of Attorney (LPA)" },
      { href: "/resources/deputyship", label: "Deputyship" },
    ],
  },
  {
    title: "Put a will and CPF nomination in place",
    body: "A will sets out who carries out your wishes and how things are shared. A CPF nomination separately says who receives your CPF savings. People often look at these together.",
    links: [
      { href: "/resources/wills", label: "Wills" },
      { href: "/resources/cpf-nomination", label: "CPF nomination" },
    ],
  },
  {
    title: "Consider whether a trust would help",
    body: "A trust can manage money steadily over time for the person's benefit. The Special Needs Trust Company (SNTC) offers a lower-cost option that many families look at.",
    links: [
      { href: "/resources/trusts", label: "Trusts" },
      { href: "/resources/sntc-trust", label: "SNTC special needs trust" },
    ],
  },
  {
    title: "Think about how care will be funded",
    body: "Insurance can be one source of money to support ongoing care. It usually sits alongside a will or trust so the money is received and managed as you intend.",
    links: [{ href: "/resources/insurance", label: "Insurance" }],
  },
  {
    title: "Gather your thoughts and talk to someone",
    body: "Use the blank Future Caregiver Folder to pull it together at your own pace, then book a free clinic slot to talk things through.",
    links: [
      { href: "/playbook", label: "Planning playbook" },
      { href: "/booking", label: "Book a clinic" },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">
          Step-by-step planning roadmap
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Planning can feel like a lot at once. This is a general order of the
          things caregivers tend to consider, with a link to the relevant topic
          at each step. There is no single right path, and you can move through
          it in whatever order suits you.
        </p>
        <Disclaimer className="max-w-2xl" />
        <p className="max-w-2xl rounded-md border border-calm-200 bg-calm-100 px-4 py-3 text-sm leading-relaxed text-calm-700">
          PLACEHOLDER: this sequence is a general starting map. A qualified
          person should confirm the order and adjust it for your situation.
        </p>
      </header>

      <ol className="space-y-5">
        {steps.map((step, index) => (
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
    </div>
  );
}
