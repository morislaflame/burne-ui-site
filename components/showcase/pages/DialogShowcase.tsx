"use client";

import { DialogClassNamesFullDemo } from "@/components/showcase/demos/dialog/DialogClassNamesFull.demo";
import dialogClassNamesFullSource from "@/components/showcase/demos/dialog/DialogClassNamesFull.demo.tsx?raw";
import { DialogAsChildMergedPropsDemo } from "@/components/showcase/demos/dialog/DialogAsChildMergedProps.demo";
import dialogAsChildMergedPropsSource from "@/components/showcase/demos/dialog/DialogAsChildMergedProps.demo.tsx?raw";
import { DialogBasicDemo } from "@/components/showcase/demos/dialog/DialogBasic.demo";
import dialogBasicSource from "@/components/showcase/demos/dialog/DialogBasic.demo.tsx?raw";
import { DialogCompactConfirmDemo } from "@/components/showcase/demos/dialog/DialogCompactConfirm.demo";
import dialogCompactConfirmSource from "@/components/showcase/demos/dialog/DialogCompactConfirm.demo.tsx?raw";
import { DialogGlossDemo } from "@/components/showcase/demos/dialog/DialogGloss.demo";
import dialogGlossSource from "@/components/showcase/demos/dialog/DialogGloss.demo.tsx?raw";
import { DialogInviteTeamDemo } from "@/components/showcase/demos/dialog/DialogInviteTeam.demo";
import dialogInviteTeamSource from "@/components/showcase/demos/dialog/DialogInviteTeam.demo.tsx?raw";
import { DialogPortalContainerDemo } from "@/components/showcase/demos/dialog/DialogPortalContainer.demo";
import dialogPortalContainerSource from "@/components/showcase/demos/dialog/DialogPortalContainer.demo.tsx?raw";
import { DialogSettingsModalDemo } from "@/components/showcase/demos/dialog/DialogSettingsModal.demo";
import dialogSettingsModalSource from "@/components/showcase/demos/dialog/DialogSettingsModal.demo.tsx?raw";
import { DialogSizesDemo } from "@/components/showcase/demos/dialog/DialogSizes.demo";
import dialogSizesSource from "@/components/showcase/demos/dialog/DialogSizes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function DialogShowcase() {
  return (
    <ShowcasePage
      title="Dialog"
      description="Modal window on native &lt;dialog&gt; with animation and compound API."
      importPath='import { Dialog } from "burne-ui";'
      tags={["core", "overlay"]}
    >
      <ShowcaseSection title="Basic dialogue" description="open / onOpenChange, Header, Body, Footer.">
        <ShowcaseDemoFromFile Demo={DialogBasicDemo} source={dialogBasicSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={DialogSizesDemo} source={dialogSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass modal panel.">
        <ShowcaseDemoFromFile Demo={DialogGlossDemo} source={dialogGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="portalContainer"
        description="Custom portal host — non-modal show() + absolute, overlay stays inside the container."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={DialogPortalContainerDemo} source={dialogPortalContainerSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="asChild — merged props"
        description="Trigger asChild merges id, data-*, className, and ref onto the child via mergeAsChildProps."
      >
        <ShowcaseDemoFromFile Demo={DialogAsChildMergedPropsDemo} source={dialogAsChildMergedPropsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slot customization panel, header, title, body, footer through classNames."
      >
        <ShowcaseDemoFromFile
          Demo={DialogClassNamesFullDemo}
          source={dialogClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Invitation to the team, privacy settings and compact confirmation — `demos/dialog/`."
      >
        <ShowcaseDemoFromFile Demo={DialogInviteTeamDemo} source={dialogInviteTeamSource} />
        <ShowcaseDemoFromFile Demo={DialogSettingsModalDemo} source={dialogSettingsModalSource} />
        <ShowcaseDemoFromFile Demo={DialogCompactConfirmDemo} source={dialogCompactConfirmSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Dialog.Header, Dialog.Body, Dialog.Footer, Dialog.Close — full panel layout."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="dialog, overlay, panel, content, header, title, description, body, footer, close."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Custom HTMLElement host. Contained portals use show() + absolute (not showModal top layer)."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss>
          <p>
            <code>size</code> and <code>variant</code> on the root. Closing by Escape and click on backdrop —
            custom props. Enter/leave — <code>configureMotion()</code>.
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
