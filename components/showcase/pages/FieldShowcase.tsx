"use client";

import { FieldAddressSetDemo } from "@/components/showcase/demos/field/FieldAddressSet.demo";
import fieldAddressSetSource from "@/components/showcase/demos/field/FieldAddressSet.demo.tsx?raw";
import {
  FieldClassNamesFullDemo,
  FieldSetClassNamesFullDemo,
} from "@/components/showcase/demos/field/FieldClassNamesFull.demo";
import fieldClassNamesFullSource from "@/components/showcase/demos/field/FieldClassNamesFull.demo.tsx?raw";
import { FieldBillingSetDemo } from "@/components/showcase/demos/field/FieldBillingSet.demo";
import fieldBillingSetSource from "@/components/showcase/demos/field/FieldBillingSet.demo.tsx?raw";
import { FieldContactSetDemo } from "@/components/showcase/demos/field/FieldContactSet.demo";
import fieldContactSetSource from "@/components/showcase/demos/field/FieldContactSet.demo.tsx?raw";
import { FieldHorizontalPairDemo } from "@/components/showcase/demos/field/FieldHorizontalPair.demo";
import fieldHorizontalPairSource from "@/components/showcase/demos/field/FieldHorizontalPair.demo.tsx?raw";
import { FieldSettingsPanelDemo } from "@/components/showcase/demos/field/FieldSettingsPanel.demo";
import fieldSettingsPanelSource from "@/components/showcase/demos/field/FieldSettingsPanel.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function FieldShowcase() {
  return (
    <ShowcasePage
      title="Field"
      description="Low-level form field primitives: legend, group, tips and actions."
      importPath='import { Field } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Field.Set" description="Compound API for a set of related fields.">
        <ShowcaseDemoFromFile align="stretch" Demo={FieldContactSetDemo} source={fieldContactSetSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Legend and Hint" description="Field.LegendHeader combines title and tooltip.">
        <ShowcaseDemoFromFile align="stretch" Demo={FieldAddressSetDemo} source={fieldAddressSetSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Field.Root and Field.Set — slot customization via classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={FieldClassNamesFullDemo} source={fieldClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={FieldSetClassNamesFullDemo} source={fieldClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Billing fieldset, horizontal pair of dates and settings panel — demo-files in `demos/field/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={FieldBillingSetDemo} source={fieldBillingSetSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={FieldHorizontalPairDemo} source={fieldHorizontalPairSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={FieldSettingsPanelDemo} source={fieldSettingsPanelSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
