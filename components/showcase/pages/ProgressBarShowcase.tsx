"use client";

import { ProgressBarClassNamesFullDemo } from "@/components/showcase/demos/progress-bar/ProgressBarClassNamesFull.demo";
import progressBarClassNamesFullSource from "@/components/showcase/demos/progress-bar/ProgressBarClassNamesFull.demo.tsx?raw";
import { ProgressPipelineDemo } from "@/components/showcase/demos/progress-bar/ProgressPipeline.demo";
import progressPipelineSource from "@/components/showcase/demos/progress-bar/ProgressPipeline.demo.tsx?raw";
import { ProgressHorizontalDemo } from "@/components/showcase/demos/progress-bar/ProgressHorizontal.demo";
import progressHorizontalSource from "@/components/showcase/demos/progress-bar/ProgressHorizontal.demo.tsx?raw";
import { ProgressBarSizesDemo } from "@/components/showcase/demos/progress-bar/ProgressBarSizes.demo";
import progressBarSizesSource from "@/components/showcase/demos/progress-bar/ProgressBarSizes.demo.tsx?raw";
import { ProgressUploadCardDemo } from "@/components/showcase/demos/progress-bar/ProgressUploadCard.demo";
import progressUploadCardSource from "@/components/showcase/demos/progress-bar/ProgressUploadCard.demo.tsx?raw";
import { ProgressVerticalDemo } from "@/components/showcase/demos/progress-bar/ProgressVertical.demo";
import progressVerticalSource from "@/components/showcase/demos/progress-bar/ProgressVertical.demo.tsx?raw";
import { ProgressVerticalMetersDemo } from "@/components/showcase/demos/progress-bar/ProgressVerticalMeters.demo";
import progressVerticalMetersSource from "@/components/showcase/demos/progress-bar/ProgressVerticalMeters.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ProgressBarShowcase() {
  return (
    <ShowcasePage
      title="ProgressBar"
      description="Progress indicator with definite and indefinite state."
      importPath='import { ProgressBar } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Horizontal" description="label, value, indeterminate and color.">
        <ShowcaseDemoFromFile align="stretch" Demo={ProgressHorizontalDemo} source={progressHorizontalSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={ProgressBarSizesDemo} source={progressBarSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Vertical" description="orientation=&quot;vertical&quot; with showValue.">
        <ShowcaseDemoFromFile Demo={ProgressVerticalDemo} source={progressVerticalSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots root, header, value, track, fill, indeterminateFill, hint and error — through prop classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ProgressBarClassNamesFullDemo} source={progressBarClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Download card, pipeline and vertical meters — demo-files in `demos/progress-bar/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ProgressUploadCardDemo} source={progressUploadCardSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ProgressPipelineDemo} source={progressPipelineSource} />
        <ShowcaseDemoFromFile Demo={ProgressVerticalMetersDemo} source={progressVerticalMetersSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
