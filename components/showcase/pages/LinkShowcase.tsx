"use client";

import { LinkArticleInlineDemo } from "@/components/showcase/demos/link/LinkArticleInline.demo";
import linkArticleInlineSource from "@/components/showcase/demos/link/LinkArticleInline.demo.tsx?raw";
import { LinkCompoundApiDemo } from "@/components/showcase/demos/link/LinkCompoundApi.demo";
import linkCompoundApiSource from "@/components/showcase/demos/link/LinkCompoundApi.demo.tsx?raw";
import { LinkCardActionsDemo } from "@/components/showcase/demos/link/LinkCardActions.demo";
import linkCardActionsSource from "@/components/showcase/demos/link/LinkCardActions.demo.tsx?raw";
import { LinkClassNamesFullDemo } from "@/components/showcase/demos/link/LinkClassNamesFull.demo";
import linkClassNamesFullSource from "@/components/showcase/demos/link/LinkClassNamesFull.demo.tsx?raw";
import { LinkFooterNavDemo } from "@/components/showcase/demos/link/LinkFooterNav.demo";
import linkFooterNavSource from "@/components/showcase/demos/link/LinkFooterNav.demo.tsx?raw";
import { LinkSizesDemo } from "@/components/showcase/demos/link/LinkSizes.demo";
import linkSizesSource from "@/components/showcase/demos/link/LinkSizes.demo.tsx?raw";
import { LinkVariantsDemo } from "@/components/showcase/demos/link/LinkVariants.demo";
import linkVariantsSource from "@/components/showcase/demos/link/LinkVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function LinkShowcase() {
  return (
    <ShowcasePage
      title="Link"
      description="Stylized links for internal and external navigation with icons and underlining."
      importPath='import { Link } from "burne-ui";'
      tags={["core", "navigation"]}
    >
      <ShowcaseSection title="Options" description="Internal, external links and icon customization.">
        <ShowcaseDemoFromFile Demo={LinkVariantsDemo} source={linkVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Compound API" description="Link.Icon — icon marker in markup; without children — standard ↗.">
        <ShowcaseDemoFromFile Demo={LinkCompoundApiDemo} source={linkCompoundApiSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={LinkSizesDemo} source={linkSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots motion, anchor, text, iconStart and iconEnd — through prop classNames."
      >
        <ShowcaseDemoFromFile align="center" Demo={LinkClassNamesFullDemo} source={linkClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Basement, inline-links in the text and card actions — `demos/link/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={LinkFooterNavDemo} source={linkFooterNavSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LinkArticleInlineDemo} source={linkArticleInlineSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LinkCardActionsDemo} source={linkCardActionsSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
