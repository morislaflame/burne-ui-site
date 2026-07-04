"use client";

import { GlossComponentsDemo } from "@/components/showcase/demos/gloss/GlossComponents.demo";
import glossComponentsSource from "@/components/showcase/demos/gloss/GlossComponents.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function GlossShowcase() {
  return (
    <ShowcasePage
      title="Gloss"
      description="Glass surface system variant=&quot;gloss&quot; — buttons, fields, cards, modals and interactive cells."
      importPath='variant="gloss" on supported components'
      tags={["variant", "theme"]}
    >
      <ShowcaseSection
        title="Components with gloss"
        description="Unified visual language of glass panels with conic-stroke and hover-lift."
      >
        <ShowcaseDemoFromFile padding="plus" align="stretch" Demo={GlossComponentsDemo} source={glossComponentsSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
