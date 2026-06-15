import Link from "next/link";
import type { Topic } from "@/lib/topics";

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/resources/${topic.slug}`}
      className="flex h-full flex-col rounded-lg border border-calm-200 bg-white p-5 transition hover:border-calm-500 hover:shadow-sm"
    >
      <span className="mb-2 text-lg font-semibold text-calm-700">
        {topic.title}
      </span>
      <span className="text-sm leading-relaxed text-ink">{topic.summary}</span>
    </Link>
  );
}
