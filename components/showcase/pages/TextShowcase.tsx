"use client";

import { TextEditorialArticleDemo } from "@/components/showcase/demos/text/TextEditorialArticle.demo";
import textEditorialArticleSource from "@/components/showcase/demos/text/TextEditorialArticle.demo.tsx?raw";
import { TextHeroBlockDemo } from "@/components/showcase/demos/text/TextHeroBlock.demo";
import textHeroBlockSource from "@/components/showcase/demos/text/TextHeroBlock.demo.tsx?raw";
import { TextSemanticsDemo } from "@/components/showcase/demos/text/TextSemantics.demo";
import textSemanticsSource from "@/components/showcase/demos/text/TextSemantics.demo.tsx?raw";
import { TextStatsGridDemo } from "@/components/showcase/demos/text/TextStatsGrid.demo";
import textStatsGridSource from "@/components/showcase/demos/text/TextStatsGrid.demo.tsx?raw";
import { TextVariantsDemo } from "@/components/showcase/demos/text/TextVariants.demo";
import textVariantsSource from "@/components/showcase/demos/text/TextVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function TextShowcase() {
  return (
    <ShowcasePage
      title="Text"
      description="Typographic variations for headings, body text, and captions."
      importPath='import { Text } from "burne-ui";'
      tags={["core", "typography"]}
    >
      <ShowcaseSection title="Options" description="All preset-options variant on the component Text.">
        <ShowcaseDemoFromFile Demo={TextVariantsDemo} source={textVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Semantics" description="Prop as sets HTML-element without changing visual style.">
        <ShowcaseDemoFromFile Demo={TextSemanticsDemo} source={textSemanticsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Your colors, layout and compositions - demos in separate files, the code is pulled up via ?raw."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={TextHeroBlockDemo} source={textHeroBlockSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TextEditorialArticleDemo} source={textEditorialArticleSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TextStatsGridDemo} source={textStatsGridSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
