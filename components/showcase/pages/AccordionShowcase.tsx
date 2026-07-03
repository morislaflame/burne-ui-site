"use client";

import { AccordionCheckoutFaqDemo } from "@/components/showcase/demos/accordion/AccordionCheckoutFaq.demo";
import accordionCheckoutFaqSource from "@/components/showcase/demos/accordion/AccordionCheckoutFaq.demo.tsx?raw";
import { AccordionCompoundDemo } from "@/components/showcase/demos/accordion/AccordionCompound.demo";
import accordionCompoundSource from "@/components/showcase/demos/accordion/AccordionCompound.demo.tsx?raw";
import { AccordionSizesDemo } from "@/components/showcase/demos/accordion/AccordionSizes.demo";
import accordionSizesSource from "@/components/showcase/demos/accordion/AccordionSizes.demo.tsx?raw";
import { AccordionDocsSectionsDemo } from "@/components/showcase/demos/accordion/AccordionDocsSections.demo";
import accordionDocsSectionsSource from "@/components/showcase/demos/accordion/AccordionDocsSections.demo.tsx?raw";
import { AccordionReleaseNotesDemo } from "@/components/showcase/demos/accordion/AccordionReleaseNotes.demo";
import accordionReleaseNotesSource from "@/components/showcase/demos/accordion/AccordionReleaseNotes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function AccordionShowcase() {
  return (
    <ShowcasePage
      title="Accordion"
      description="Accordion with compound API — multiple linked drop-down sections."
      importPath='import { Accordion } from "burne-ui";'
      tags={["composite", "disclosure"]}
    >
      <ShowcaseSection title="Compound" description="Item, Heading, Trigger, Message, Panel and Indicator.">
        <ShowcaseDemoFromFile align="stretch" Demo={AccordionCompoundDemo} source={accordionCompoundSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={AccordionSizesDemo} source={accordionSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="FAQ registration, documentation sections and release notes — `demos/accordion/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={AccordionCheckoutFaqDemo} source={accordionCheckoutFaqSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={AccordionDocsSectionsDemo} source={accordionDocsSectionsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={AccordionReleaseNotesDemo} source={accordionReleaseNotesSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Accordion.Item → Heading (Trigger, Message with Content/Title/Description) → Panel (Body). Icon, Indicator — optional."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="State">
          <p>
            <code>defaultOpenIndex</code> on the root - the index of the open item when mounted. One open item
            at a time (accordion-behavior).
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization>
          <p>
            Panel opening — <code>configureMotion()</code> (<code>expandDuration</code>,{" "}
            <code>enableExpandable</code>). <code>className</code> on Item and Panel.
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
