"use client";

import { LoadingCardOverlayDemo } from "@/components/showcase/demos/loading/LoadingCardOverlay.demo";
import loadingCardOverlaySource from "@/components/showcase/demos/loading/LoadingCardOverlay.demo.tsx?raw";
import { LoadingColorGridDemo } from "@/components/showcase/demos/loading/LoadingColorGrid.demo";
import loadingColorGridSource from "@/components/showcase/demos/loading/LoadingColorGrid.demo.tsx?raw";
import { LoadingDotsWaveDemo } from "@/components/showcase/demos/loading/LoadingDotsWave.demo";
import loadingDotsWaveSource from "@/components/showcase/demos/loading/LoadingDotsWave.demo.tsx?raw";
import { LoadingInlineStatusDemo } from "@/components/showcase/demos/loading/LoadingInlineStatus.demo";
import loadingInlineStatusSource from "@/components/showcase/demos/loading/LoadingInlineStatus.demo.tsx?raw";
import { LoadingSizesColorsDemo } from "@/components/showcase/demos/loading/LoadingSizesColors.demo";
import loadingSizesColorsSource from "@/components/showcase/demos/loading/LoadingSizesColors.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function LoadingShowcase() {
  return (
    <ShowcasePage
      title="Loading"
      description="Loading indicator: spinner and jumping dots (GSAP)."
      importPath='import { Loading } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Sizes and colors" description="spinner: size and color on the root.">
        <ShowcaseDemoFromFile Demo={LoadingSizesColorsDemo} source={loadingSizesColorsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Jumping dots"
        description='variant="dots" — wave 1 → 2 → 3. Speed: configureMotion() (loadingDotsDuration, enableLoadingDots). Slider in panel Motion.'
      >
        <ShowcaseDemoFromFile Demo={LoadingDotsWaveDemo} source={loadingDotsWaveSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Overlay on the card, inline-status and color grid — demo-files in `demos/loading/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingCardOverlayDemo} source={loadingCardOverlaySource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingInlineStatusDemo} source={loadingInlineStatusSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingColorGridDemo} source={loadingColorGridSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
