// Playbook sections: the wider life-planning topics, distinct from the legal
// tools in the resource hub. Each `slug` matches content/playbook/<slug>.mdx.

export type PlaybookSection = {
  slug: string;
  title: string;
  summary: string;
};

export const playbookSections: PlaybookSection[] = [
  {
    slug: "flourishing-life",
    title: "Towards a Flourishing Life",
    summary:
      "Start with the person and the life they want: their hopes, preferences and what a good day looks like.",
  },
  {
    slug: "health",
    title: "Health Matters",
    summary:
      "Keeping track of health needs, the people who help, and who to call in an emergency.",
  },
  {
    slug: "housing",
    title: "Housing Matters",
    summary:
      "Where and how the person might live, and the level of day-to-day support that would suit them.",
  },
  {
    slug: "meaningful-engagement",
    title: "Meaningful Engagement",
    summary:
      "Work, learning, hobbies and community: the things that make daily life full and connected.",
  },
  {
    slug: "money",
    title: "Money Matters",
    summary:
      "The general idea of setting money aside and making sure it reaches the person safely.",
  },
];

export function getPlaybookSection(slug: string): PlaybookSection | undefined {
  return playbookSections.find((s) => s.slug === slug);
}

export function getAllPlaybookSlugs(): string[] {
  return playbookSections.map((s) => s.slug);
}
