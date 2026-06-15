import type { Metadata } from "next";
import Disclaimer from "@/components/Disclaimer";
import TriageWizard from "@/components/TriageWizard";

export const metadata: Metadata = {
  title: "Where do I start? | Project 3AM",
  description:
    "A short, private self-assessment that points you to relevant topics. Nothing you enter is saved.",
};

export default function TriagePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-calm-700">Where do I start?</h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          A few short questions to help point you towards relevant topics. There
          are no right or wrong answers, and you can change them as you go.
        </p>
        <p className="max-w-2xl rounded-md border border-calm-200 bg-white px-4 py-3 text-sm leading-relaxed text-calm-700">
          Your answers stay in this browser tab only. Nothing is saved, nothing
          is sent anywhere, and nothing is tied to a name. Close the tab and it
          is gone.
        </p>
        <Disclaimer className="max-w-2xl" />
      </header>

      <TriageWizard />
    </div>
  );
}
