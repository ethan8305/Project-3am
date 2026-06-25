import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Disclaimer from "@/components/Disclaimer";
import RoadmapStepLink from "@/components/RoadmapStepLink";
import { getAllSlugs, getTopic } from "@/lib/topics";

export const dynamicParams = false;

type Frontmatter = {
  title?: string;
  description?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "topics");

async function loadTopic(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  let source: string;
  try {
    source = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return { content, frontmatter };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} | Project 3AM`,
    description: topic.summary,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  const loaded = await loadTopic(slug);
  if (!topic || !loaded) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <nav className="text-sm">
        <RoadmapStepLink href={`/resources/${slug}`} />
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-calm-700">{topic.title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed">{topic.summary}</p>
      </header>

      <Disclaimer className="max-w-2xl" />

      <div className="prose-topic">{loaded.content}</div>

      {topic.checklist ? (
        <div className="max-w-2xl rounded-lg border border-calm-200 bg-white p-5">
          <h2 className="mb-1 text-lg font-semibold text-calm-700">
            Preparation checklist
          </h2>
          <p className="mb-3 text-sm leading-relaxed">
            A blank checklist and prompts to help you gather your thoughts
            before speaking to a professional. It does not ask for any personal
            details and nothing is sent anywhere.
          </p>
          <a
            href={topic.checklist}
            download
            className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700"
          >
            Download the {topic.title} checklist
          </a>
        </div>
      ) : null}

      <div className="max-w-2xl rounded-lg border border-calm-200 bg-calm-100 p-5 text-sm leading-relaxed text-calm-700">
        <p className="mb-2 font-semibold">Would it help to talk to someone?</p>
        <p className="mb-3">
          You can book a free clinic slot. You only share a name, one way to
          reach you, and a topic.
        </p>
        <Link
          href="/booking"
          className="inline-block rounded-md bg-calm-600 px-4 py-2 font-semibold text-white hover:bg-calm-700"
        >
          Book a clinic
        </Link>
      </div>
    </article>
  );
}
