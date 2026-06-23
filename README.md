# Project 3AM

A calm first step for caregivers planning for the future care of a person with
Autism Spectrum Disorder (ASD). Project 3AM is an educational and signposting
tool. It is not legal advice and it is not a replacement for a lawyer.

## What it is, and what it is not

This is a small, static prototype built with Next.js (App Router) and React. It
is an installable web app: caregivers can Add to Home Screen on a phone, tablet
or computer and open it full screen, without any app store. The features are:

1. **Resource hub.** Plain-language explainers on wills, Lasting Power of
   Attorney (LPA), trusts, CPF nomination, insurance, testamentary guardianship,
   deputyship, and the SNTC special needs trust. Each topic has a downloadable,
   blank preparation checklist (PDF).
2. **Where do I start? assistant.** A floating, scripted mini chatbot at the
   bottom right of every page. It asks a few non-sensitive questions and points
   you towards relevant topics and the booking page. It is not an AI: it only
   shows scripted content, holds answers in browser memory, and stores nothing.
   A full-page version of the same questions also remains at `/triage`.
3. **Clinic booking.** An embedded scheduling page (Cal.com, Calendly, or
   similar) for booking a clinic slot.
4. **Step-by-step roadmap.** A general order of the things caregivers tend to
   consider, each step linking to the relevant topic.
5. **Planning playbook.** Bite-sized sections on the wider parts of planning (a
   flourishing life, health, housing, meaningful engagement, money), plus a
   downloadable blank "Future Caregiver Folder" template (PDF).
6. **Talks and sessions.** A static listing of talks and workshops, with sign-up
   routed through the booking page.
7. **Where to go next.** A signposting referral directory of organisations.
8. **Common questions.** A general FAQ (plain explanations only, no advice, no
   chatbot).
9. **Anonymous feedback.** An embedded third-party form for a few ratings and an
   optional comment. The app itself stores nothing.

Every page is static and prerendered. There is a language toggle (English, with
Mandarin scaffolded for a translator) and basic offline support. Nothing here
collects or stores user data, and there is no backend beyond what Vercel serves
statically.

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
- **The language toggle holds your choice in browser memory only.** It does not
  use `localStorage`, cookies, or any network call, and resets to English on a
  full reload.
- **Offline support caches public content only.** The service worker stores
  copies of public, static pages and assets on the device so the app keeps
  working without a connection. It stores no personal data and sends nothing
  anywhere.

If you are extending this project and find yourself about to add data storage,
authentication, document upload, or any feature that collects sensitive
information, stop and check whether it belongs here. The whole point is that it
does not.

## Run it locally

