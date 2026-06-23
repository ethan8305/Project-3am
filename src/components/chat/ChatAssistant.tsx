"use client";

// Mini planning assistant: a floating, scripted chatbot.
//
// IMPORTANT: This is NOT an AI chatbot. It only ever shows scripted questions
// and the same routing logic as the self-assessment. It holds answers in React
// state (browser memory) only: no localStorage, no cookies, no network request,
// and nothing is tied to a name. The guardrails are absolute because it can
// only say what is written here.

import { useEffect, useRef, useState } from "react";
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
import { useChat } from "./ChatProvider";

const ageOptions: { id: AgeGroup; label: string }[] = [
  { id: "under-21", label: "Under 21" },
  { id: "21-or-over", label: "21 and over" },
];

const initialAnswers: TriageAnswers = { age: null, tools: [], support: null };

function Bot({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[85%] rounded-lg rounded-tl-none bg-calm-100 px-3 py-2 text-ink">
      {children}
    </div>
  );
}

function User({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-calm-600 px-3 py-2 text-white">
      {children}
    </div>
  );
}

const optionButtonClass =
  "rounded-full border border-calm-300 px-3 py-1 text-sm text-calm-700 hover:border-calm-500 hover:bg-calm-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600";

export default function ChatAssistant() {
  const { isOpen, toggle, close } = useChat();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TriageAnswers>(initialAnswers);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const result = step >= 3 ? buildResult(answers) : null;

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [step, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        bubbleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  function restart() {
    setAnswers(initialAnswers);
    setStep(0);
  }

  function toggleTool(id: ToolId) {
    setAnswers((prev) => ({
      ...prev,
      tools: prev.tools.includes(id)
        ? prev.tools.filter((t) => t !== id)
        : [...prev.tools, id],
    }));
  }

  function closeAndReturnFocus() {
    close();
    bubbleRef.current?.focus();
  }

  const ageLabel =
    answers.age === "under-21" ? "Under 21" : "21 and over";
  const toolsLabel =
    answers.tools.length > 0
      ? answers.tools
          .map((id) => toolOptions.find((o) => o.id === id)?.label)
          .filter(Boolean)
          .join(", ")
      : "I am not sure yet";
  const supportLabel =
    supportOptions.find((o) => o.id === answers.support)?.label ?? "";

  return (
    <>
      <button
        ref={bubbleRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Where do I start? Open the planning assistant"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-calm-600 px-4 py-3 font-semibold text-white shadow-lg hover:bg-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-700"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z" />
        </svg>
        <span className="text-sm">Where do I start?</span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-label="Planning assistant"
          className="fixed bottom-20 right-4 z-50 flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-calm-200 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between bg-calm-700 px-4 py-3 text-white">
            <h2 className="text-sm font-semibold">Where do I start?</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={closeAndReturnFocus}
              aria-label="Close the assistant"
              className="rounded p-1 hover:bg-calm-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            ref={bodyRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm"
            aria-live="polite"
          >
            <Bot>
              Hello. I can point you to topics that tend to be relevant. There
              are no wrong answers, and nothing you tap here is saved.
            </Bot>

            <Bot>Is the person being cared for under 21, or 21 and over?</Bot>
            {step > 0 ? <User>{ageLabel}</User> : null}
            {step === 0 ? (
              <div className="flex flex-wrap gap-2">
                {ageOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, age: opt.id }));
                      setStep(1);
                    }}
                    className={optionButtonClass}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : null}

            {step > 0 ? (
              <>
                <Bot>
                  Which planning tools are you looking at? Tap any that apply,
                  then choose Done.
                </Bot>
                {step > 1 ? <User>{toolsLabel}</User> : null}
                {step === 1 ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {toolOptions.map((opt) => {
                        const selected = answers.tools.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleTool(opt.id)}
                            aria-pressed={selected}
                            className={`rounded-full border px-3 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600 ${
                              selected
                                ? "border-calm-600 bg-calm-600 text-white"
                                : "border-calm-300 text-calm-700 hover:border-calm-500 hover:bg-calm-100"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-md bg-calm-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-calm-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-700"
                    >
                      Done
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}

            {step > 1 ? (
              <>
                <Bot>What kind of support do you think you need right now?</Bot>
                {step > 2 ? <User>{supportLabel}</User> : null}
                {step === 2 ? (
                  <div className="flex flex-wrap gap-2">
                    {supportOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setAnswers((prev) => ({
                            ...prev,
                            support: opt.id as SupportId,
                          }));
                          setStep(3);
                        }}
                        className={optionButtonClass}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}

            {result ? (
              <Bot>
                <p className="mb-2">{result.note}</p>
                <ul className="mb-2 space-y-1">
                  {result.topics.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/resources/${topic.slug}`}
                        onClick={closeAndReturnFocus}
                        className="font-semibold text-calm-700 underline underline-offset-2"
                      >
                        {topic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {result.suggestBooking ? (
                  <Link
                    href="/booking"
                    onClick={closeAndReturnFocus}
                    className="mb-2 inline-block rounded-md bg-calm-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-calm-700"
                  >
                    Book a clinic
                  </Link>
                ) : null}
                <div>
                  <button
                    type="button"
                    onClick={restart}
                    className="text-sm text-calm-600 underline underline-offset-2"
                  >
                    Start again
                  </button>
                </div>
              </Bot>
            ) : null}
          </div>

          <p className="border-t border-calm-200 px-4 py-2 text-xs text-calm-700">
            Not legal advice. Nothing you tap here is saved.
          </p>
        </div>
      ) : null}
    </>
  );
}
