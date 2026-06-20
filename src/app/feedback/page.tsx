import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Give feedback | Project 3AM",
  description:
    "Share anonymous feedback through an embedded form. The app itself stores nothing.",
};

// ---------------------------------------------------------------------------
// YOUR FEEDBACK FORM LINK GOES HERE.
//
// Paste the embed/share link of a third-party form (for example Google Forms,
// Tally, or Microsoft Forms) between the quotation marks below. The form should
// ask only a few rating questions and one optional general comment. Do NOT add
// a name field, a contact field, or any box asking about the person being
// cared for. The app itself stores nothing: the form provider handles
// everything.
//
// On Vercel you can instead set NEXT_PUBLIC_FEEDBACK_URL, which overrides this.
// ---------------------------------------------------------------------------
const FEEDBACK_URL = process.env.NEXT_PUBLIC_FEEDBACK_URL ?? "";

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Give feedback</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Your feedback helps improve this site. It is anonymous. Please do not
          include your name, contact details, or anything about the person being
          cared for.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <section className="max-w-2xl space-y-2 rounded-lg border border-calm-200 bg-white p-5 text-sm leading-relaxed text-calm-700">
        <h2 className="text-base font-semibold text-calm-700">
          What the form asks
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>A few short rating questions</li>
          <li>One optional general comment</li>
        </ul>
        <p>
          There is no name, no contact field, and no box asking about your
          situation. The form is hosted by a third party, so this app neither
          sees nor stores your answers.
        </p>
      </section>

      {FEEDBACK_URL ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-calm-200 bg-white">
            <iframe
              src={FEEDBACK_URL}
              title="Anonymous feedback form"
              className="h-[700px] w-full"
              style={{ border: "0" }}
              loading="lazy"
            />
          </div>
          <p className="text-sm text-calm-700">
            If the form above does not load,{" "}
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-calm-600 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
            >
              open the feedback form in a new tab
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-calm-500 bg-white p-6 text-sm leading-relaxed text-calm-700">
          <p className="mb-2 font-semibold">
            PLACEHOLDER: feedback form not set
          </p>
          <p>
            No feedback form link has been added yet. Open{" "}
            <code>src/app/feedback/page.tsx</code> and paste your form link into
            the <code>FEEDBACK_URL</code> line near the top, or set the
            <code> NEXT_PUBLIC_FEEDBACK_URL</code> environment variable. See the
            README.
          </p>
        </div>
      )}
    </div>
  );
}
