"use client";

import { DrawerClassNamesFullDemo } from "@/components/showcase/demos/drawer/DrawerClassNamesFull.demo";
import drawerClassNamesFullSource from "@/components/showcase/demos/drawer/DrawerClassNamesFull.demo.tsx?raw";
import { DrawerFilterSheetDemo } from "@/components/showcase/demos/drawer/DrawerFilterSheet.demo";
import drawerFilterSheetSource from "@/components/showcase/demos/drawer/DrawerFilterSheet.demo.tsx?raw";
import { DrawerGlossDemo } from "@/components/showcase/demos/drawer/DrawerGloss.demo";
import drawerGlossSource from "@/components/showcase/demos/drawer/DrawerGloss.demo.tsx?raw";
import { DrawerMobileNavDemo } from "@/components/showcase/demos/drawer/DrawerMobileNav.demo";
import drawerMobileNavSource from "@/components/showcase/demos/drawer/DrawerMobileNav.demo.tsx?raw";
import { DrawerNotificationPanelDemo } from "@/components/showcase/demos/drawer/DrawerNotificationPanel.demo";
import drawerNotificationPanelSource from "@/components/showcase/demos/drawer/DrawerNotificationPanel.demo.tsx?raw";
import { DrawerPlacementDemo } from "@/components/showcase/demos/drawer/DrawerPlacement.demo";
import drawerPlacementSource from "@/components/showcase/demos/drawer/DrawerPlacement.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function DrawerShowcase() {
  return (
    <ShowcasePage
      title="Drawer"
      description="Retractable panel with four sides and adjustable size."
      importPath='import { Drawer } from "burne-ui";'
      tags={["core", "overlay"]}
    >
      <ShowcaseSection title="Accommodation" description="placement: left, right, top, bottom.">
        <ShowcaseDemoFromFile Demo={DrawerPlacementDemo} source={drawerPlacementSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass side panel.">
        <ShowcaseDemoFromFile Demo={DrawerGlossDemo} source={drawerGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on Root."
      >
        <ShowcaseDemoFromFile
          Demo={DrawerClassNamesFullDemo}
          source={drawerClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Filters, mobile navigation and notification panel — `demos/drawer/`."
      >
        <ShowcaseDemoFromFile Demo={DrawerFilterSheetDemo} source={drawerFilterSheetSource} />
        <ShowcaseDemoFromFile Demo={DrawerMobileNavDemo} source={drawerMobileNavSource} />
        <ShowcaseDemoFromFile Demo={DrawerNotificationPanelDemo} source={drawerNotificationPanelSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
