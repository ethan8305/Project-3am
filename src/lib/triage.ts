// Pure routing logic for the self-assessment.
//
// This file holds NO state. It takes the answers a person made in the browser
// and returns a list of resource pages that are generally relevant. It does not
// give legal advice and it does not store anything.

import { topics, type Topic } from "@/lib/topics";

export type AgeGroup = "under-21" | "21-or-over";

// Tool options the caregiver can say they are looking at.
export const toolOptions = [
  { id: "will", label: "Will" },
  { id: "lpa", label: "Lasting Power of Attorney (LPA)" },
  { id: "trust", label: "Trust" },
  { id: "cpf", label: "CPF nomination" },
  { id: "insurance", label: "Insurance" },
  { id: "guardianship", label: "Guardianship" },
  { id: "deputyship", label: "Deputyship" },
  { id: "not-sure", label: "I am not sure yet" },
] as const;

export type ToolId = (typeof toolOptions)[number]["id"];

export const supportOptions = [
  { id: "understand", label: "I want to understand the options" },
  { id: "prepare", label: "I want help getting documents in order" },
  { id: "talk", label: "I would like to talk to someone" },
] as const;

export type SupportId = (typeof supportOptions)[number]["id"];

export type TriageAnswers = {
  age: AgeGroup | null;
  tools: ToolId[];
  support: SupportId | null;
};

// Maps a selected tool to the resource hub slugs that explain it.
const toolToSlugs: Record<ToolId, string[]> = {
  will: ["wills"],
  lpa: ["lpa"],
  trust: ["trusts"],
  cpf: ["cpf-nomination"],
  insurance: ["insurance"],
  guardianship: ["testamentary-guardianship", "deputyship"],
  deputyship: ["deputyship"],
  "not-sure": [],
};

export type TriageResult = {
  topics: Topic[];
  // A short, general note shown alongside the results. Not legal advice.
  note: string;
  // Whether to nudge the person towards booking a clinic slot.
  suggestBooking: boolean;
};

export function buildResult(answers: TriageAnswers): TriageResult {
  const slugSet = new Set<string>();

  for (const tool of answers.tools) {
    for (const slug of toolToSlugs[tool]) {
      slugSet.add(slug);
    }
  }

  // Age gives a general steer on which guardianship route tends to come up.
  if (answers.age === "under-21") {
    slugSet.add("testamentary-guardianship");
  }
  if (answers.age === "21-or-over") {
    slugSet.add("deputyship");
    slugSet.add("lpa");
  }

  // If the person was not sure, or picked nothing useful, show the full hub
  // so they can browse at their own pace.
  if (slugSet.size === 0) {
    return {
      topics: topics,
      note: "Here is the full set of topics so you can read at your own pace. There is no right order to start in.",
      suggestBooking: true,
    };
  }

  const matched = topics.filter((t) => slugSet.has(t.slug));

  let note =
    "These topics looked relevant to what you told us. They are general explanations, not advice about your own situation.";
  if (answers.support === "talk") {
    note =
      "You said you would like to talk to someone. You can read these topics first if you wish, then book a free clinic slot.";
  }

  return {
    topics: matched,
    note,
    suggestBooking: true,
  };
}
