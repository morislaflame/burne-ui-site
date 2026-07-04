"use client";

import { DropdownClassNamesFullDemo } from "@/components/showcase/demos/dropdown/DropdownClassNamesFull.demo";
import dropdownClassNamesFullSource from "@/components/showcase/demos/dropdown/DropdownClassNamesFull.demo.tsx?raw";
import { DropdownActionMenuDemo } from "@/components/showcase/demos/dropdown/DropdownActionMenu.demo";
import dropdownActionMenuSource from "@/components/showcase/demos/dropdown/DropdownActionMenu.demo.tsx?raw";
import { DropdownGlossDemo } from "@/components/showcase/demos/dropdown/DropdownGloss.demo";
import dropdownGlossSource from "@/components/showcase/demos/dropdown/DropdownGloss.demo.tsx?raw";
import { DropdownMultipleDemo } from "@/components/showcase/demos/dropdown/DropdownMultiple.demo";
import dropdownMultipleSource from "@/components/showcase/demos/dropdown/DropdownMultiple.demo.tsx?raw";
import { DropdownSingleSelectDemo } from "@/components/showcase/demos/dropdown/DropdownSingleSelect.demo";
import dropdownSingleSelectSource from "@/components/showcase/demos/dropdown/DropdownSingleSelect.demo.tsx?raw";
import { DropdownStatusPickerDemo } from "@/components/showcase/demos/dropdown/DropdownStatusPicker.demo";
import dropdownStatusPickerSource from "@/components/showcase/demos/dropdown/DropdownStatusPicker.demo.tsx?raw";
import { DropdownUserMenuDemo } from "@/components/showcase/demos/dropdown/DropdownUserMenu.demo";
import dropdownUserMenuSource from "@/components/showcase/demos/dropdown/DropdownUserMenu.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function DropdownShowcase() {
  return (
    <ShowcasePage
      title="Dropdown"
      description="Dropdown menu with single and multiple selection of values."
      importPath='import { Dropdown } from "burne-ui";'
      tags={["core", "overlay"]}
    >
      <ShowcaseSection title="Single selection" description="selectionIndicator and grouping of items.">
        <ShowcaseDemoFromFile Demo={DropdownSingleSelectDemo} source={dropdownSingleSelectSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Multi-select" description="multiple and array defaultValue.">
        <ShowcaseDemoFromFile Demo={DropdownMultipleDemo} source={dropdownMultipleSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description='popoverVariant="gloss" — glass drop down menu.'>
        <ShowcaseDemoFromFile Demo={DropdownGlossDemo} source={dropdownGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on Root."
      >
        <ShowcaseDemoFromFile
          Demo={DropdownClassNamesFullDemo}
          source={dropdownClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Account menu, line actions and status selection — `demos/dropdown/`."
      >
        <ShowcaseDemoFromFile Demo={DropdownUserMenuDemo} source={dropdownUserMenuSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={DropdownActionMenuDemo} source={dropdownActionMenuSource} />
        <ShowcaseDemoFromFile Demo={DropdownStatusPickerDemo} source={dropdownStatusPickerSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
