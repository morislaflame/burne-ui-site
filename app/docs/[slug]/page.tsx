import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Text } from "burne-ui";

import { DocMarkdown } from "@/components/docs/DocMarkdown";
import { getGuideDocs } from "@/lib/docs/guide-docs.server";
import { DOCS_PAGES, findDocsPage } from "@/lib/docs/registry";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DOCS_PAGES.map((page) => ({ slug: page.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findDocsPage(slug);
  if (!page) return { title: "Not found — Burne UI" };

  return {
    title: `${page.label} — Burne UI Docs`,
    description: page.description,
  };
}

export default async function DocsGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findDocsPage(slug);
  if (!page) notFound();

  const docs = getGuideDocs(page.id);
  if (!docs) notFound();

  return (
    <div className="flex flex-col gap-xlarge">
      <header className="flex flex-col gap-xsmall">
        <Text as="h1" variant="header-1" className="text-foreground">
          {page.label}
        </Text>
        <Text as="p" variant="small" className="text-muted">
          {page.description}
        </Text>
      </header>
      <DocMarkdown docs={docs} title={page.label} description={page.description} />
    </div>
  );
}
