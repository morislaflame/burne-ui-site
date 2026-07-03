"use client";

import { TabsClassNamesFullDemo } from "@/components/showcase/demos/tabs/TabsClassNamesFull.demo";
import tabsClassNamesFullSource from "@/components/showcase/demos/tabs/TabsClassNamesFull.demo.tsx?raw";
import { TabsDashboardShellDemo } from "@/components/showcase/demos/tabs/TabsDashboardShell.demo";
import tabsDashboardShellSource from "@/components/showcase/demos/tabs/TabsDashboardShell.demo.tsx?raw";
import { TabsDefaultDemo } from "@/components/showcase/demos/tabs/TabsDefault.demo";
import tabsDefaultSource from "@/components/showcase/demos/tabs/TabsDefault.demo.tsx?raw";
import { TabsSizesDemo } from "@/components/showcase/demos/tabs/TabsSizes.demo";
import tabsSizesSource from "@/components/showcase/demos/tabs/TabsSizes.demo.tsx?raw";
import { TabsGlossDemo } from "@/components/showcase/demos/tabs/TabsGloss.demo";
import tabsGlossSource from "@/components/showcase/demos/tabs/TabsGloss.demo.tsx?raw";
import { TabsOutlineDemo } from "@/components/showcase/demos/tabs/TabsOutline.demo";
import tabsOutlineSource from "@/components/showcase/demos/tabs/TabsOutline.demo.tsx?raw";
import { TabsSecondaryDemo } from "@/components/showcase/demos/tabs/TabsSecondary.demo";
import tabsSecondarySource from "@/components/showcase/demos/tabs/TabsSecondary.demo.tsx?raw";
import { TabsSettingsPanelDemo } from "@/components/showcase/demos/tabs/TabsSettingsPanel.demo";
import tabsSettingsPanelSource from "@/components/showcase/demos/tabs/TabsSettingsPanel.demo.tsx?raw";
import { TabsVerticalSidebarDemo } from "@/components/showcase/demos/tabs/TabsVerticalSidebar.demo";
import tabsVerticalSidebarSource from "@/components/showcase/demos/tabs/TabsVerticalSidebar.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function TabsShowcase() {
  return (
    <ShowcasePage
      title="Tabs"
      description="Tabs for switching between related content panels."
      importPath='import { Tabs } from "burne-ui";'
      tags={["core", "navigation"]}
    >
      <ShowcaseSection title="Default" description="Controlled tabs with disabled-condition.">
        <ShowcaseDemoFromFile align="stretch" Demo={TabsDefaultDemo} source={tabsDefaultSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={TabsSizesDemo} source={tabsSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Outline" description="variant outline — indicator with primary-tint.">
        <ShowcaseDemoFromFile align="stretch" Demo={TabsOutlineDemo} source={tabsOutlineSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Secondary" description="variant secondary — container surface-secondary.">
        <ShowcaseDemoFromFile align="stretch" Demo={TabsSecondaryDemo} source={tabsSecondarySource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass tab list with indicator.">
        <ShowcaseDemoFromFile align="stretch" Demo={TabsGlossDemo} source={tabsGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Full customization classNames"
        description="Slots root, list, indicator, tab, tabText, panel through classNames on the root."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={TabsClassNamesFullDemo} source={tabsClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Settings panel, vertical sidebar and dashboard — `demos/tabs/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={TabsSettingsPanelDemo} source={tabsSettingsPanelSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TabsVerticalSidebarDemo} source={tabsVerticalSidebarSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TabsDashboardShellDemo} source={tabsDashboardShellSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Tabs.List, Tabs.Tab and Tabs.Panel — slots. value/onValueChange or defaultValue for state."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Options">
          <p>
            <code>default</code>, <code>outline</code>, <code>secondary</code>, <code>gloss</code> — are set by prop{" "}
            <code>variant</code> on the root Tabs.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
