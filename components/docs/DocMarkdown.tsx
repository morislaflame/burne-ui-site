"use client";

import { useCallback, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

import { Button, Card, Text, cn } from "burne-ui";

import { useSiteLocale } from "@/components/site-locale";
import type { GuideDocContent } from "@/lib/docs/docs.types";

export const docMarkdownComponents: Components = {
  h1: ({ children }) => (
    <Text as="h2" variant="header-2" className="text-foreground first:mt-0">
      {children}
    </Text>
  ),
  h2: ({ children }) => (
    <Text as="h3" variant="large" className="mt-large font-semibold text-foreground first:mt-0">
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
    <ul className="list-disc space-y-xsmall pl-large text-base text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-xsmall pl-large text-base text-muted">{children}</ol>
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
    <pre className="overflow-x-auto rounded-mid border-token bg-surface p-large text-base font-mono text-foreground">
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
    <th className="px-large py-base font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => <td className="px-large py-small text-muted">{children}</td>,
};

export function DocMarkdownBody({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-large">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={docMarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function DocMarkdown({
  docs,
  title = "Documentation",
  description,
  className,
}: {
  docs: GuideDocContent;
  title?: string;
  description?: string;
  className?: string;
}) {
  const { locale } = useSiteLocale();
  const [copied, setCopied] = useState(false);
  const content = docs[locale] ?? docs.ru ?? docs.en;
  const copyLabel = locale === "ru" ? (copied ? "Скопировано" : "Копировать") : copied ? "Copied" : "Copy";
  const copyAria = locale === "ru"
    ? copied
      ? "Документация скопирована"
      : "Копировать документацию"
    : copied
      ? "Documentation copied"
      : "Copy documentation";

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [content]);

  return (
    <Card variant="outline" className={cn("flex flex-col gap-large relative p-2xlarge", className)}>
      <Button
        type="button"
        size="small"
        classNames={{ root: "absolute top-6 right-6" }}
        onClick={onCopy}
        icon={
          copied ? (
            <IoCheckmark aria-hidden className="text-success" />
          ) : (
            <IoCopyOutline aria-hidden />
          )
        }
        aria-label={copyAria}
      >
        {copyLabel}
      </Button>
        <DocMarkdownBody content={content} />
    </Card>
  );
}
