"use client";

import { ListBoxClassNamesFullDemo } from "@/components/showcase/demos/listBox/ListBoxClassNamesFull.demo";
import listBoxClassNamesFullSource from "@/components/showcase/demos/listBox/ListBoxClassNamesFull.demo.tsx?raw";
import { ListBoxCommandPaletteDemo } from "@/components/showcase/demos/listBox/ListBoxCommandPalette.demo";
import listBoxCommandPaletteSource from "@/components/showcase/demos/listBox/ListBoxCommandPalette.demo.tsx?raw";
import { ListBoxCompoundDemo } from "@/components/showcase/demos/listBox/ListBoxCompound.demo";
import listBoxCompoundSource from "@/components/showcase/demos/listBox/ListBoxCompound.demo.tsx?raw";
import { ListBoxGlossDemo } from "@/components/showcase/demos/listBox/ListBoxGloss.demo";
import listBoxGlossSource from "@/components/showcase/demos/listBox/ListBoxGloss.demo.tsx?raw";
import { ListBoxPermissionsDemo } from "@/components/showcase/demos/listBox/ListBoxPermissions.demo";
import listBoxPermissionsSource from "@/components/showcase/demos/listBox/ListBoxPermissions.demo.tsx?raw";
import { ListBoxSimpleApiDemo } from "@/components/showcase/demos/listBox/ListBoxSimpleApi.demo";
import listBoxSimpleApiSource from "@/components/showcase/demos/listBox/ListBoxSimpleApi.demo.tsx?raw";
import { ListBoxSizesDemo } from "@/components/showcase/demos/listBox/ListBoxSizes.demo";
import listBoxSizesSource from "@/components/showcase/demos/listBox/ListBoxSizes.demo.tsx?raw";
import { ListBoxWorkspacePickerDemo } from "@/components/showcase/demos/listBox/ListBoxWorkspacePicker.demo";
import listBoxWorkspacePickerSource from "@/components/showcase/demos/listBox/ListBoxWorkspacePicker.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ListBoxShowcase() {
  return (
    <ShowcasePage
      title="ListBox"
      description="Selection list for embedding in panels, forms and drop-down menus."
      importPath='import { ListBox } from "burne-ui";'
      tags={["core", "selection"]}
    >
      <ShowcaseSection title="Compound" description="Sections, tips and icons for items.">
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxCompoundDemo} source={listBoxCompoundSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Simple API" description="label on Item and multiple choice.">
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxSimpleApiDemo} source={listBoxSimpleApiSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxSizesDemo} source={listBoxSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass list panel with hover-lift.">
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxGlossDemo} source={listBoxGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots root, section, header, item, label, hint and icon — through prop classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxClassNamesFullDemo} source={listBoxClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Choice workspace, access rights and command palette — `demos/listBox/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxWorkspacePickerDemo} source={listBoxWorkspacePickerSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxPermissionsDemo} source={listBoxPermissionsSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ListBoxCommandPaletteDemo} source={listBoxCommandPaletteSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Section, Header, Item, ItemIndicator, Label, Hint and Icon — full list markup."
          />
          <ShowcaseDoc.ApiRow
            api="simple"
            description="ListBox.Item with props label, hint and disabled — shortened version."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Choice">
          <p>
            Single mode - line in <code>value</code>. <code>multiple</code> — array of strings.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
