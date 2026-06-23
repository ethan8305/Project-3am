"use client";

import { useChat } from "./ChatProvider";

// Opens the floating planning assistant. Used where a page wants to invite
// people into the assistant (for example the home page).
export default function OpenAssistantButton({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { open } = useChat();
  return (
    <button
      type="button"
      onClick={open}
      className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 text-left transition hover:border-calm-500 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calm-600"
    >
      <span className="mb-2 text-lg font-semibold text-calm-700">{title}</span>
      <span className="text-sm leading-relaxed text-ink">{body}</span>
    </button>
  );
}
