"use client";

import { useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";

import { Badge, Card, Text } from "burne-ui";

import {
  SHOWCASE_GROUPS,
  showcasePagePath,
  type ShowcaseGroup,
} from "@/lib/showcase/registry";

export function DocsComponentsHub() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2xlarge">
      <header className="flex flex-col gap-small">
        <Text as="h1" variant="header-1" className="text-foreground">
          Components
        </Text>
        <Text as="p" variant="mid" className="max-w-prose text-muted">
          Browse by group, then open the interactive showcase with demos, theme
          playground, and API docs.
        </Text>
      </header>

      <div className="flex flex-col gap-2xlarge">
        {SHOWCASE_GROUPS.map((group: ShowcaseGroup) => (
          <section key={group.id} className="flex flex-col gap-large">
            <div className="flex items-center gap-small">
              <Text as="h2" variant="large" className="text-foreground">
                {group.label}
              </Text>
              <Badge size="small" variant="secondary">
                {group.pages.length}
              </Badge>
            </div>

            <div className="grid gap-large sm:grid-cols-2">
              {group.pages.map((page) => {
                const href = showcasePagePath(page.id);
                return (
                  <Card
                    key={page.id}
                    variant="outline"
                    pressable
                    onPress={() => router.push(href)}
                    onMouseEnter={() => router.prefetch(href)}
                  >
                    <Card.Header className="flex-row items-center justify-between gap-small">
                      <Card.Title className="text-mid">{page.label}</Card.Title>
                      <IoChevronForward aria-hidden className="icon-mid text-muted" />
                    </Card.Header>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
