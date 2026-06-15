import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Book a clinic | Project 3AM",
  description:
    "Book a free clinic slot. You share only a name, one contact method, a preferred slot, and a general topic.",
};

// Set in your Vercel project settings or .env.local. See the README.
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Book a clinic</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          A clinic slot is a chance to talk through your questions with a
          volunteer. The booking form asks only for a name, one way to reach
          you, a preferred slot, and a general topic. Please do not share
          medical, financial or family details in the booking.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <section className="max-w-2xl space-y-2 rounded-lg border border-calm-200 bg-white p-5 text-sm leading-relaxed text-calm-700">
        <h2 className="text-base font-semibold text-calm-700">
          What the booking collects
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Your name</li>
          <li>One contact method (for example an email address)</li>
          <li>A preferred slot</li>
          <li>
            A general topic: will, LPA, trust, deputyship, guardianship, or not
            sure
          </li>
        </ul>
        <p>
          There is no box asking you to describe your situation. You can share
          the detail in the clinic itself, with a person.
        </p>
      </section>

      <CalendlyEmbed url={calendlyUrl} />
    </div>
  );
}
