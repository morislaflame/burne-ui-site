"use client";

import { Badge, Button, Select, Text } from "burne-ui";

import { useShowcaseControls } from "@/components/showcase-controls/showcase-controls-provider";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";
import { findShowcaseGroupForPage } from "@/lib/showcase/registry";

type PlaceholderControls = {
  variant: "default" | "outline" | "secondary" | "gloss";
  status: "default" | "danger" | "success" | "info" | "warning";
  size: "small" | "base" | "mid";
};

const DEFAULT_CONTROLS: PlaceholderControls = {
  variant: "default",
  status: "default",
  size: "base",
};

export function ShowcasePagePlaceholder({
  pageId,
  label,
}: {
  pageId: string;
  label: string;
}) {
  const group = findShowcaseGroupForPage(pageId);
  const [controls, setControls] = useShowcaseControls(pageId, DEFAULT_CONTROLS);

  return (
    <ShowcasePage
      title={label}
      description={`Showcase для ${label} будет перенесён из playground. Состояние контролов ниже сохраняется при переходе между страницами.`}
      importPath={`import { ${label} } from "burne-ui";`}
      tags={[group?.label ?? "Component", "Coming soon"]}
    >
      <ShowcaseSection
        title="Preview"
        description="Временная заглушка до переноса демо из playground."
      >
        <div className="flex flex-col gap-large rounded-small border-token bg-surface p-xlarge shadow-token-sm">
          <Text as="p" variant="base" className="text-muted">
            Компонент <strong className="text-foreground">{label}</strong> — скоро здесь будут
            демо из playground.
          </Text>
          <div className="flex flex-wrap items-center gap-small">
            <Badge variant="secondary">{controls.variant}</Badge>
            <Badge status={controls.status}>{controls.status}</Badge>
            <Badge size={controls.size}>{controls.size}</Badge>
          </div>
          <Button variant={controls.variant} status={controls.status} size={controls.size}>
            {label} preview
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Controls"
        description="Пример пер-слайдового состояния — значения не сбрасываются при навигации."
      >
        <div className="grid gap-large sm:grid-cols-3">
          <Select
            label="Variant"
            value={controls.variant}
            onValueChange={(value) =>
              setControls({
                variant: value as PlaceholderControls["variant"],
              })
            }
            options={[
              { value: "default", label: "default" },
              { value: "outline", label: "outline" },
              { value: "secondary", label: "secondary" },
              { value: "gloss", label: "gloss" },
            ]}
          />

          <Select
            label="Status"
            value={controls.status}
            onValueChange={(value) =>
              setControls({
                status: value as PlaceholderControls["status"],
              })
            }
            options={[
              { value: "default", label: "default" },
              { value: "danger", label: "danger" },
              { value: "success", label: "success" },
              { value: "info", label: "info" },
              { value: "warning", label: "warning" },
            ]}
          />

          <Select
            label="Size"
            value={controls.size}
            onValueChange={(value) =>
              setControls({
                size: value as PlaceholderControls["size"],
              })
            }
            options={[
              { value: "small", label: "small" },
              { value: "base", label: "base" },
              { value: "mid", label: "mid" },
            ]}
          />
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
}
