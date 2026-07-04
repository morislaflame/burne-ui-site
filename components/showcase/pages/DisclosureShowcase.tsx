"use client";

import { DisclosureClassNamesFullDemo } from "@/components/showcase/demos/disclosure/DisclosureClassNamesFull.demo";
import disclosureClassNamesFullSource from "@/components/showcase/demos/disclosure/DisclosureClassNamesFull.demo.tsx?raw";
import { DisclosureCardGroupDemo } from "@/components/showcase/demos/disclosure/DisclosureCardGroup.demo";
import disclosureCardGroupSource from "@/components/showcase/demos/disclosure/DisclosureCardGroup.demo.tsx?raw";
import { DisclosureChangelogDemo } from "@/components/showcase/demos/disclosure/DisclosureChangelog.demo";
import disclosureChangelogSource from "@/components/showcase/demos/disclosure/DisclosureChangelog.demo.tsx?raw";
import { DisclosureCheckoutStepsDemo } from "@/components/showcase/demos/disclosure/DisclosureCheckoutSteps.demo";
import disclosureCheckoutStepsSource from "@/components/showcase/demos/disclosure/DisclosureCheckoutSteps.demo.tsx?raw";
import { DisclosureGlossDemo } from "@/components/showcase/demos/disclosure/DisclosureGloss.demo";
import disclosureGlossSource from "@/components/showcase/demos/disclosure/DisclosureGloss.demo.tsx?raw";
import { DisclosureOutlineFaqDemo } from "@/components/showcase/demos/disclosure/DisclosureOutlineFaq.demo";
import disclosureOutlineFaqSource from "@/components/showcase/demos/disclosure/DisclosureOutlineFaq.demo.tsx?raw";
import { DisclosureSettingsGroupDemo } from "@/components/showcase/demos/disclosure/DisclosureSettingsGroup.demo";
import disclosureSettingsGroupSource from "@/components/showcase/demos/disclosure/DisclosureSettingsGroup.demo.tsx?raw";
import { DisclosureSingleDemo } from "@/components/showcase/demos/disclosure/DisclosureSingle.demo";
import disclosureSingleSource from "@/components/showcase/demos/disclosure/DisclosureSingle.demo.tsx?raw";
import { DisclosureSizesDemo } from "@/components/showcase/demos/disclosure/DisclosureSizes.demo";
import disclosureSizesSource from "@/components/showcase/demos/disclosure/DisclosureSizes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function DisclosureShowcase() {
  return (
    <ShowcasePage
      title="Disclosure"
      description="Expanding blocks with height animation - for FAQ and single sections."
      importPath='import { Disclosure, DisclosureGroup } from "burne-ui";'
      tags={["core", "disclosure"]}
    >
      <ShowcaseSection title="Single" description="One Disclosure without a group.">
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureSingleDemo} source={disclosureSingleSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureSizesDemo} source={disclosureSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Card group" description="DisclosureGroup variant card — general card.">
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureCardGroupDemo} source={disclosureCardGroupSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Outline FAQ" description="DisclosureGroup variant outline with icons.">
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureOutlineFaqDemo} source={disclosureOutlineFaqSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass panel with hover-lift.">
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureGlossDemo} source={disclosureGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slot customization trigger, content and group through classNames."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={DisclosureClassNamesFullDemo}
          source={disclosureClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Design steps, group of settings and changelog — `demos/disclosure/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureCheckoutStepsDemo} source={disclosureCheckoutStepsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureSettingsGroupDemo} source={disclosureSettingsGroupSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={DisclosureChangelogDemo} source={disclosureChangelogSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
