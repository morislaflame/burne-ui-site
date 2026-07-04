"use client";

import { CloseButtonClassNamesFullDemo } from "@/components/showcase/demos/close-button/CloseButtonClassNamesFull.demo";
import closeButtonClassNamesFullSource from "@/components/showcase/demos/close-button/CloseButtonClassNamesFull.demo.tsx?raw";
import { CloseButtonFilterChipDemo } from "@/components/showcase/demos/close-button/CloseButtonFilterChip.demo";
import closeButtonFilterChipSource from "@/components/showcase/demos/close-button/CloseButtonFilterChip.demo.tsx?raw";
import { CloseButtonGlossDemo } from "@/components/showcase/demos/close-button/CloseButtonGloss.demo";
import closeButtonGlossSource from "@/components/showcase/demos/close-button/CloseButtonGloss.demo.tsx?raw";
import { CloseButtonInfoBannerDemo } from "@/components/showcase/demos/close-button/CloseButtonInfoBanner.demo";
import closeButtonInfoBannerSource from "@/components/showcase/demos/close-button/CloseButtonInfoBanner.demo.tsx?raw";
import { CloseButtonPreviewCardDemo } from "@/components/showcase/demos/close-button/CloseButtonPreviewCard.demo";
import closeButtonPreviewCardSource from "@/components/showcase/demos/close-button/CloseButtonPreviewCard.demo.tsx?raw";
import { CloseButtonSizesDemo } from "@/components/showcase/demos/close-button/CloseButtonSizes.demo";
import closeButtonSizesSource from "@/components/showcase/demos/close-button/CloseButtonSizes.demo.tsx?raw";
import { CloseButtonVariantsDemo } from "@/components/showcase/demos/close-button/CloseButtonVariants.demo";
import closeButtonVariantsSource from "@/components/showcase/demos/close-button/CloseButtonVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function CloseButtonShowcase() {
  return (
    <ShowcasePage
      title="CloseButton"
      description="Compact closure icon with surface options like Button."
      importPath='import { CloseButton } from "burne-ui";'
      tags={["core", "actions"]}
    >
      <ShowcaseSection title="Options" description="default, primary, outline, secondary, ghost, gloss.">
        <ShowcaseDemoFromFile Demo={CloseButtonVariantsDemo} source={closeButtonVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size coincides with Button: small … large.">
        <ShowcaseDemoFromFile Demo={CloseButtonSizesDemo} source={closeButtonSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="Glass surface on a dark background.">
        <ShowcaseDemoFromFile Demo={CloseButtonGlossDemo} source={closeButtonGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slot customization root, icon and ripple through classNames."
      >
        <ShowcaseDemoFromFile
          Demo={CloseButtonClassNamesFullDemo}
          source={closeButtonClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="CloseButton in real layout — demo in `demos/close-button/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={CloseButtonInfoBannerDemo} source={closeButtonInfoBannerSource} />
        <ShowcaseDemoFromFile Demo={CloseButtonPreviewCardDemo} source={closeButtonPreviewCardSource} />
        <ShowcaseDemoFromFile Demo={CloseButtonFilterChipDemo} source={closeButtonFilterChipSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
