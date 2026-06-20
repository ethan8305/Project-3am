import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline | Project 3AM",
  description: "You are offline. Some pages you have already opened are still available.",
};

export default function OfflinePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-calm-700">You are offline</h1>
      <p className="max-w-2xl leading-relaxed">
        It looks like there is no connection right now. Pages you have already
        opened may still be available to read. The booking page needs a
        connection to load.
      </p>
      <p className="max-w-2xl leading-relaxed">
        When you are back online, you can carry on where you left off.
      </p>
      <Link
        href="/"
        className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
      >
        Go to the home page
      </Link>
    </div>
  );
}
