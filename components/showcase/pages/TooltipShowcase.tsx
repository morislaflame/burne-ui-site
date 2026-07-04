"use client";

import { TooltipFormHintDemo } from "@/components/showcase/demos/tooltip/TooltipFormHint.demo";
import tooltipFormHintSource from "@/components/showcase/demos/tooltip/TooltipFormHint.demo.tsx?raw";
import {
  TooltipClassNamesFullDemo,
  TooltipClassNamesGlossDemo,
} from "@/components/showcase/demos/tooltip/TooltipClassNamesFull.demo";
import tooltipClassNamesFullSource from "@/components/showcase/demos/tooltip/TooltipClassNamesFull.demo.tsx?raw";
import { TooltipGlossDemo } from "@/components/showcase/demos/tooltip/TooltipGloss.demo";
import tooltipGlossSource from "@/components/showcase/demos/tooltip/TooltipGloss.demo.tsx?raw";
import { TooltipIconToolbarDemo } from "@/components/showcase/demos/tooltip/TooltipIconToolbar.demo";
import tooltipIconToolbarSource from "@/components/showcase/demos/tooltip/TooltipIconToolbar.demo.tsx?raw";
import { TooltipShortcutGridDemo } from "@/components/showcase/demos/tooltip/TooltipShortcutGrid.demo";
import tooltipShortcutGridSource from "@/components/showcase/demos/tooltip/TooltipShortcutGrid.demo.tsx?raw";
import { TooltipSidesDemo } from "@/components/showcase/demos/tooltip/TooltipSides.demo";
import tooltipSidesSource from "@/components/showcase/demos/tooltip/TooltipSides.demo.tsx?raw";
import { TooltipSizesDemo } from "@/components/showcase/demos/tooltip/TooltipSizes.demo";
import tooltipSizesSource from "@/components/showcase/demos/tooltip/TooltipSizes.demo.tsx?raw";
import { TooltipVariantsDemo } from "@/components/showcase/demos/tooltip/TooltipVariants.demo";
import tooltipVariantsSource from "@/components/showcase/demos/tooltip/TooltipVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function TooltipShowcase() {
  return (
    <ShowcasePage
      title="Tooltip"
      description="Tooltips for hover and focus on the trigger."
      importPath='import { Tooltip } from "burne-ui";'
      tags={["core", "overlay"]}
    >
      <ShowcaseSection title="Options" description="Semantic variant for different contexts.">
        <ShowcaseDemoFromFile Demo={TooltipVariantsDemo} source={tooltipVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={TooltipSizesDemo} source={tooltipSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description='surface="gloss" — glass tip with hover-lift.'>
        <ShowcaseDemoFromFile Demo={TooltipGlossDemo} source={tooltipGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Accommodation" description="side: top, right, bottom, left.">
        <ShowcaseDemoFromFile Demo={TooltipSidesDemo} source={tooltipSidesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Customization classNames"
        description="Slots root (trigger), trigger, content, arrow, panel, glossContent, indicator, title and description."
      >
        <ShowcaseDemoFromFile Demo={TooltipClassNamesFullDemo} source={tooltipClassNamesFullSource} />
        <ShowcaseDemoFromFile Demo={TooltipClassNamesGlossDemo} source={tooltipClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Icon toolbar, field tooltip and hotkeys — `demos/tooltip/`."
      >
        <ShowcaseDemoFromFile Demo={TooltipIconToolbarDemo} source={tooltipIconToolbarSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TooltipFormHintDemo} source={tooltipFormHintSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TooltipShortcutGridDemo} source={tooltipShortcutGridSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
