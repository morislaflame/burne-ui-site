"use client";

import { CardAuthPanelDemo } from "@/components/showcase/demos/card/CardAuthPanel.demo";
import cardAuthPanelSource from "@/components/showcase/demos/card/CardAuthPanel.demo.tsx?raw";
import { CardClassNamesFullDemo } from "@/components/showcase/demos/card/CardClassNamesFull.demo";
import cardClassNamesFullSource from "@/components/showcase/demos/card/CardClassNamesFull.demo.tsx?raw";
import { CardGlossDemo } from "@/components/showcase/demos/card/CardGloss.demo";
import cardGlossSource from "@/components/showcase/demos/card/CardGloss.demo.tsx?raw";
import { CardMetricTilesDemo } from "@/components/showcase/demos/card/CardMetricTiles.demo";
import cardMetricTilesSource from "@/components/showcase/demos/card/CardMetricTiles.demo.tsx?raw";
import { CardPressableDemo } from "@/components/showcase/demos/card/CardPressable.demo";
import cardPressableSource from "@/components/showcase/demos/card/CardPressable.demo.tsx?raw";
import { CardPricingGridDemo } from "@/components/showcase/demos/card/CardPricingGrid.demo";
import cardPricingGridSource from "@/components/showcase/demos/card/CardPricingGrid.demo.tsx?raw";
import { CardProductSelectableDemo } from "@/components/showcase/demos/card/CardProductSelectable.demo";
import cardProductSelectableSource from "@/components/showcase/demos/card/CardProductSelectable.demo.tsx?raw";
import { CardVariantsDemo } from "@/components/showcase/demos/card/CardVariants.demo";
import cardVariantsSource from "@/components/showcase/demos/card/CardVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function CardShowcase() {
  return (
    <ShowcasePage
      title="Card"
      description="Cards for grouping content with title, description and actions."
      importPath='import { Card } from "burne-ui";'
      tags={["core", "layout"]}
    >
      <ShowcaseSection title="Options" description="default, outline and secondary.">
        <ShowcaseDemoFromFile align="stretch" Demo={CardVariantsDemo} source={cardVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Pressable" description="Clickable card with ripple and preview.">
        <ShowcaseDemoFromFile align="stretch" Demo={CardPressableDemo} source={cardPressableSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass surface with motion.">
        <ShowcaseDemoFromFile align="stretch" Demo={CardGlossDemo} source={cardGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={CardClassNamesFullDemo}
          source={cardClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Tariffs, metrics, login/registration and selected product — `demos/card/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={CardAuthPanelDemo} source={cardAuthPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={CardPricingGridDemo} source={cardPricingGridSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={CardMetricTilesDemo} source={cardMetricTilesSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={CardProductSelectableDemo} source={cardProductSelectableSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
