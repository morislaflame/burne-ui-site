"use client";

import { InputAuthPanelDemo } from "@/components/showcase/demos/input/InputAuthPanel.demo";
import inputAuthPanelSource from "@/components/showcase/demos/input/InputAuthPanel.demo.tsx?raw";
import { InputClassNamesCompoundDemo, InputClassNamesFullDemo } from "@/components/showcase/demos/input/InputClassNamesFull.demo";
import inputClassNamesFullSource from "@/components/showcase/demos/input/InputClassNamesFull.demo.tsx?raw";
import { LabelClassNamesFullDemo } from "@/components/showcase/demos/label/LabelClassNamesFull.demo";
import labelClassNamesFullSource from "@/components/showcase/demos/label/LabelClassNamesFull.demo.tsx?raw";
import { InputCompoundDemo } from "@/components/showcase/demos/input/InputCompound.demo";
import inputCompoundSource from "@/components/showcase/demos/input/InputCompound.demo.tsx?raw";
import { InputGlossDemo } from "@/components/showcase/demos/input/InputGloss.demo";
import inputGlossSource from "@/components/showcase/demos/input/InputGloss.demo.tsx?raw";
import { InputInlinePairDemo } from "@/components/showcase/demos/input/InputInlinePair.demo";
import inputInlinePairSource from "@/components/showcase/demos/input/InputInlinePair.demo.tsx?raw";
import { InputStatusesDemo } from "@/components/showcase/demos/input/InputStatuses.demo";
import inputStatusesSource from "@/components/showcase/demos/input/InputStatuses.demo.tsx?raw";
import { InputUrlAffixesDemo } from "@/components/showcase/demos/input/InputUrlAffixes.demo";
import inputUrlAffixesSource from "@/components/showcase/demos/input/InputUrlAffixes.demo.tsx?raw";
import { InputSizesDemo } from "@/components/showcase/demos/input/InputSizes.demo";
import inputSizesSource from "@/components/showcase/demos/input/InputSizes.demo.tsx?raw";
import { InputVariantsDemo } from "@/components/showcase/demos/input/InputVariants.demo";
import inputVariantsSource from "@/components/showcase/demos/input/InputVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function InputShowcase() {
  return (
    <ShowcasePage
      title="Input"
      description="Text field with Simple and Compound API — label, hint and error on the root or through slots."
      importPath='import { Input } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Options" description="default and variant outline — alternative field shells.">
        <ShowcaseDemoFromFile align="center" Demo={InputVariantsDemo} source={inputVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="center" Demo={InputSizesDemo} source={inputSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Statuses" description="status changes the color of the stroke and error text.">
        <ShowcaseDemoFromFile align="center" Demo={InputStatusesDemo} source={inputStatusesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Compound API" description="Input.Label, Input.Control, Input.Hint — explicit markup.">
        <ShowcaseDemoFromFile align="center" Demo={InputCompoundDemo} source={inputCompoundSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots root, shell, control, prefix, suffix, hint and error — through prop classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={InputClassNamesFullDemo} source={inputClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={InputClassNamesCompoundDemo} source={inputClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={LabelClassNamesFullDemo} source={labelClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass shell with motion.">
        <ShowcaseDemoFromFile align="center" Demo={InputGlossDemo} source={inputGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Affixes, auth-panel and inline-pair — demo-files in `demos/input/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={InputUrlAffixesDemo} source={inputUrlAffixesSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={InputAuthPanelDemo} source={inputAuthPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={InputInlinePairDemo} source={inputInlinePairSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="label, hint, error, placeholder, variant and status — props on the root Input."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Input.Label, Input.Control, Input.Hint, Input.Error — for custom markup."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Options">
          <p>
            <code>variant</code>: default, gloss, outline. <code>status</code>: default, danger, success,
            warning. Field tips — prop <code>hint</code>, not <code>description</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
