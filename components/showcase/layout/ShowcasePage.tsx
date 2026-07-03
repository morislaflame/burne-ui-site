import type { ReactNode } from "react";

import { Badge } from "burne-ui";
import { Text } from "burne-ui";
import { cn } from "burne-ui";

export function ShowcasePage({
  title,
  description,
  importPath,
  tags,
  children,
  className,
}: {
  title: string;
  description?: string;
  importPath?: string;
  tags?: string[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col gap-xlarge", className)}>
      <header className="flex flex-col gap-small">
        <div className="flex flex-wrap items-center gap-small">
          <Text as="h1" variant="header-1">
            {title}
          </Text>
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary" size="small">
              {tag}
            </Badge>
          ))}
        </div>
        {description ? (
          <Text as="p" variant="base" className="text-muted max-w-2xl">
            {description}
          </Text>
        ) : null}
      </header>
      {children}
    </article>
  );
}
