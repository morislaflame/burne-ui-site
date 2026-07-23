"use client";

import { LoadingCardOverlayDemo } from "@/components/showcase/demos/loading/LoadingCardOverlay.demo";
import loadingCardOverlaySource from "@/components/showcase/demos/loading/LoadingCardOverlay.demo.tsx?raw";
import { LoadingClassNamesFullDemo } from "@/components/showcase/demos/loading/LoadingClassNamesFull.demo";
import loadingClassNamesFullSource from "@/components/showcase/demos/loading/LoadingClassNamesFull.demo.tsx?raw";
import { LoadingColorGridDemo } from "@/components/showcase/demos/loading/LoadingColorGrid.demo";
import loadingColorGridSource from "@/components/showcase/demos/loading/LoadingColorGrid.demo.tsx?raw";
import { LoadingDotsWaveDemo } from "@/components/showcase/demos/loading/LoadingDotsWave.demo";
import loadingDotsWaveSource from "@/components/showcase/demos/loading/LoadingDotsWave.demo.tsx?raw";
import { LoadingInlineStatusDemo } from "@/components/showcase/demos/loading/LoadingInlineStatus.demo";
import loadingInlineStatusSource from "@/components/showcase/demos/loading/LoadingInlineStatus.demo.tsx?raw";
import { LoadingSizesColorsDemo } from "@/components/showcase/demos/loading/LoadingSizesColors.demo";
import loadingSizesColorsSource from "@/components/showcase/demos/loading/LoadingSizesColors.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
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
        description='type="dots" — wave 1 → 2 → 3. Speed: configureMotion() (loadingDotsDuration, enableLoadingDots). Slider in panel Motion.'
      >
        <ShowcaseDemoFromFile Demo={LoadingDotsWaveDemo} source={loadingDotsWaveSource} />
      </ShowcaseSection>

      <ShowcaseSection title="classNames" description="Slots root, spinner, dots, dot via classNames.">
        <ShowcaseDemoFromFile Demo={LoadingClassNamesFullDemo} source={loadingClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Overlay on the card, inline-status and color grid — demo-files in `demos/loading/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingCardOverlayDemo} source={loadingCardOverlaySource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingInlineStatusDemo} source={loadingInlineStatusSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LoadingColorGridDemo} source={loadingColorGridSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="variant spinner | dots, size, color on the root."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization>
          <p>
            Colors: <code>primary</code>, <code>success</code>, <code>muted</code> etc. Dimensions:{" "}
            <code>small</code>, <code>base</code>, <code>mid</code>, <code>large</code>. Points:{" "}
            <code>loadingDotsDuration</code> (full jump, wave step = duration / 3),{" "}
            <code>loadingDotsEaseUp</code>, <code>loadingDotsEaseDown</code>,{" "}
            <code>enableLoadingDots</code>.
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
