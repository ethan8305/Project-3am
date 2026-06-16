// Talks and knowledge-sharing sessions.
//
// These are PLACEHOLDER entries. Replace them with real sessions, dates and
// details. Do not collect attendee information on this page: sign-up is routed
// through the existing scheduling embed on the booking page.

export type Talk = {
  title: string;
  // Free text, for example "PLACEHOLDER: date to be confirmed".
  when: string;
  speaker: string;
  description: string;
};

export const talks: Talk[] = [
  {
    title: "PLACEHOLDER: An introduction to future-care planning",
    when: "PLACEHOLDER: date to be confirmed",
    speaker: "PLACEHOLDER: speaker or partner organisation",
    description:
      "A gentle overview of the first questions in planning for the future, and the tools that often come up.",
  },
  {
    title: "PLACEHOLDER: Wills, LPA and trusts explained",
    when: "PLACEHOLDER: date to be confirmed",
    speaker: "PLACEHOLDER: lawyer or trained volunteer",
    description:
      "A plain-language walk through three common tools, with time for general questions.",
  },
  {
    title: "PLACEHOLDER: Planning for guardianship and deputyship",
    when: "PLACEHOLDER: date to be confirmed",
    speaker: "PLACEHOLDER: speaker to be confirmed",
    description:
      "What these routes are, when they tend to matter, and where to get further help.",
  },
];
