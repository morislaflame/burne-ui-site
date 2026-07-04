import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShowcaseMarkdownDoc } from "@/components/showcase/layout/ShowcaseMarkdownDoc";
import { ShowcasePageView } from "@/components/showcase/showcase-page-view";
import { getComponentDocs } from "@/lib/showcase/component-docs.server";
import { findShowcasePage, SHOWCASE_PAGES } from "@/lib/showcase/registry";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SHOWCASE_PAGES.map((page) => ({ slug: page.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findShowcasePage(slug);
  if (!page) return { title: "Not found — Burne UI" };

  return {
    title: `${page.label} — Burne UI`,
    description: `${page.label} component showcase and customization.`,
  };
}

export default async function ComponentShowcasePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findShowcasePage(slug);
  if (!page) notFound();

  const docs = getComponentDocs(page.id);

  return (
    <div className="flex flex-col gap-xlarge">
      <ShowcasePageView pageId={page.id} label={page.label} />
      {docs ? <ShowcaseMarkdownDoc docs={docs} /> : null}
    </div>
  );
}
