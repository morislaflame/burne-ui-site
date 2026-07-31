"use client";

import { useRouter } from "next/navigation";

import { Button, Card, Text } from "burne-ui";

import {
  DOCS_COMPONENTS_PATH,
  DOCS_PAGES,
  docsPagePath,
} from "@/lib/docs/registry";
import { DEFAULT_SHOWCASE_PAGE_ID, showcasePagePath } from "@/lib/showcase/registry";

export function DocsIndex() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2xlarge">
      <header className="flex flex-col gap-small">
        <Text as="h1" variant="header-1" className="text-foreground">
          Documentation
        </Text>
        <Text as="p" variant="mid" className="max-w-prose text-muted">
          Guides for installing and customizing Burne UI, plus a component
          catalog that opens the interactive showcase.
        </Text>
        <div className="mt-small flex flex-wrap gap-small">
          <Button
            type="button"
            variant="primary"
            onClick={() => router.push(docsPagePath("getting-started"))}
          >
            Getting started
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(DOCS_COMPONENTS_PATH)}
          >
            Components hub
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(showcasePagePath(DEFAULT_SHOWCASE_PAGE_ID))}
          >
            Open showcase
          </Button>
        </div>
      </header>

      <section className="flex flex-col gap-large">
        <Text as="h2" variant="large" className="text-foreground">
          Guides
        </Text>
        <div className="grid gap-large sm:grid-cols-2">
          {DOCS_PAGES.map((page) => (
            <Card key={page.id} variant="default">
              <Card.Header>
                <Card.Title className="text-mid">{page.label}</Card.Title>
                <Card.Description>{page.description}</Card.Description>
              </Card.Header>
              <Card.Footer className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={() => router.push(docsPagePath(page.id))}
                >
                  Open
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
