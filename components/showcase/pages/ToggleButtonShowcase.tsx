"use client";

import { ToggleButtonClassNamesFullDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonClassNamesFull.demo";
import toggleButtonClassNamesFullSource from "@/components/showcase/demos/toggle-button/ToggleButtonClassNamesFull.demo.tsx?raw";
import { ToggleButtonControlledDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonControlled.demo";
import toggleButtonControlledSource from "@/components/showcase/demos/toggle-button/ToggleButtonControlled.demo.tsx?raw";
import { ToggleButtonGlossDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonGloss.demo";
import toggleButtonGlossSource from "@/components/showcase/demos/toggle-button/ToggleButtonGloss.demo.tsx?raw";
import { ToggleButtonReactionBarDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonReactionBar.demo";
import toggleButtonReactionBarSource from "@/components/showcase/demos/toggle-button/ToggleButtonReactionBar.demo.tsx?raw";
import { ToggleButtonSizesDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonSizes.demo";
import toggleButtonSizesSource from "@/components/showcase/demos/toggle-button/ToggleButtonSizes.demo.tsx?raw";
import { ToggleButtonUncontrolledDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonUncontrolled.demo";
import toggleButtonUncontrolledSource from "@/components/showcase/demos/toggle-button/ToggleButtonUncontrolled.demo.tsx?raw";
import { ToggleButtonVariantsDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonVariants.demo";
import toggleButtonVariantsSource from "@/components/showcase/demos/toggle-button/ToggleButtonVariants.demo.tsx?raw";
import { ToggleButtonViewSwitchDemo } from "@/components/showcase/demos/toggle-button/ToggleButtonViewSwitch.demo";
import toggleButtonViewSwitchSource from "@/components/showcase/demos/toggle-button/ToggleButtonViewSwitch.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ToggleButtonShowcase() {
  return (
    <ShowcasePage
      title="ToggleButton"
      description="Button with the “pressed” state: likes, bookmarks and other toggle actions."
      importPath='import { ToggleButton } from "burne-ui";'
      tags={["core", "actions"]}
    >
      <ShowcaseSection
        title="Controlled"
        description="pressed and onPressedChange — controlled mode."
      >
        <ShowcaseDemoFromFile Demo={ToggleButtonControlledDemo} source={toggleButtonControlledSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Uncontrolled"
        description="defaultPressed — initial state without external state."
      >
        <ShowcaseDemoFromFile Demo={ToggleButtonUncontrolledDemo} source={toggleButtonUncontrolledSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Options" description="variant: default, outline, ghost, gloss.">
        <ShowcaseDemoFromFile Demo={ToggleButtonVariantsDemo} source={toggleButtonVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={ToggleButtonSizesDemo} source={toggleButtonSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="Glass surface in pressed and resting state.">
        <ShowcaseDemoFromFile Demo={ToggleButtonGlossDemo} source={toggleButtonGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Full customization classNames"
        description="Slots root, fill, content, icon, label through classNames."
      >
        <ShowcaseDemoFromFile Demo={ToggleButtonClassNamesFullDemo} source={toggleButtonClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Reaction panels and view switches — state inside demo-files."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ToggleButtonReactionBarDemo} source={toggleButtonReactionBarSource} />
        <ShowcaseDemoFromFile Demo={ToggleButtonViewSwitchDemo} source={toggleButtonViewSwitchSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="pressed, defaultPressed, onPressedChange, variant, size, icon, value (in a group)."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Groups">
          <p>
            For mutually exclusive or multiple selection use{" "}
            <code>ToggleButtonGroup</code> from <code>burne-ui</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
