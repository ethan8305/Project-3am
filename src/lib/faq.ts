// FAQ content.
//
// General explanations only. Do NOT add anything that advises a specific person
// on what they should do in their situation. Keep answers plain and calm. Mark
// anything you are unsure of as PLACEHOLDER for review.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Is this legal advice?",
    answer:
      "No. Project 3AM explains what some common planning tools are and when they tend to matter, in general terms. It cannot tell you what to do in your own situation. For that, please speak to a qualified professional.",
  },
  {
    question: "Do you store any of my information?",
    answer:
      "No. There is no account, no login, and no database. The self-assessment keeps your answers in your browser only and forgets them when you close the tab. We do not collect health, financial or family records, and there is no document upload.",
  },
  {
    question: "What is the difference between an LPA and deputyship?",
    answer:
      "In general terms, a Lasting Power of Attorney is set up by a person while they are still able to make the decision, choosing who can act for them later. Deputyship is a court process used when a person is already unable to make certain decisions and no LPA is in place. The resource hub explains both.",
  },
  {
    question: "What is a trust, in simple terms?",
    answer:
      "A trust is an arrangement where trusted people, called trustees, look after money or property for someone's benefit, following the instructions the trust sets out. It is one way to provide steady, managed support over time.",
  },
  {
    question: "Who can attend a legal clinic?",
    answer:
      "PLACEHOLDER: describe who the clinics are for and any eligibility, once confirmed. The clinic is a chance to talk through general planning questions with a volunteer.",
  },
  {
    question: "What should I prepare before a clinic?",
    answer:
      "It can help to gather your thoughts using the preparation checklists or the blank Future Caregiver Folder. Please do not bring sensitive documents to share through this app. You can discuss the detail in person at the clinic.",
  },
  {
    question: "Can the person being cared for take part?",
    answer:
      "Yes, wherever that is possible. Planning is about their life, and their views matter. Many people can take part in decisions about their own future with the right support and clear information.",
  },
];
