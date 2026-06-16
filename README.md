# Project 3AM

A calm first step for caregivers planning for the future care of a person with
Autism Spectrum Disorder (ASD). Project 3AM is an educational and signposting
tool. It is not legal advice and it is not a replacement for a lawyer.

## What it is, and what it is not

This is a small, mostly static prototype built with Next.js. It does three
things, and nothing more:

1. **Resource hub.** Plain-language explainers on wills, Lasting Power of
   Attorney (LPA), trusts, CPF nomination, insurance, testamentary guardianship,
   and deputyship. Each topic has a downloadable, blank preparation checklist.
2. **Self-assessment.** A short set of non-sensitive questions that points you
   towards relevant topics and to the booking page.
3. **Clinic booking.** An embedded scheduling page (Cal.com, Calendly, or
   similar) for booking a clinic slot.

### Privacy, by design

These constraints are deliberate. Please keep them.

- **No data is stored.** There is no database, no backend, and no
  server-side storage. No health, medical, financial, will, CPF, insurance, or
  family records are collected anywhere.
- **No accounts and no login.** Nothing persists a person's situation.
- **No document upload** of any kind.
- **The self-assessment holds answers in browser memory only.** It does not use
  `localStorage`, cookies, query strings, or any network request. Close the tab
  and the answers are gone. They are never tied to a name.
- **Booking happens entirely inside the scheduling provider.** This app embeds
  the provider's page and never sees, stores, or forwards what a person types
  into the booking form. The form should be configured to collect only a name,
  one contact method, a preferred slot, and a general topic. There is no
  free-text box describing a person's situation.
- **No personalised legal advice anywhere**, including content pages. The pages
  explain in general terms what each tool is and when it tends to matter.

If you are extending this project and find yourself about to add data storage,
authentication, document upload, or any feature that collects sensitive
information, stop and check whether it belongs here. The whole point is that it
does not.

## Run it locally

You need Node.js 18.18 or newer (Node 20 or 22 recommended).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Where to paste the booking link

There are two ways to set the scheduling link, and either works:

**Easiest: edit one line of code**

Open `src/app/booking/page.tsx` and paste your link into the `BOOKING_URL`
line near the top:

```ts
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/your-name/30min";
```

Save the file. If `npm run dev` is running, the page updates on its own.

**Alternative: an environment variable (handy for Vercel)**

1. Copy `.env.example` to `.env.local`.
2. Set your scheduling link, for example:

   ```
   NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-name/30min
   ```

3. Restart `npm run dev`. On Vercel, add the same variable under Settings, then
   Environment Variables, then redeploy.

The link works with Cal.com, Calendly, or any scheduling page. If a provider
blocks being shown inside another site, the page also shows an "open the
booking page in a new tab" link so booking still works.

### Configuring the booking form fields

The privacy promise depends on how the scheduling event is set up. In your
provider, configure the booking event so it collects only:

- Name
- One contact method (for example, an email address)
- A preferred slot (this is the scheduling itself)
- A single dropdown question for the general topic, with options: will, LPA,
  trust, deputyship, guardianship, not sure

Do **not** add a free-text "tell us about your situation" question.

## How to swap in real content

All topic content lives as MDX files in `content/topics/`. Each file has a
short frontmatter block (`title`, `description`) followed by the explainer.

- Edit the `.mdx` files directly to replace the `PLACEHOLDER` copy with real,
  reviewed content. Keep the tone plain, calm, and general. Do not add advice
  about any one person's situation.
- The list of topics, their one-line summaries, and which checklist each links
  to is defined in `src/lib/topics.ts`. To add or remove a topic, update that
  list and add or remove the matching `content/topics/<slug>.mdx` file.
- Downloadable checklists are PDF files in `public/checklists/`. Do not edit
  the PDFs by hand. Instead, edit the checklist content in
  `scripts/generate-checklists.mjs` and run `npm run checklists` to regenerate
  them. Commit the updated PDFs. The download link on each topic page is wired
  up via the `checklist` field in `src/lib/topics.ts`.
- The blank "Future Caregiver Folder" template is a PDF in `public/templates/`.
  Edit its content in `scripts/generate-folder.mjs` and run `npm run folder` to
  regenerate it. It is a blank template only: do not put anyone's real details
  into it. The download link lives on the resource hub page.
- To rebuild every PDF at once, run `npm run assets`.

Anything still marked `PLACEHOLDER` is intentionally a stand-in and should be
reviewed by a qualified person before going live.

## File tree

```
project-3am/
├── README.md
├── .env.example                 # optional: copy to .env.local for booking link
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── content/
│   └── topics/                  # MDX explainers (swap PLACEHOLDER copy here)
│       ├── wills.mdx
│       ├── lpa.mdx
│       ├── trusts.mdx
│       ├── cpf-nomination.mdx
│       ├── insurance.mdx
│       ├── testamentary-guardianship.mdx
│       └── deputyship.mdx
├── public/
│   └── checklists/              # downloadable blank checklists (PDF)
│       ├── wills-checklist.pdf
│       ├── lpa-checklist.pdf
│       ├── trusts-checklist.pdf
│       ├── cpf-nomination-checklist.pdf
│       ├── insurance-checklist.pdf
│       ├── testamentary-guardianship-checklist.pdf
│       └── deputyship-checklist.pdf
│   └── templates/               # blank Future Caregiver Folder (PDF)
│       └── future-caregiver-folder.pdf
├── scripts/
│   ├── generate-checklists.mjs  # edit checklist text here, run npm run checklists
│   └── generate-folder.mjs      # edit folder template here, run npm run folder
└── src/
    ├── app/
    │   ├── layout.tsx           # shared header, footer, disclaimer
    │   ├── page.tsx             # home
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── resources/
    │   │   ├── page.tsx         # hub index
    │   │   └── [slug]/page.tsx  # renders one MDX topic
    │   ├── triage/
    │   │   └── page.tsx         # hosts the client-side wizard
    │   └── booking/
    │       └── page.tsx         # booking embed (set BOOKING_URL here)
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── Disclaimer.tsx
    │   ├── TopicCard.tsx
    │   └── TriageWizard.tsx     # client only; answers live in memory
    └── lib/
        ├── topics.ts            # topic list and metadata
        └── triage.ts            # pure routing logic, stores nothing
```

## Deploying to Vercel

Push the repository to GitHub and import it into Vercel. The default Next.js
build settings work as is. Make sure your booking link is set, either in the
`BOOKING_URL` line of `src/app/booking/page.tsx` or via the
`NEXT_PUBLIC_BOOKING_URL` environment variable in the Vercel project.
