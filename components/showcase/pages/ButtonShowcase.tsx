"use client";

import { ButtonAsyncClickDemo } from "@/components/showcase/demos/button/ButtonAsyncClick.demo";
import buttonAsyncClickSource from "@/components/showcase/demos/button/ButtonAsyncClick.demo.tsx?raw";
import { ButtonCtaCardDemo } from "@/components/showcase/demos/button/ButtonCtaCard.demo";
import buttonCtaCardSource from "@/components/showcase/demos/button/ButtonCtaCard.demo.tsx?raw";
import { ButtonDangerBannerDemo } from "@/components/showcase/demos/button/ButtonDangerBanner.demo";
import buttonDangerBannerSource from "@/components/showcase/demos/button/ButtonDangerBanner.demo.tsx?raw";
import { ButtonFabClusterDemo } from "@/components/showcase/demos/button/ButtonFabCluster.demo";
import buttonFabClusterSource from "@/components/showcase/demos/button/ButtonFabCluster.demo.tsx?raw";
import { ButtonGlossDemo } from "@/components/showcase/demos/button/ButtonGloss.demo";
import buttonGlossSource from "@/components/showcase/demos/button/ButtonGloss.demo.tsx?raw";
import { ButtonSizesDemo } from "@/components/showcase/demos/button/ButtonSizes.demo";
import buttonSizesSource from "@/components/showcase/demos/button/ButtonSizes.demo.tsx?raw";
import { ButtonVariantsDemo } from "@/components/showcase/demos/button/ButtonVariants.demo";
import buttonVariantsSource from "@/components/showcase/demos/button/ButtonVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ButtonShowcase() {
  return (
    <ShowcasePage
      title="Button"
      description="Main action button: fill options, sizes, statuses, icons, gloss and asynchronous click."
      importPath='import { Button } from "burne-ui";'
      tags={["core", "actions"]}
    >
      <ShowcaseSection title="Options" description="variant, status, disabled, icons and built-in ripple.">
        <ShowcaseDemoFromFile Demo={ButtonVariantsDemo} source={buttonVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={ButtonSizesDemo} source={buttonSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass surface with motion and optional ripple.">
        <ShowcaseDemoFromFile Demo={ButtonGlossDemo} source={buttonGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Asynchronous click"
        description="onAsyncClick returns Promise; ripple and state loading/success/error."
      >
        <ShowcaseDemoFromFile Demo={ButtonAsyncClickDemo} source={buttonAsyncClickSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Mine layout and palette - one `.demo.tsx` for variation, code from ?raw."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ButtonCtaCardDemo} source={buttonCtaCardSource} />
        <ShowcaseDemoFromFile Demo={ButtonFabClusterDemo} source={buttonFabClusterSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ButtonDangerBannerDemo} source={buttonDangerBannerSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
