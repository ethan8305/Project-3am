import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Disclaimer from "@/components/Disclaimer";
import RoadmapStepLink from "@/components/RoadmapStepLink";
import { getAllPlaybookSlugs, getPlaybookSection } from "@/lib/playbook";

export const dynamicParams = false;

type Frontmatter = {
  title?: string;
  description?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "playbook");

async function loadSection(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  let source: string;
  try {
    source = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const { content } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return { content };
}

export function generateStaticParams() {
  return getAllPlaybookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = getPlaybookSection(slug);
  if (!section) return {};
  return {
    title: `${section.title} | Project 3AM`,
    description: section.summary,
  };
}

export default async function PlaybookSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getPlaybookSection(slug);
  const loaded = await loadSection(slug);
  if (!section || !loaded) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <nav className="text-sm">
        <RoadmapStepLink href={`/playbook/${slug}`} />
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-calm-700">{section.title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed">{section.summary}</p>
      </header>

      <Disclaimer className="max-w-2xl" />

      <div className="prose-topic">{loaded.content}</div>

      <div className="max-w-2xl rounded-lg border border-calm-200 bg-white p-5">
        <h2 className="mb-1 text-lg font-semibold text-calm-700">
          Blank folder template
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          Gather your thoughts on this and the other sections in one private
          place. Nothing is uploaded or stored.
        </p>
        <a
          href="/templates/future-caregiver-folder.pdf"
          download
          className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700"
        >
          Download the blank folder template (PDF)
        </a>
      </div>
    </article>
  );
}
