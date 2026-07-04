"use client";

import { RadioGroupContactMethodDemo } from "@/components/showcase/demos/radioGroup/RadioGroupContactMethod.demo";
import radioGroupContactMethodSource from "@/components/showcase/demos/radioGroup/RadioGroupContactMethod.demo.tsx?raw";
import { RadioClassNamesFullDemo } from "@/components/showcase/demos/radio/RadioClassNamesFull.demo";
import radioClassNamesFullSource from "@/components/showcase/demos/radio/RadioClassNamesFull.demo.tsx?raw";
import { RadioClassNamesSimpleLabelDemo } from "@/components/showcase/demos/radio/RadioClassNamesSimpleLabel.demo";
import radioClassNamesSimpleLabelSource from "@/components/showcase/demos/radio/RadioClassNamesSimpleLabel.demo.tsx?raw";
import { RadioSizesDemo } from "@/components/showcase/demos/radioGroup/RadioSizes.demo";
import radioSizesSource from "@/components/showcase/demos/radioGroup/RadioSizes.demo.tsx?raw";
import { RadioGroupCustomIndicatorDemo } from "@/components/showcase/demos/radioGroup/RadioGroupCustomIndicator.demo";
import radioGroupCustomIndicatorSource from "@/components/showcase/demos/radioGroup/RadioGroupCustomIndicator.demo.tsx?raw";
import { RadioGroupGlossDemo } from "@/components/showcase/demos/radioGroup/RadioGroupGloss.demo";
import radioGroupGlossSource from "@/components/showcase/demos/radioGroup/RadioGroupGloss.demo.tsx?raw";
import { RadioGroupHorizontalSizesDemo } from "@/components/showcase/demos/radioGroup/RadioGroupHorizontalSizes.demo";
import radioGroupHorizontalSizesSource from "@/components/showcase/demos/radioGroup/RadioGroupHorizontalSizes.demo.tsx?raw";
import { RadioGroupPlanCardsDemo } from "@/components/showcase/demos/radioGroup/RadioGroupPlanCards.demo";
import radioGroupPlanCardsSource from "@/components/showcase/demos/radioGroup/RadioGroupPlanCards.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function RadioGroupShowcase() {
  return (
    <ShowcasePage
      title="RadioGroup"
      description="A group of mutually exclusive choices with Radio inside."
      importPath='import { RadioGroup } from "@/components/composite/RadioGroup"; import { Radio } from "@/components/core/Radio";'
      tags={["composite", "forms"]}
    >
      <ShowcaseSection title="Communication method" description="RadioGroup + Radio with Legend and List.">
        <ShowcaseDemoFromFile align="stretch" Demo={RadioGroupContactMethodDemo} source={radioGroupContactMethodSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size on Radio: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={RadioSizesDemo} source={radioSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss on Radio — glass indicator.">
        <ShowcaseDemoFromFile align="stretch" Demo={RadioGroupGlossDemo} source={radioGroupGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots Radio through classNames on root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={RadioClassNamesFullDemo}
          source={radioClassNamesFullSource}
        />
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={RadioClassNamesSimpleLabelDemo}
          source={radioClassNamesSimpleLabelSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Tariff cards, horizontal list and custom indicator — `demos/radioGroup/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={RadioGroupPlanCardsDemo} source={radioGroupPlanCardsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={RadioGroupHorizontalSizesDemo} source={radioGroupHorizontalSizesSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={RadioGroupCustomIndicatorDemo} source={radioGroupCustomIndicatorSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
