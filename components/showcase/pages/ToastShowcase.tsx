"use client";

import { ToastClassNamesFullDemo } from "@/components/showcase/demos/toast/ToastClassNamesFull.demo";
import toastClassNamesFullSource from "@/components/showcase/demos/toast/ToastClassNamesFull.demo.tsx?raw";
import { ToastDefaultDemo } from "@/components/showcase/demos/toast/ToastDefault.demo";
import toastDefaultSource from "@/components/showcase/demos/toast/ToastDefault.demo.tsx?raw";
import { ToastDeployPanelDemo } from "@/components/showcase/demos/toast/ToastDeployPanel.demo";
import toastDeployPanelSource from "@/components/showcase/demos/toast/ToastDeployPanel.demo.tsx?raw";
import { ToastModificationsDemo } from "@/components/showcase/demos/toast/ToastModifications.demo";
import toastModificationsSource from "@/components/showcase/demos/toast/ToastModifications.demo.tsx?raw";
import { ToastPlacementsDemo } from "@/components/showcase/demos/toast/ToastPlacements.demo";
import toastPlacementsSource from "@/components/showcase/demos/toast/ToastPlacements.demo.tsx?raw";
import { ToastPromiseFlowDemo } from "@/components/showcase/demos/toast/ToastPromiseFlow.demo";
import toastPromiseFlowSource from "@/components/showcase/demos/toast/ToastPromiseFlow.demo.tsx?raw";
import { ToastSizesDemo } from "@/components/showcase/demos/toast/ToastSizes.demo";
import toastSizesSource from "@/components/showcase/demos/toast/ToastSizes.demo.tsx?raw";
import { ToastUndoActionDemo } from "@/components/showcase/demos/toast/ToastUndoAction.demo";
import toastUndoActionSource from "@/components/showcase/demos/toast/ToastUndoAction.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function ToastShowcase() {
  return (
    <ShowcasePage
      title="Toast"
      description="Imperative notifications via useToast — stack up to 3 visible toasts."
      importPath='import { Toast, useToast } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Base" description="toast.show with title and description — status and variant default.">
        <ShowcaseDemoFromFile Demo={ToastDefaultDemo} source={toastDefaultSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large — padding, typography and width viewport.">
        <ShowcaseDemoFromFile Demo={ToastSizesDemo} source={toastSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Modifications"
        description="status, variant gloss, action, isLoading and timeout: 0."
      >
        <ShowcaseDemoFromFile Demo={ToastModificationsDemo} source={toastModificationsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Full customization classNames"
        description="Slots root, indicator, title, description, action, close, viewport, scrim, stack."
      >
        <ShowcaseDemoFromFile Demo={ToastClassNamesFullDemo} source={toastClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Accommodation"
        description="placement: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right."
      >
        <ShowcaseDemoFromFile Demo={ToastPlacementsDemo} source={toastPlacementsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Undo-action, deployment panel and toast.promise — demo-files in `demos/toast/`."
      >
        <ShowcaseDemoFromFile Demo={ToastUndoActionDemo} source={toastUndoActionSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={ToastDeployPanelDemo} source={toastDeployPanelSource} />
        <ShowcaseDemoFromFile Demo={ToastPromiseFlowDemo} source={toastPromiseFlowSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
