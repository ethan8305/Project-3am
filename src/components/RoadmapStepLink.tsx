import Link from "next/link";
import { findStepForHref, roadmapStepCount } from "@/lib/roadmap";

// Shows where the current page sits in the planning roadmap, and links back to
// it. `href` is the page's own path (for example /resources/wills).
export default function RoadmapStepLink({ href }: { href: string }) {
  const step = findStepForHref(href);
  return (
    <Link
      href="/roadmap"
      className="inline-flex items-center gap-2 text-sm text-calm-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
    >
      <span aria-hidden="true">&larr;</span>
      {step ? (
        <span>
          Roadmap, step {step.number} of {roadmapStepCount}: {step.title}
        </span>
      ) : (
        <span>Back to the roadmap</span>
      )}
    </Link>
  );
}
