"use client";

import { ExpandableClassNamesFullDemo } from "@/components/showcase/demos/expandable/ExpandableClassNamesFull.demo";
import expandableClassNamesFullSource from "@/components/showcase/demos/expandable/ExpandableClassNamesFull.demo.tsx?raw";
import { ExpandableCompoundDemo } from "@/components/showcase/demos/expandable/ExpandableCompound.demo";
import expandableCompoundSource from "@/components/showcase/demos/expandable/ExpandableCompound.demo.tsx?raw";
import { ExpandableGlossDemo } from "@/components/showcase/demos/expandable/ExpandableGloss.demo";
import expandableGlossSource from "@/components/showcase/demos/expandable/ExpandableGloss.demo.tsx?raw";
import { ExpandableOrderDetailsDemo } from "@/components/showcase/demos/expandable/ExpandableOrderDetails.demo";
import expandableOrderDetailsSource from "@/components/showcase/demos/expandable/ExpandableOrderDetails.demo.tsx?raw";
import { ExpandableSettingsStackDemo } from "@/components/showcase/demos/expandable/ExpandableSettingsStack.demo";
import expandableSettingsStackSource from "@/components/showcase/demos/expandable/ExpandableSettingsStack.demo.tsx?raw";
import { ExpandableShippingCompoundDemo } from "@/components/showcase/demos/expandable/ExpandableShippingCompound.demo";
import expandableShippingCompoundSource from "@/components/showcase/demos/expandable/ExpandableShippingCompound.demo.tsx?raw";
import { ExpandableSimpleApiDemo } from "@/components/showcase/demos/expandable/ExpandableSimpleApi.demo";
import expandableSimpleApiSource from "@/components/showcase/demos/expandable/ExpandableSimpleApi.demo.tsx?raw";
import { ExpandableSizesDemo } from "@/components/showcase/demos/expandable/ExpandableSizes.demo";
import expandableSizesSource from "@/components/showcase/demos/expandable/ExpandableSizes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ExpandableShowcase() {
  return (
    <ShowcasePage
      title="Expandable"
      description="Drop-down panels with title, icon and description."
      importPath='import { Expandable } from "burne-ui";'
      tags={["core", "disclosure"]}
    >
      <ShowcaseSection title="Simple API" description="title, icon and description on the root.">
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableSimpleApiDemo} source={expandableSimpleApiSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableSizesDemo} source={expandableSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass panel with hover-lift.">
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableGlossDemo} source={expandableGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Compound API" description="Trigger, Message, Icon, Title, Description and Panel.">
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableCompoundDemo} source={expandableCompoundSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on Root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={ExpandableClassNamesFullDemo}
          source={expandableClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Settings stack, compound delivery and order details — `demos/expandable/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableSettingsStackDemo} source={expandableSettingsStackSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableShippingCompoundDemo} source={expandableShippingCompoundSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ExpandableOrderDetailsDemo} source={expandableOrderDetailsSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
