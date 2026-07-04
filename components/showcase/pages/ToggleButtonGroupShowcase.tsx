"use client";

import { ToggleButtonGroupEditorBarDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupEditorBar.demo";
import toggleButtonGroupEditorBarSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupEditorBar.demo.tsx?raw";
import { ToggleButtonGroupGlossDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupGloss.demo";
import toggleButtonGroupGlossSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupGloss.demo.tsx?raw";
import { ToggleButtonGroupMultipleDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupMultiple.demo";
import toggleButtonGroupMultipleSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupMultiple.demo.tsx?raw";
import { ToggleButtonGroupSingleDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupSingle.demo";
import toggleButtonGroupSingleSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupSingle.demo.tsx?raw";
import { ToggleButtonGroupSizesDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupSizes.demo";
import toggleButtonGroupSizesSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupSizes.demo.tsx?raw";
import { ToggleButtonGroupVerticalDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupVertical.demo";
import toggleButtonGroupVerticalSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupVertical.demo.tsx?raw";
import { ToggleButtonGroupViewToolbarDemo } from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupViewToolbar.demo";
import toggleButtonGroupViewToolbarSource from "@/components/showcase/demos/toggleButtonGroup/ToggleButtonGroupViewToolbar.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ToggleButtonGroupShowcase() {
  return (
    <ShowcasePage
      title="ToggleButtonGroup"
      description="Group of radio buttons: single or multiple selection."
      importPath='import { ToggleButtonGroup } from "burne-ui";'
      tags={["composite", "forms"]}
    >
      <ShowcaseSection title="Single selection" description="type=&quot;single&quot; — list view.">
        <ShowcaseDemoFromFile Demo={ToggleButtonGroupSingleDemo} source={toggleButtonGroupSingleSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large — forwarded to child ToggleButton.">
        <ShowcaseDemoFromFile Demo={ToggleButtonGroupSizesDemo} source={toggleButtonGroupSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Multiple Choice" description="type=&quot;multiple&quot; — text formatting.">
        <ShowcaseDemoFromFile Demo={ToggleButtonGroupMultipleDemo} source={toggleButtonGroupMultipleSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass switch group.">
        <ShowcaseDemoFromFile Demo={ToggleButtonGroupGlossDemo} source={toggleButtonGroupGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="View toolbar, vertical group and format bar — `demos/toggleButtonGroup/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ToggleButtonGroupViewToolbarDemo} source={toggleButtonGroupViewToolbarSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ToggleButtonGroupVerticalDemo} source={toggleButtonGroupVerticalSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ToggleButtonGroupEditorBarDemo} source={toggleButtonGroupEditorBarSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
