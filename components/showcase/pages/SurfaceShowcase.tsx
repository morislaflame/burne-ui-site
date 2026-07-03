"use client";

import { SurfaceDashboardWidgetDemo } from "@/components/showcase/demos/surface/SurfaceDashboardWidget.demo";
import surfaceDashboardWidgetSource from "@/components/showcase/demos/surface/SurfaceDashboardWidget.demo.tsx?raw";
import { SurfaceGlassStackDemo } from "@/components/showcase/demos/surface/SurfaceGlassStack.demo";
import surfaceGlassStackSource from "@/components/showcase/demos/surface/SurfaceGlassStack.demo.tsx?raw";
import { SurfaceGlossDemo } from "@/components/showcase/demos/surface/SurfaceGloss.demo";
import surfaceGlossSource from "@/components/showcase/demos/surface/SurfaceGloss.demo.tsx?raw";
import { SurfaceNestedPanelsDemo } from "@/components/showcase/demos/surface/SurfaceNestedPanels.demo";
import surfaceNestedPanelsSource from "@/components/showcase/demos/surface/SurfaceNestedPanels.demo.tsx?raw";
import { SurfaceVariantsDemo } from "@/components/showcase/demos/surface/SurfaceVariants.demo";
import surfaceVariantsSource from "@/components/showcase/demos/surface/SurfaceVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SurfaceShowcase() {
  return (
    <ShowcasePage
      title="Surface"
      description="Background surfaces for grouping content with customizable padding."
      importPath='import { Surface } from "burne-ui";'
      tags={["core", "layout"]}
    >
      <ShowcaseSection title="Options" description="default, secondary and tertiary.">
        <ShowcaseDemoFromFile Demo={SurfaceVariantsDemo} source={surfaceVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass surface with motion.">
        <ShowcaseDemoFromFile Demo={SurfaceGlossDemo} source={surfaceGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Nested panels, dashboard widget and gloss-stack — `demos/surface/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={SurfaceNestedPanelsDemo} source={surfaceNestedPanelsSource} />
        <ShowcaseDemoFromFile Demo={SurfaceDashboardWidgetDemo} source={surfaceDashboardWidgetSource} />
        <ShowcaseDemoFromFile Demo={SurfaceGlassStackDemo} source={surfaceGlassStackSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="variant and padding on the root - the main way to set the background and padding of the container."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Padding">
          <p>
            <code>mid</code>, <code>plus</code>, <code>large</code> — preset padding inside Surface.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
