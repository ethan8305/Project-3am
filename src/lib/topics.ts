// Central list of resource hub topics.
// The `slug` must match the MDX file name in content/topics/<slug>.mdx.
// `checklist` points to a downloadable file in /public/checklists, or is null
// where no checklist exists yet.

export type Topic = {
  slug: string;
  title: string;
  // One line shown on the hub index and topic cards.
  summary: string;
  // Optional downloadable checklist path (served statically from /public).
  checklist: string | null;
};

export const topics: Topic[] = [
  {
    slug: "wills",
    title: "Wills",
    summary:
      "A will sets out who looks after your affairs and how things are shared after you die.",
    checklist: "/checklists/wills-checklist.pdf",
  },
  {
    slug: "lpa",
    title: "Lasting Power of Attorney (LPA)",
    summary:
      "An LPA lets a person choose who can make decisions for them if they lose the ability to decide for themselves.",
    checklist: "/checklists/lpa-checklist.pdf",
  },
  {
    slug: "trusts",
    title: "Trusts",
    summary:
      "A trust is a way of setting money or property aside, managed by trusted people for someone's benefit.",
    checklist: "/checklists/trusts-checklist.pdf",
  },
  {
    slug: "cpf-nomination",
    title: "CPF Nomination",
    summary:
      "A CPF nomination says who should receive your CPF savings after you die.",
    checklist: "/checklists/cpf-nomination-checklist.pdf",
  },
  {
    slug: "insurance",
    title: "Insurance",
    summary:
      "Insurance can provide money to support ongoing care. This explains the general idea, not which policy to buy.",
    checklist: "/checklists/insurance-checklist.pdf",
  },
  {
    slug: "testamentary-guardianship",
    title: "Testamentary Guardianship",
    summary:
      "A way for a parent to name a guardian for a child under 21 in their will.",
    checklist: "/checklists/testamentary-guardianship-checklist.pdf",
  },
  {
    slug: "deputyship",
    title: "Deputyship",
    summary:
      "A court process for appointing someone to make decisions for an adult who cannot make certain decisions themselves.",
    checklist: "/checklists/deputyship-checklist.pdf",
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return topics.map((t) => t.slug);
}
