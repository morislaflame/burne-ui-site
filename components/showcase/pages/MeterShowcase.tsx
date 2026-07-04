"use client";

import { MeterClassNamesFullDemo } from "@/components/showcase/demos/meter/MeterClassNamesFull.demo";
import meterClassNamesFullSource from "@/components/showcase/demos/meter/MeterClassNamesFull.demo.tsx?raw";
import { MeterHorizontalDemo } from "@/components/showcase/demos/meter/MeterHorizontal.demo";
import meterHorizontalSource from "@/components/showcase/demos/meter/MeterHorizontal.demo.tsx?raw";
import { MeterSizesDemo } from "@/components/showcase/demos/meter/MeterSizes.demo";
import meterSizesSource from "@/components/showcase/demos/meter/MeterSizes.demo.tsx?raw";
import { MeterQuotaBannerDemo } from "@/components/showcase/demos/meter/MeterQuotaBanner.demo";
import meterQuotaBannerSource from "@/components/showcase/demos/meter/MeterQuotaBanner.demo.tsx?raw";
import { MeterStorageGridDemo } from "@/components/showcase/demos/meter/MeterStorageGrid.demo";
import meterStorageGridSource from "@/components/showcase/demos/meter/MeterStorageGrid.demo.tsx?raw";
import { MeterVerticalDemo } from "@/components/showcase/demos/meter/MeterVertical.demo";
import meterVerticalSource from "@/components/showcase/demos/meter/MeterVertical.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function MeterShowcase() {
  return (
    <ShowcasePage
      title="Meter"
      description="Occupancy meter with min, max and displaying the value."
      importPath='import { Meter } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Horizontal" description="label, value, showValue and color.">
        <ShowcaseDemoFromFile align="stretch" Demo={MeterHorizontalDemo} source={meterHorizontalSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={MeterSizesDemo} source={meterSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Vertical" description="orientation=&quot;vertical&quot;.">
        <ShowcaseDemoFromFile Demo={MeterVerticalDemo} source={meterVerticalSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots root, header, value, track, fill, hint and error — through prop classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={MeterClassNamesFullDemo} source={meterClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Metrics grid and quota banner — demo-files in `demos/meter/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={MeterStorageGridDemo} source={meterStorageGridSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={MeterQuotaBannerDemo} source={meterQuotaBannerSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
