"use client";

import { FormInlineSubscribeDemo } from "@/components/showcase/demos/form/FormInlineSubscribe.demo";
import formInlineSubscribeSource from "@/components/showcase/demos/form/FormInlineSubscribe.demo.tsx?raw";
import { FormLoginPanelDemo } from "@/components/showcase/demos/form/FormLoginPanel.demo";
import formLoginPanelSource from "@/components/showcase/demos/form/FormLoginPanel.demo.tsx?raw";
import { FormMinimalSubscribeDemo } from "@/components/showcase/demos/form/FormMinimalSubscribe.demo";
import formMinimalSubscribeSource from "@/components/showcase/demos/form/FormMinimalSubscribe.demo.tsx?raw";
import { FormProfileDemo } from "@/components/showcase/demos/form/FormProfile.demo";
import formProfileSource from "@/components/showcase/demos/form/FormProfile.demo.tsx?raw";
import { FormSearchToolbarDemo } from "@/components/showcase/demos/form/FormSearchToolbar.demo";
import formSearchToolbarSource from "@/components/showcase/demos/form/FormSearchToolbar.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function FormShowcase() {
  return (
    <ShowcasePage
      title="Form"
      description="Form wrapper with native submission and availability for field groups."
      importPath='import { Form } from "burne-ui";'
      tags={["composite", "forms"]}
    >
      <ShowcaseSection
        title="Profile"
        description="Form.Section groups fields; CheckboxGroup — in a separate section with a large indentation."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={FormProfileDemo} source={formProfileSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Minimal form"
        description="Form accepts onSubmit and aria-label; action buttons are placed inside the form."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={FormMinimalSubscribeDemo} source={formMinimalSubscribeSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Inline-subscription, login panel and search toolbar — demo-files in `demos/form/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={FormInlineSubscribeDemo} source={formInlineSubscribeSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={FormLoginPanelDemo} source={formLoginPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={FormSearchToolbarDemo} source={formSearchToolbarSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
