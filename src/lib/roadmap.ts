// Single source of truth for the planning roadmap.
//
// The roadmap page renders these steps in order, and each topic / section page
// uses findStepForHref to show where it sits in the journey. Keeping one
// definition avoids the roadmap and the individual pages drifting apart.
//
// PLACEHOLDER: a qualified person should confirm this general sequence and
// adjust it for the relevant jurisdiction. It is a starting map, not advice,
// and the right order differs from family to family.

export type RoadmapLink = { href: string; label: string };

export type RoadmapStep = {
  title: string;
  body: string;
  links: RoadmapLink[];
};

export const roadmapSteps: RoadmapStep[] = [
  {
    title: "Start with the person and the life they want",
    body: "Before any document, picture what a good, flourishing life looks like for the person being cared for: their hopes, health, home and the things they enjoy. Involve them wherever that is possible.",
    links: [
      { href: "/playbook/flourishing-life", label: "Towards a flourishing life" },
      { href: "/playbook/health", label: "Health matters" },
      { href: "/playbook/housing", label: "Housing matters" },
      { href: "/playbook/meaningful-engagement", label: "Meaningful engagement" },
    ],
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
    links: [
      { href: "/resources/insurance", label: "Insurance" },
      { href: "/playbook/money", label: "Money matters" },
    ],
  },
  {
    title: "Gather your thoughts and talk to someone",
    body: "Use the blank Future Caregiver Folder to pull it together at your own pace, then book a free clinic slot to talk things through.",
    links: [{ href: "/booking", label: "Book a clinic" }],
  },
];

export const roadmapStepCount = roadmapSteps.length;

// Returns the step a given page belongs to, so the page can show where it sits
// in the journey. Returns null if the page is not part of a step.
export function findStepForHref(
  href: string,
): { number: number; title: string } | null {
  for (let i = 0; i < roadmapSteps.length; i += 1) {
    if (roadmapSteps[i].links.some((link) => link.href === href)) {
      return { number: i + 1, title: roadmapSteps[i].title };
    }
  }
  return null;
}
