"use client";

import { ColorPickerClassNamesFullDemo } from "@/components/showcase/demos/colorPicker/ColorPickerClassNamesFull.demo";
import colorPickerClassNamesFullSource from "@/components/showcase/demos/colorPicker/ColorPickerClassNamesFull.demo.tsx?raw";
import { ColorPickerAlphaChannelDemo } from "@/components/showcase/demos/colorPicker/ColorPickerAlphaChannel.demo";
import colorPickerAlphaChannelSource from "@/components/showcase/demos/colorPicker/ColorPickerAlphaChannel.demo.tsx?raw";
import { ColorPickerBasicDemo } from "@/components/showcase/demos/colorPicker/ColorPickerBasic.demo";
import colorPickerBasicSource from "@/components/showcase/demos/colorPicker/ColorPickerBasic.demo.tsx?raw";
import { ColorPickerCompoundContentDemo } from "@/components/showcase/demos/colorPicker/ColorPickerCompoundContent.demo";
import colorPickerCompoundContentSource from "@/components/showcase/demos/colorPicker/ColorPickerCompoundContent.demo.tsx?raw";
import { ColorPickerCustomTriggerDemo } from "@/components/showcase/demos/colorPicker/ColorPickerCustomTrigger.demo";
import colorPickerCustomTriggerSource from "@/components/showcase/demos/colorPicker/ColorPickerCustomTrigger.demo.tsx?raw";
import { ColorPickerSizesDemo } from "@/components/showcase/demos/colorPicker/ColorPickerSizes.demo";
import colorPickerSizesSource from "@/components/showcase/demos/colorPicker/ColorPickerSizes.demo.tsx?raw";
import { ColorPickerBrandPaletteDemo } from "@/components/showcase/demos/colorPicker/ColorPickerBrandPalette.demo";
import colorPickerBrandPaletteSource from "@/components/showcase/demos/colorPicker/ColorPickerBrandPalette.demo.tsx?raw";
import { ColorPickerGlossDemo } from "@/components/showcase/demos/colorPicker/ColorPickerGloss.demo";
import colorPickerGlossSource from "@/components/showcase/demos/colorPicker/ColorPickerGloss.demo.tsx?raw";
import { ColorPickerSettingsRowDemo } from "@/components/showcase/demos/colorPicker/ColorPickerSettingsRow.demo";
import colorPickerSettingsRowSource from "@/components/showcase/demos/colorPicker/ColorPickerSettingsRow.demo.tsx?raw";
import { ColorPickerSidesDemo } from "@/components/showcase/demos/colorPicker/ColorPickerSides.demo";
import colorPickerSidesSource from "@/components/showcase/demos/colorPicker/ColorPickerSides.demo.tsx?raw";
import { ColorSlidersDemo } from "@/components/showcase/demos/colorPicker/ColorSliders.demo";
import colorSlidersSource from "@/components/showcase/demos/colorPicker/ColorSliders.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ColorPickerShowcase() {
  return (
    <ShowcasePage
      title="ColorPicker"
      description="Color selection via popover and separate channel sliders."
      importPath='import { ColorPicker, ColorSwatch } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="ColorPicker" description="Trigger + Content — compound popover.">
        <ShowcaseDemoFromFile Demo={ColorPickerBasicDemo} source={colorPickerBasicSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Compound Content"
        description="Content children: Area, HexInput, Presets — custom panel layout."
      >
        <ShowcaseDemoFromFile
          Demo={ColorPickerCompoundContentDemo}
          source={colorPickerCompoundContentSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Trigger"
        description="Trigger children + asChild for a custom opener."
      >
        <ShowcaseDemoFromFile
          Demo={ColorPickerCustomTriggerDemo}
          source={colorPickerCustomTriggerSource}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid.">
        <ShowcaseDemoFromFile Demo={ColorPickerSizesDemo} source={colorPickerSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="ColorSlider" description="Individual sliders Hue and Saturation.">
        <ShowcaseDemoFromFile align="stretch" Demo={ColorSlidersDemo} source={colorSlidersSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass trigger and panel.">
        <ShowcaseDemoFromFile Demo={ColorPickerGlossDemo} source={colorPickerGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Customization of panel slots via classNames on root (incl. slidersStack)."
      >
        <ShowcaseDemoFromFile
          Demo={ColorPickerClassNamesFullDemo}
          source={colorPickerClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Accommodation" description="side: top, right, bottom, left.">
        <ShowcaseDemoFromFile Demo={ColorPickerSidesDemo} source={colorPickerSidesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Brand palette, alpha channel and settings bar — `demos/colorPicker/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ColorPickerBrandPaletteDemo} source={colorPickerBrandPaletteSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ColorPickerAlphaChannelDemo} source={colorPickerAlphaChannelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ColorPickerSettingsRowDemo} source={colorPickerSettingsRowSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Trigger, Content, Area, HexInput, AlphaInput, Presets. ColorSlider and ColorSwatch — primitives."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="content, contentPanel, trigger, area, slidersRow, slidersStack, hexInput, presets…"
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Format">
          <p>
            Meaning — hex-line (<code>#rrggbb</code>). <code>hsvaToHex</code> to convert from HSVA.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
