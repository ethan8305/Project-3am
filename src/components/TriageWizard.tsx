"use client";

// Self-assessment wizard.
//
// IMPORTANT: This component holds all answers in React state (browser memory)
// only. It does NOT use localStorage, cookies, query strings, or any network
// request. When the tab closes, the answers are gone. Please keep it that way.

import { useState } from "react";
import Link from "next/link";
import {
  buildResult,
  supportOptions,
  toolOptions,
  type AgeGroup,
  type SupportId,
  type ToolId,
  type TriageAnswers,
} from "@/lib/triage";

const initialAnswers: TriageAnswers = {
  age: null,
  tools: [],
  support: null,
};

export default function TriageWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TriageAnswers>(initialAnswers);

  const totalSteps = 3;
  const result = step >= totalSteps ? buildResult(answers) : null;

  function reset() {
    setAnswers(initialAnswers);
    setStep(0);
  }

  function toggleTool(id: ToolId) {
    setAnswers((prev) => {
      const has = prev.tools.includes(id);
      return {
        ...prev,
        tools: has
          ? prev.tools.filter((t) => t !== id)
          : [...prev.tools, id],
      };
    });
  }

  if (result) {
    return (
      <section className="space-y-6" aria-live="polite">
        <div className="rounded-lg border border-calm-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold text-calm-700">
            Some topics to look at
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-calm-700">
            {result.note}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {result.topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/resources/${topic.slug}`}
                  className="flex h-full flex-col rounded-md border border-calm-200 p-4 transition hover:border-calm-500"
                >
                  <span className="font-semibold text-calm-700">
                    {topic.title}
                  </span>
                  <span className="mt-1 text-sm text-ink">{topic.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {result.suggestBooking ? (
          <div className="rounded-lg border border-calm-200 bg-calm-100 p-6 text-sm leading-relaxed text-calm-700">
            <p className="mb-3">
              When you are ready, you can book a free clinic slot to talk things
              through. You only share a name, one way to reach you, and a topic.
            </p>
            <Link
              href="/booking"
              className="inline-block rounded-md bg-calm-600 px-4 py-2 font-semibold text-white hover:bg-calm-700"
            >
              Book a clinic
            </Link>
          </div>
        ) : null}

        <button
          type="button"
          onClick={reset}
          className="text-sm text-calm-600 underline underline-offset-2"
        >
          Start the questions again
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-calm-200 bg-white p-6">
      <p className="mb-4 text-sm font-medium text-calm-500">
        Question {step + 1} of {totalSteps}
      </p>

      {step === 0 ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-calm-700">
            Is the person being cared for under 21, or 21 and over?
          </legend>
          <p className="text-sm text-calm-700">
            This helps us point to the route that tends to come up at different
            ages. It is only a general steer.
          </p>
          <div className="space-y-2">
            {(
              [
                { id: "under-21", label: "Under 21" },
                { id: "21-or-over", label: "21 and over" },
              ] as { id: AgeGroup; label: string }[]
            ).map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-calm-200 px-4 py-3 hover:border-calm-500"
              >
                <input
                  type="radio"
                  name="age"
                  value={opt.id}
                  checked={answers.age === opt.id}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, age: opt.id }))
                  }
                  className="h-4 w-4"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-calm-700">
            Which planning tools are you looking at?
          </legend>
          <p className="text-sm text-calm-700">
            Choose as many as you like. If you are not sure, that is fine: pick
            &ldquo;I am not sure yet&rdquo;.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {toolOptions.map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-calm-200 px-4 py-3 hover:border-calm-500"
              >
                <input
                  type="checkbox"
                  value={opt.id}
                  checked={answers.tools.includes(opt.id)}
                  onChange={() => toggleTool(opt.id)}
                  className="h-4 w-4"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-calm-700">
            What kind of support do you think you need right now?
          </legend>
          <div className="space-y-2">
            {supportOptions.map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-calm-200 px-4 py-3 hover:border-calm-500"
              >
                <input
                  type="radio"
                  name="support"
                  value={opt.id}
                  checked={answers.support === opt.id}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      support: opt.id as SupportId,
                    }))
                  }
                  className="h-4 w-4"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-md px-4 py-2 text-sm font-semibold text-calm-700 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="rounded-md bg-calm-600 px-5 py-2 text-sm font-semibold text-white hover:bg-calm-700"
        >
          {step === totalSteps - 1 ? "See my topics" : "Next"}
        </button>
      </div>
    </section>
  );
}
