"use client";

import { DrawerBottomSheetHandleDemo } from "@/components/showcase/demos/drawer/DrawerBottomSheetHandle.demo";
import drawerBottomSheetHandleSource from "@/components/showcase/demos/drawer/DrawerBottomSheetHandle.demo.tsx?raw";
import { DrawerAsChildMergedPropsDemo } from "@/components/showcase/demos/drawer/DrawerAsChildMergedProps.demo";
import drawerAsChildMergedPropsSource from "@/components/showcase/demos/drawer/DrawerAsChildMergedProps.demo.tsx?raw";
import { DrawerClassNamesFullDemo } from "@/components/showcase/demos/drawer/DrawerClassNamesFull.demo";
import drawerClassNamesFullSource from "@/components/showcase/demos/drawer/DrawerClassNamesFull.demo.tsx?raw";
import { DrawerFilterSheetDemo } from "@/components/showcase/demos/drawer/DrawerFilterSheet.demo";
import drawerFilterSheetSource from "@/components/showcase/demos/drawer/DrawerFilterSheet.demo.tsx?raw";
import { DrawerGlossDemo } from "@/components/showcase/demos/drawer/DrawerGloss.demo";
import drawerGlossSource from "@/components/showcase/demos/drawer/DrawerGloss.demo.tsx?raw";
import { DrawerHandleDemo } from "@/components/showcase/demos/drawer/DrawerHandle.demo";
import drawerHandleSource from "@/components/showcase/demos/drawer/DrawerHandle.demo.tsx?raw";
import { DrawerMobileNavDemo } from "@/components/showcase/demos/drawer/DrawerMobileNav.demo";
import drawerMobileNavSource from "@/components/showcase/demos/drawer/DrawerMobileNav.demo.tsx?raw";
import { DrawerNotificationPanelDemo } from "@/components/showcase/demos/drawer/DrawerNotificationPanel.demo";
import drawerNotificationPanelSource from "@/components/showcase/demos/drawer/DrawerNotificationPanel.demo.tsx?raw";
import { DrawerPlacementDemo } from "@/components/showcase/demos/drawer/DrawerPlacement.demo";
import drawerPlacementSource from "@/components/showcase/demos/drawer/DrawerPlacement.demo.tsx?raw";
import { DrawerPortalContainerDemo } from "@/components/showcase/demos/drawer/DrawerPortalContainer.demo";
import drawerPortalContainerSource from "@/components/showcase/demos/drawer/DrawerPortalContainer.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
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

      <ShowcaseSection
        title="Handle"
        description="Drawer.Handle — swipe-to-dismiss for each placement; bottom sheet example."
      >
        <ShowcaseDemoFromFile Demo={DrawerHandleDemo} source={drawerHandleSource} />
        <ShowcaseDemoFromFile
          Demo={DrawerBottomSheetHandleDemo}
          source={drawerBottomSheetHandleSource}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass side panel.">
        <ShowcaseDemoFromFile Demo={DrawerGlossDemo} source={drawerGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="portalContainer"
        description="Custom portal host — drawer stays inside the container."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={DrawerPortalContainerDemo} source={drawerPortalContainerSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="asChild — merged props"
        description="Trigger asChild merges id, data-*, className, and ref onto the child."
      >
        <ShowcaseDemoFromFile Demo={DrawerAsChildMergedPropsDemo} source={drawerAsChildMergedPropsSource} />
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
        <ShowcaseDemoFromFile
          Demo={DrawerNotificationPanelDemo}
          source={drawerNotificationPanelSource}
        />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Drawer.Header, Drawer.Body, Drawer.Footer, Drawer.Close, Drawer.Handle — panel structure."
          />
          <ShowcaseDoc.ApiRow
            api="portalContainer"
            description="Custom HTMLElement host for the portal (contained: show + absolute)."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss>
          <p>
            <code>placement</code>: left, right, top, bottom. <code>size</code> — width or height
            panels. <code>Drawer.Handle</code> — swipe dismiss. Slide-animation —{" "}
            <code>configureMotion()</code> (<code>interactiveDuration</code>).
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
