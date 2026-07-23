"use client";

import { useCallback, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

import { Button, Card, Tabs, Text, cn } from "burne-ui";

import {
  type ComponentDocContent,
  type ComponentDocLocale,
} from "@/lib/showcase/component-docs.types";

const LOCALE_LABELS: Record<ComponentDocLocale, string> = {
  en: "English",
  ru: "Русский",
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <Text as="h2" variant="header-2" className="text-foreground first:mt-0">
      {children}
    </Text>
  ),
  h2: ({ children }) => (
    <Text as="h3" variant="large" className="mt-mid font-semibold text-foreground first:mt-0">
      {children}
    </Text>
  ),
  h3: ({ children }) => (
    <Text as="h4" variant="mid" className="mt-small font-semibold text-foreground first:mt-0">
      {children}
    </Text>
  ),
  p: ({ children }) => (
    <Text as="p" variant="small" className="text-muted">
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-xsmall pl-mid text-base text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-xsmall pl-mid text-base text-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-primary underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  hr: () => <hr className="border-token" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-token pl-small text-base text-muted italic">{children}</blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");

    if (isBlock) {
      return <code className={cn("text-small text-foreground", className)}>{children}</code>;
    }

    return (
      <code className="rounded-base bg-surface px-1 py-0.5 text-small text-primary">{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-mid border-token bg-surface-secondary/60 p-mid text-base font-mono bg-surface text-foreground">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-mid border-token bg-surface">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-secondary/60">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-mid py-base font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => <td className="px-mid py-small text-muted">{children}</td>,
};

function ShowcaseMarkdownBody({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-mid">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

function ShowcaseMarkdownDocPanel({
  docs,
  className,
}: {
  docs: ComponentDocContent;
  className?: string;
}) {
  const [locale, setLocale] = useState<ComponentDocLocale>("ru");
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(docs[locale].trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [docs, locale]);

  return (
    <Card variant="outline" className={cn("flex flex-col gap-mid", className)}>
      <Card.Header className="gap-small">
        <div className="flex flex-col gap-small sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-xsmall w-full">
            <div className="flex flex-wrap items-center gap-small w-full justify-between">
              <Card.Title className="text-large">Documentation</Card.Title>
              <Button
                type="button"
                variant="outline"
                size="small"
                onClick={onCopy}
                icon={
                  copied ? (
                    <IoCheckmark aria-hidden className="text-success" />
                  ) : (
                    <IoCopyOutline aria-hidden />
                  )
                }
                aria-label={
                  copied
                    ? "Documentation copied"
                    : `Copy documentation (${LOCALE_LABELS[locale]})`
                }
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Card.Description>Import, API, styling and accessibility from the library.</Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="flex flex-col gap-large pt-0">
        <Tabs
          value={locale}
          onValueChange={(value) => setLocale(value as ComponentDocLocale)}
          className="flex flex-col gap-mid"
        >
          <Tabs.List className="w-full sm:w-fit">
            {(Object.keys(LOCALE_LABELS) as ComponentDocLocale[]).map((key) => (
              <Tabs.Tab key={key} value={key} className="flex-1 sm:flex-none">
                {LOCALE_LABELS[key]}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {(Object.keys(LOCALE_LABELS) as ComponentDocLocale[]).map((key) => (
            <Tabs.Panel key={key} value={key}>
              <ShowcaseMarkdownBody content={docs[key]} />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export function ShowcaseMarkdownDoc({
  docs,
  className,
}: {
  docs: ComponentDocContent;
  className?: string;
}) {
  return <ShowcaseMarkdownDocPanel docs={docs} className={className} />;
}
