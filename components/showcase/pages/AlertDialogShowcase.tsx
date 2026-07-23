"use client";

import { AlertDialogAsChildMergedPropsDemo } from "@/components/showcase/demos/alertDialog/AlertDialogAsChildMergedProps.demo";
import alertDialogAsChildMergedPropsSource from "@/components/showcase/demos/alertDialog/AlertDialogAsChildMergedProps.demo.tsx?raw";
import { AlertDialogPortalContainerDemo } from "@/components/showcase/demos/alertDialog/AlertDialogPortalContainer.demo";
import alertDialogPortalContainerSource from "@/components/showcase/demos/alertDialog/AlertDialogPortalContainer.demo.tsx?raw";
import { AlertDialogClassNamesFullDemo } from "@/components/showcase/demos/alertDialog/AlertDialogClassNamesFull.demo";
import alertDialogClassNamesFullSource from "@/components/showcase/demos/alertDialog/AlertDialogClassNamesFull.demo.tsx?raw";
import { AlertDialogDeleteAccountDemo } from "@/components/showcase/demos/alertDialog/AlertDialogDeleteAccount.demo";
import alertDialogDeleteAccountSource from "@/components/showcase/demos/alertDialog/AlertDialogDeleteAccount.demo.tsx?raw";
import { AlertDialogGlossDemo } from "@/components/showcase/demos/alertDialog/AlertDialogGloss.demo";
import alertDialogGlossSource from "@/components/showcase/demos/alertDialog/AlertDialogGloss.demo.tsx?raw";
import { AlertDialogLogoutDemo } from "@/components/showcase/demos/alertDialog/AlertDialogLogout.demo";
import alertDialogLogoutSource from "@/components/showcase/demos/alertDialog/AlertDialogLogout.demo.tsx?raw";
import { AlertDialogStatusDemo } from "@/components/showcase/demos/alertDialog/AlertDialogStatus.demo";
import alertDialogStatusSource from "@/components/showcase/demos/alertDialog/AlertDialogStatus.demo.tsx?raw";
import { AlertDialogSizesDemo } from "@/components/showcase/demos/alertDialog/AlertDialogSizes.demo";
import alertDialogSizesSource from "@/components/showcase/demos/alertDialog/AlertDialogSizes.demo.tsx?raw";
import { AlertDialogUnsavedChangesDemo } from "@/components/showcase/demos/alertDialog/AlertDialogUnsavedChanges.demo";
import alertDialogUnsavedChangesSource from "@/components/showcase/demos/alertDialog/AlertDialogUnsavedChanges.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function AlertDialogShowcase() {
  return (
    <ShowcasePage
      title="AlertDialog"
      description="Confirmation dialog with tone status and blocking closing by backdrop."
      importPath='import { AlertDialog } from "burne-ui";'
      tags={["composite", "overlay"]}
    >
      <ShowcaseSection title="Statuses" description="status affects icon and tone primary-buttons.">
        <ShowcaseDemoFromFile Demo={AlertDialogStatusDemo} source={alertDialogStatusSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={AlertDialogSizesDemo} source={alertDialogSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass confirmation panel.">
        <ShowcaseDemoFromFile Demo={AlertDialogGlossDemo} source={alertDialogGlossSource} />
      </ShowcaseSection>


      <ShowcaseSection
        title="portalContainer"
        description="Custom portal host — alert stays inside the container."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={AlertDialogPortalContainerDemo} source={alertDialogPortalContainerSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="asChild — merged props"
        description="Trigger asChild merges id, data-*, className, and ref onto the child."
      >
        <ShowcaseDemoFromFile Demo={AlertDialogAsChildMergedPropsDemo} source={alertDialogAsChildMergedPropsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slot customization panel, header, title, description, footer through classNames."
      >
        <ShowcaseDemoFromFile
          Demo={AlertDialogClassNamesFullDemo}
          source={alertDialogClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Deleting an account, unsaved changes and exit — `demos/alertDialog/`."
      >
        <ShowcaseDemoFromFile Demo={AlertDialogDeleteAccountDemo} source={alertDialogDeleteAccountSource} />
        <ShowcaseDemoFromFile Demo={AlertDialogUnsavedChangesDemo} source={alertDialogUnsavedChangesSource} />
        <ShowcaseDemoFromFile Demo={AlertDialogLogoutDemo} source={alertDialogLogoutSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="AlertDialog.Header, AlertDialog.Footer — fixed confirmation structure."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss>
          <p>
            Tone primary-buttons - helper <code>primaryButtonVariantForAlertTone</code> from the package.{" "}
            <code>status</code> fundamentally affects the icon and confirmation button.
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
