// Referral directory data.
//
// These are PLACEHOLDER entries. Replace them with real, vetted organisations
// before going live, and check that each link and description is accurate and
// current. Listing an organisation here is signposting, not an endorsement.
// Do not collect any user information on the referral page.

export type Referral = {
  name: string;
  description: string;
  url: string | null;
};

export type ReferralCategory = {
  heading: string;
  blurb: string;
  items: Referral[];
};

export const referralCategories: ReferralCategory[] = [
  {
    heading: "Autism and disability support",
    blurb:
      "Organisations that support persons with Autism Spectrum Disorder and their families.",
    items: [
      {
        name: "PLACEHOLDER: Local autism support organisation",
        description:
          "Add the name, a one-line description of what they do, and a link.",
        url: null,
      },
      {
        name: "PLACEHOLDER: Caregiver support group",
        description:
          "Add a group that offers peer support and information for caregivers.",
        url: null,
      },
    ],
  },
  {
    heading: "Legal help and advice",
    blurb:
      "Places to get proper legal advice that is specific to your situation.",
    items: [
      {
        name: "PLACEHOLDER: Pro bono or community legal service",
        description:
          "Add a service that offers free or low-cost legal help, with eligibility notes.",
        url: null,
      },
      {
        name: "PLACEHOLDER: Law society referral service",
        description:
          "Add a way to find a qualified lawyer for wills, trusts, LPA and similar.",
        url: null,
      },
    ],
  },
  {
    heading: "Financial and government schemes",
    blurb:
      "Official information on schemes that can support future care planning.",
    items: [
      {
        name: "PLACEHOLDER: Official government scheme portal",
        description:
          "Add a link to current, official information on relevant schemes.",
        url: null,
      },
      {
        name: "PLACEHOLDER: Special needs trust provider",
        description:
          "Add an organisation that helps families set up and manage care funds.",
        url: null,
      },
    ],
  },
];
