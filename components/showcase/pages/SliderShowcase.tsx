"use client";

import { SliderBudgetPanelDemo } from "@/components/showcase/demos/slider/SliderBudgetPanel.demo";
import sliderBudgetPanelSource from "@/components/showcase/demos/slider/SliderBudgetPanel.demo.tsx?raw";
import { SliderClassNamesFullDemo } from "@/components/showcase/demos/slider/SliderClassNamesFull.demo";
import sliderClassNamesFullSource from "@/components/showcase/demos/slider/SliderClassNamesFull.demo.tsx?raw";
import { SliderGlossDemo } from "@/components/showcase/demos/slider/SliderGloss.demo";
import sliderGlossSource from "@/components/showcase/demos/slider/SliderGloss.demo.tsx?raw";
import { SliderOpacityStripDemo } from "@/components/showcase/demos/slider/SliderOpacityStrip.demo";
import sliderOpacityStripSource from "@/components/showcase/demos/slider/SliderOpacityStrip.demo.tsx?raw";
import { SliderPriceRangeDemo } from "@/components/showcase/demos/slider/SliderPriceRange.demo";
import sliderPriceRangeSource from "@/components/showcase/demos/slider/SliderPriceRange.demo.tsx?raw";
import { SliderSizesDemo } from "@/components/showcase/demos/slider/SliderSizes.demo";
import sliderSizesSource from "@/components/showcase/demos/slider/SliderSizes.demo.tsx?raw";
import { SliderThumbShapeDemo } from "@/components/showcase/demos/slider/SliderThumbShape.demo";
import sliderThumbShapeSource from "@/components/showcase/demos/slider/SliderThumbShape.demo.tsx?raw";
import { SliderVariantsDemo } from "@/components/showcase/demos/slider/SliderVariants.demo";
import sliderVariantsSource from "@/components/showcase/demos/slider/SliderVariants.demo.tsx?raw";
import { SliderVolumeCardDemo } from "@/components/showcase/demos/slider/SliderVolumeCard.demo";
import sliderVolumeCardSource from "@/components/showcase/demos/slider/SliderVolumeCard.demo.tsx?raw";
import { SliderVolumeDemo } from "@/components/showcase/demos/slider/SliderVolume.demo";
import sliderVolumeSource from "@/components/showcase/demos/slider/SliderVolume.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SliderShowcase() {
  return (
    <ShowcasePage
      title="Slider"
      description="Slider for a single value or range with labels and formatting."
      importPath='import { Slider } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Single" description="showValue and marks for scale with labels.">
        <ShowcaseDemoFromFile align="center" Demo={SliderVolumeDemo} source={sliderVolumeSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="center" Demo={SliderSizesDemo} source={sliderSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Range" description="range + formatValue for two sliders.">
        <ShowcaseDemoFromFile align="center" Demo={SliderPriceRangeDemo} source={sliderPriceRangeSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Disabled and vertical" description="orientation vertical and disabled state.">
        <ShowcaseDemoFromFile align="center" Demo={SliderVariantsDemo} source={sliderVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="gloss — glass circle on rail (prop gloss on the root).">
        <ShowcaseDemoFromFile align="center" Demo={SliderGlossDemo} source={sliderGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={SliderClassNamesFullDemo}
          source={sliderClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Form thumb, compound Track and gradient range — demo-files in `demos/slider/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SliderThumbShapeDemo} source={sliderThumbShapeSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SliderVolumeCardDemo} source={sliderVolumeCardSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SliderBudgetPanelDemo} source={sliderBudgetPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SliderOpacityStripDemo} source={sliderOpacityStripSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
