"use client";

import { SelectionIndicatorGalleryDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorGallery.demo";
import selectionIndicatorGallerySource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorGallery.demo.tsx?raw";
import { SelectionIndicatorGlossDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorGloss.demo";
import selectionIndicatorGlossSource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorGloss.demo.tsx?raw";
import { SelectionIndicatorClassNamesDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorClassNames.demo";
import selectionIndicatorClassNamesSource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorClassNames.demo.tsx?raw";
import { SelectionIndicatorShapeCompareDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorShapeCompare.demo";
import selectionIndicatorShapeCompareSource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorShapeCompare.demo.tsx?raw";
import { SelectionIndicatorThumbGalleryDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorThumbGallery.demo";
import selectionIndicatorThumbGallerySource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorThumbGallery.demo.tsx?raw";
import { SelectionIndicatorVariantMixDemo } from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorVariantMix.demo";
import selectionIndicatorVariantMixSource from "@/components/showcase/demos/selectionIndicator/SelectionIndicatorVariantMix.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SelectionIndicatorShowcase() {
  return (
    <ShowcasePage
      title="SelectionIndicator"
      description="Public selection indicator primitive for Radio, Checkbox and Slider thumb."
      importPath='import { SelectionIndicator } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection
        title="Sizes and options"
        description="Public selection indicator primitive (Radio, Checkbox, Slider thumb)."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SelectionIndicatorGalleryDemo} source={selectionIndicatorGallerySource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass indicator.">
        <ShowcaseDemoFromFile align="stretch" Demo={SelectionIndicatorGlossDemo} source={selectionIndicatorGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots shell, fill and mark on SelectionIndicator."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={SelectionIndicatorClassNamesDemo}
          source={selectionIndicatorClassNamesSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Comparison of forms, grid of options and SelectionThumb — `demos/selectionIndicator/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SelectionIndicatorShapeCompareDemo} source={selectionIndicatorShapeCompareSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SelectionIndicatorVariantMixDemo} source={selectionIndicatorVariantMixSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={SelectionIndicatorThumbGalleryDemo} source={selectionIndicatorThumbGallerySource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="size, variant, selected, check on the root. Used inside Checkbox, Radio and SelectionThumb."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Related Components">
          <p>
            <code>SelectionThumb</code> and <code>SelectionThumbIcon</code> — for sliders Slider. Dimensions:{" "}
            <code>small</code>, <code>base</code>, <code>mid</code>, <code>large</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
