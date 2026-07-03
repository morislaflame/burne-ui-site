"use client";

import { SelectClassNamesFullDemo } from "@/components/showcase/demos/select/SelectClassNamesFull.demo";
import selectClassNamesFullSource from "@/components/showcase/demos/select/SelectClassNamesFull.demo.tsx?raw";
import { SelectCompoundDemo } from "@/components/showcase/demos/select/SelectCompound.demo";
import selectCompoundSource from "@/components/showcase/demos/select/SelectCompound.demo.tsx?raw";
import { SelectDefaultDemo } from "@/components/showcase/demos/select/SelectDefault.demo";
import selectDefaultSource from "@/components/showcase/demos/select/SelectDefault.demo.tsx?raw";
import { SelectGlossDemo } from "@/components/showcase/demos/select/SelectGloss.demo";
import selectGlossSource from "@/components/showcase/demos/select/SelectGloss.demo.tsx?raw";
import { SelectSizesDemo } from "@/components/showcase/demos/select/SelectSizes.demo";
import selectSizesSource from "@/components/showcase/demos/select/SelectSizes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function SelectShowcase() {
  return (
    <ShowcasePage
      title="Select"
      description="Drop-down list without search - select one value from options."
      importPath='import { Select } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Default" description="options, value and onValueChange — controlled mode.">
        <ShowcaseDemoFromFile align="center" Demo={SelectDefaultDemo} source={selectDefaultSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Compound" description="Label, TriggerGroup, Value, Trigger, Popover.">
        <ShowcaseDemoFromFile align="center" Demo={SelectCompoundDemo} source={selectCompoundSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="center" Demo={SelectSizesDemo} source={selectSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass shell.">
        <ShowcaseDemoFromFile align="center" Demo={SelectGlossDemo} source={selectGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection title="classNames" description="Slot customization triggerGroup, value, popover and listBox.">
        <ShowcaseDemoFromFile
          align="center"
          Demo={SelectClassNamesFullDemo}
          source={selectClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="options: { value, label }[], value, onValueChange, label, hint, variant."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="TriggerGroup, Value, Trigger, Popover, Hint, Error + classNames."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
