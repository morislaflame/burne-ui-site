"use client";

import { ButtonGroupButtonsOnlyDemo } from "@/components/showcase/demos/button-group/ButtonGroupButtonsOnly.demo";
import buttonGroupButtonsOnlySource from "@/components/showcase/demos/button-group/ButtonGroupButtonsOnly.demo.tsx?raw";
import { ButtonGroupGlossDemo } from "@/components/showcase/demos/button-group/ButtonGroupGloss.demo";
import buttonGroupGlossSource from "@/components/showcase/demos/button-group/ButtonGroupGloss.demo.tsx?raw";
import { ButtonGroupHorizontalDemo } from "@/components/showcase/demos/button-group/ButtonGroupHorizontal.demo";
import buttonGroupHorizontalSource from "@/components/showcase/demos/button-group/ButtonGroupHorizontal.demo.tsx?raw";
import { ButtonGroupPricingTierDemo } from "@/components/showcase/demos/button-group/ButtonGroupPricingTier.demo";
import buttonGroupPricingTierSource from "@/components/showcase/demos/button-group/ButtonGroupPricingTier.demo.tsx?raw";
import { ButtonGroupSizesDemo } from "@/components/showcase/demos/button-group/ButtonGroupSizes.demo";
import buttonGroupSizesSource from "@/components/showcase/demos/button-group/ButtonGroupSizes.demo.tsx?raw";
import { ButtonGroupVerticalMenuDemo } from "@/components/showcase/demos/button-group/ButtonGroupVerticalMenu.demo";
import buttonGroupVerticalMenuSource from "@/components/showcase/demos/button-group/ButtonGroupVerticalMenu.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ButtonGroupShowcase() {
  return (
    <ShowcasePage
      title="ButtonGroup"
      description="Glued buttons and labels: single stroke, segments and nested controls."
      importPath='import { ButtonGroup, ButtonGroupText } from "burne-ui";'
      tags={["composite", "actions"]}
    >
      <ShowcaseSection
        title="Horizontal group"
        description="ButtonGroupText, segments groupSegment and Dropdown in the last segment."
      >
        <ShowcaseDemoFromFile Demo={ButtonGroupHorizontalDemo} source={buttonGroupHorizontalSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Buttons only" description="Some outline-buttons without signature.">
        <ShowcaseDemoFromFile Demo={ButtonGroupButtonsOnlyDemo} source={buttonGroupButtonsOnlySource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="buttonSize: small, base, mid, large — height of all segments.">
        <ShowcaseDemoFromFile Demo={ButtonGroupSizesDemo} source={buttonGroupSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — common glass surface of the group.">
        <ShowcaseDemoFromFile Demo={ButtonGroupGlossDemo} source={buttonGroupGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Vertical panels and colored segments — demo-files in `demos/button-group/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ButtonGroupVerticalMenuDemo} source={buttonGroupVerticalMenuSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ButtonGroupPricingTierDemo} source={buttonGroupPricingTierSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