You need Node.js 20 or 22. (Node 18 is no longer supported by Next.js 16.)

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # lint
npm run checklists   # regenerate the checklist PDFs
npm run folder       # regenerate the Future Caregiver Folder PDF
npm run icons        # regenerate the app icons
npm run assets       # regenerate all of the above
```

Note: offline support is only active in a production build (`npm run build`
then `npm run start`), not in `npm run dev`.

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

## Anonymous feedback form

The feedback page embeds a third-party form so the app stores nothing. Set the
link the same way as the booking link: either edit the `FEEDBACK_URL` line in
`src/app/feedback/page.tsx`, or set `NEXT_PUBLIC_FEEDBACK_URL`. Use a form tool
such as Google Forms, Tally or Microsoft Forms, and configure it to ask only a
few rating questions and one optional general comment. Do **not** add a name
field, a contact field, or any box asking about the person being cared for.

## Installable web app (PWA)

The app ships a web manifest (`public/manifest.webmanifest`), icons
(`public/icons/`), a theme colour, and a service worker (`public/sw.js`) for
basic offline support. On a phone or computer, the browser will offer Add to
Home Screen or Install, after which it opens full screen like an app. No native
code and no app store are involved.

To change the icons, edit `scripts/generate-icons.mjs` and run `npm run icons`.

## Languages

There is a language toggle in the header, on the right of the tab row (English
and Mandarin). English is
the default and complete. The Mandarin strings live in
`src/lib/i18n/messages.ts` as empty placeholders: fill each one in to translate
the interface. Any value left empty falls back to English, so the app stays
usable while translation is in progress.

The legal content in `content/` is deliberately **not** machine-translated. It
should be translated by a qualified person and added as separate content.

## Accessibility

The app aims to be usable by persons with ASD and older caregivers: semantic
landmarks, a skip-to-content link, keyboard navigation with visible focus
states, ARIA labelling and focus management on the self-assessment, text that
scales with the browser, and a reduced-motion preference. Please keep these in
mind when adding to it.

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
├── .env.example                 # optional env vars (booking and feedback links)
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs            # flat ESLint config (ESLint 9)
├── content/
│   ├── topics/                  # legal-tool MDX explainers
│   │   ├── wills.mdx
│   │   ├── lpa.mdx
│   │   ├── trusts.mdx
│   │   ├── cpf-nomination.mdx
│   │   ├── insurance.mdx
│   │   ├── testamentary-guardianship.mdx
│   │   ├── deputyship.mdx
│   │   └── sntc-trust.mdx
│   └── playbook/                # wider life-planning MDX sections
│       ├── flourishing-life.mdx
│       ├── health.mdx
│       ├── housing.mdx
│       ├── meaningful-engagement.mdx
│       └── money.mdx
├── public/
│   ├── manifest.webmanifest     # PWA manifest
│   ├── sw.js                    # service worker (offline support)
│   ├── icons/                   # PWA app icons (generated)
│   ├── checklists/              # downloadable blank checklists (PDF, generated)
│   └── templates/               # blank Future Caregiver Folder (PDF, generated)
├── scripts/
│   ├── generate-checklists.mjs  # checklist PDFs (npm run checklists)
│   ├── generate-folder.mjs      # folder template PDF (npm run folder)
│   └── generate-icons.mjs       # app icons (npm run icons)
└── src/
    ├── app/
    │   ├── layout.tsx           # chrome, i18n provider, PWA metadata, a11y
    │   ├── page.tsx             # home
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── offline/page.tsx     # offline fallback
    │   ├── resources/[slug]/    # renders one topic MDX
    │   ├── playbook/[slug]/     # renders one playbook MDX
    │   ├── roadmap/page.tsx     # step-by-step planning roadmap
    │   ├── triage/page.tsx      # full-page self-assessment (unlinked fallback)
    │   ├── talks/page.tsx
    │   ├── referrals/page.tsx
    │   ├── faq/page.tsx
    │   ├── feedback/page.tsx    # feedback embed (set FEEDBACK_URL here)
    │   └── booking/page.tsx     # booking embed (set BOOKING_URL here)
    ├── components/
    │   ├── Header.tsx           # client; one-row nav + language toggle
    │   ├── Footer.tsx           # client; translated
    │   ├── SkipLink.tsx
    │   ├── ServiceWorkerRegister.tsx
    │   ├── Disclaimer.tsx
    │   ├── TopicCard.tsx
    │   ├── TriageWizard.tsx     # full-page wizard; answers live in memory
    │   ├── chat/                # the floating "Where do I start?" assistant
    │   │   ├── ChatProvider.tsx
    │   │   ├── ChatAssistant.tsx   # scripted, no AI, stores nothing
    │   │   └── OpenAssistantButton.tsx
    │   └── i18n/
    │       ├── LocaleProvider.tsx
    │       ├── LanguageToggle.tsx
    │       └── LocaleNotice.tsx
    └── lib/
        ├── topics.ts
        ├── playbook.ts
        ├── triage.ts            # pure routing logic, stores nothing
        ├── referrals.ts
        ├── faq.ts
        ├── talks.ts
        └── i18n/
            ├── config.ts        # locales and defaults
            └── messages.ts      # UI strings (fill in Mandarin here)
```

## Deploying to Vercel

Push the repository to GitHub and import it into Vercel. The default Next.js
build settings work as is. Set your booking link (and optionally a feedback
form link) either in code or as `NEXT_PUBLIC_BOOKING_URL` and
`NEXT_PUBLIC_FEEDBACK_URL` environment variables in the Vercel project.
