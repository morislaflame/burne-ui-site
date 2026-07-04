"use client";

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
    </ShowcasePage>
  );
}
