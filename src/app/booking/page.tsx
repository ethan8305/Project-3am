import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Book a clinic | Project 3AM",
  description:
    "Book a free clinic slot. You share only a name, one contact method, a preferred slot, and a general topic.",
};

// ---------------------------------------------------------------------------
// YOUR BOOKING LINK GOES HERE.
//
// Paste your scheduling link between the quotation marks below. It works with
// Cal.com, Calendly, or any other scheduling page. To change it later, just
// edit this one line.
//
// (On Vercel you can instead set an environment variable called
// NEXT_PUBLIC_BOOKING_URL, which will override the line below.)
// ---------------------------------------------------------------------------
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.eu/ethanng/30-minute-slot";

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

      {BOOKING_URL ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-calm-200 bg-white">
            <iframe
              src={BOOKING_URL}
              title="Booking calendar"
              className="h-[700px] w-full"
              style={{ border: "0" }}
              loading="lazy"
            />
          </div>
          <p className="text-sm text-calm-700">
            If the calendar above does not load,{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-calm-600 underline underline-offset-2"
            >
              open the booking page in a new tab
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-calm-500 bg-white p-6 text-sm leading-relaxed text-calm-700">
          <p className="mb-2 font-semibold">PLACEHOLDER: booking link not set</p>
          <p>
            No booking link has been added yet. Open{" "}
            <code>src/app/booking/page.tsx</code> and paste your scheduling link
            into the <code>BOOKING_URL</code> line near the top. See the README
            for details.
          </p>
        </div>
      )}
    </div>
  );
}
