"use client";

import { TextAreaClassNamesCompoundDemo, TextAreaClassNamesFullDemo } from "@/components/showcase/demos/textarea/TextAreaClassNamesFull.demo";
import textAreaClassNamesFullSource from "@/components/showcase/demos/textarea/TextAreaClassNamesFull.demo.tsx?raw";
import { TextAreaVariantsDemo } from "@/components/showcase/demos/textarea/TextAreaVariants.demo";
import textAreaVariantsSource from "@/components/showcase/demos/textarea/TextAreaVariants.demo.tsx?raw";
import { TextAreaSizesDemo } from "@/components/showcase/demos/textarea/TextAreaSizes.demo";
import textAreaSizesSource from "@/components/showcase/demos/textarea/TextAreaSizes.demo.tsx?raw";
import { TextAreaCommentThreadDemo } from "@/components/showcase/demos/textarea/TextAreaCommentThread.demo";
import textAreaCommentThreadSource from "@/components/showcase/demos/textarea/TextAreaCommentThread.demo.tsx?raw";
import { TextAreaGlossDemo } from "@/components/showcase/demos/textarea/TextAreaGloss.demo";
import textAreaGlossSource from "@/components/showcase/demos/textarea/TextAreaGloss.demo.tsx?raw";
import { TextAreaReleaseNotesDemo } from "@/components/showcase/demos/textarea/TextAreaReleaseNotes.demo";
import textAreaReleaseNotesSource from "@/components/showcase/demos/textarea/TextAreaReleaseNotes.demo.tsx?raw";
import { TextAreaSupportTicketDemo } from "@/components/showcase/demos/textarea/TextAreaSupportTicket.demo";
import textAreaSupportTicketSource from "@/components/showcase/demos/textarea/TextAreaSupportTicket.demo.tsx?raw";
import { TextAreaWithErrorDemo } from "@/components/showcase/demos/textarea/TextAreaWithError.demo";
import textAreaWithErrorSource from "@/components/showcase/demos/textarea/TextAreaWithError.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function TextAreaShowcase() {
  return (
    <ShowcasePage
      title="TextArea"
      description="Multiline input field with the same Simple API, what and Input."
      importPath='import { TextArea } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Options" description="variant: default, outline, secondary — alternative field shells.">
        <ShowcaseDemoFromFile align="center" Demo={TextAreaVariantsDemo} source={textAreaVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="center" Demo={TextAreaSizesDemo} source={textAreaSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="With an error" description="status danger and prop error for validation message.">
        <ShowcaseDemoFromFile align="center" Demo={TextAreaWithErrorDemo} source={textAreaWithErrorSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass shell with motion.">
        <ShowcaseDemoFromFile align="center" Demo={TextAreaGlossDemo} source={textAreaGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Full customization classNames"
        description="Slots root, shell, control, resizeHandle, hint, error through classNames on the root."
      >
        <ShowcaseDemoFromFile align="center" Demo={TextAreaClassNamesFullDemo} source={textAreaClassNamesFullSource} />
        <ShowcaseDemoFromFile align="center" Demo={TextAreaClassNamesCompoundDemo} source={textAreaClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Release notes, support ticket and comment thread — demo-files in `demos/textarea/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={TextAreaReleaseNotesDemo} source={textAreaReleaseNotesSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TextAreaSupportTicketDemo} source={textAreaSupportTicketSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TextAreaCommentThreadDemo} source={textAreaCommentThreadSource} />
      </ShowcaseSection>
    </ShowcasePage>
  );
}
