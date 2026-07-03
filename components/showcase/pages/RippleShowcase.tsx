"use client";

import { RippleColorTilesDemo } from "@/components/showcase/demos/ripple/RippleColorTiles.demo";
import rippleColorTilesSource from "@/components/showcase/demos/ripple/RippleColorTiles.demo.tsx?raw";
import { RippleColorsDemo } from "@/components/showcase/demos/ripple/RippleColors.demo";
import rippleColorsSource from "@/components/showcase/demos/ripple/RippleColors.demo.tsx?raw";
import { RippleCustomLayerDemo } from "@/components/showcase/demos/ripple/RippleCustomLayer.demo";
import rippleCustomLayerSource from "@/components/showcase/demos/ripple/RippleCustomLayer.demo.tsx?raw";
import { RipplePressableCardDemo } from "@/components/showcase/demos/ripple/RipplePressableCard.demo";
import ripplePressableCardSource from "@/components/showcase/demos/ripple/RipplePressableCard.demo.tsx?raw";
import { RipplePromoBannerDemo } from "@/components/showcase/demos/ripple/RipplePromoBanner.demo";
import ripplePromoBannerSource from "@/components/showcase/demos/ripple/RipplePromoBanner.demo.tsx?raw";
import { RippleSurfaceOutDemo } from "@/components/showcase/demos/ripple/RippleSurfaceOut.demo";
import rippleSurfaceOutSource from "@/components/showcase/demos/ripple/RippleSurfaceOut.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function RippleShowcase() {
  return (
    <ShowcasePage
      title="Ripple"
      description="Converge-ripple from the point of pressure: separate layer or inside pressable-surfaces."
      importPath='import { Ripple } from "burne-ui";'
      tags={["core", "motion"]}
    >
      <ShowcaseSection
        title="Custom layer"
        description="Ripple on top of the container; interactive element - on top of the layer (z-index)."
      >
        <ShowcaseDemoFromFile Demo={RippleCustomLayerDemo} source={rippleCustomLayerSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" description="color from RIPPLE_COLOR or arbitrary CSS-line.">
        <ShowcaseDemoFromFile Demo={RippleColorsDemo} source={rippleColorsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Pressable Card"
        description="Ripple for the entire card; click on content pops up to pressable-root."
      >
        <ShowcaseDemoFromFile Demo={RipplePressableCardDemo} source={ripplePressableCardSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Grids, banners and Surface — sources in `demos/ripple/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={RippleColorTilesDemo} source={rippleColorTilesSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={RipplePromoBannerDemo} source={ripplePromoBannerSource} />
        <ShowcaseDemoFromFile Demo={RippleSurfaceOutDemo} source={rippleSurfaceOutSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="color (key RIPPLE_COLOR or CSS), direction in|out, duration, disabled."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Contact with Button">
          <p>
            On <code>Button</code> propa enough <code>ripple</code>. For manual layer —{" "}
            <code>buttonRippleTone(variant, status)</code> from package or constant <code>RIPPLE_COLOR</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization>
          <p>
            Container with <code>overflow-hidden</code> and <code>position: relative</code>. Duration and easing —{" "}
            <code>configureMotion()</code> (<code>rippleDefaultDuration</code>, <code>rippleEaseCss</code>,{" "}
            <code>enableRipple</code>). Button tone — <code>buttonRippleTone</code> from the package.
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
