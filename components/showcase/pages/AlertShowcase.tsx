"use client";

import { AlertCompactStackDemo } from "@/components/showcase/demos/alert/AlertCompactStack.demo";
import alertCompactStackSource from "@/components/showcase/demos/alert/AlertCompactStack.demo.tsx?raw";
import { AlertClassNamesFullDemo } from "@/components/showcase/demos/alert/AlertClassNamesFull.demo";
import alertClassNamesFullSource from "@/components/showcase/demos/alert/AlertClassNamesFull.demo.tsx?raw";
import { AlertCompoundBannerDemo } from "@/components/showcase/demos/alert/AlertCompoundBanner.demo";
import alertCompoundBannerSource from "@/components/showcase/demos/alert/AlertCompoundBanner.demo.tsx?raw";
import { AlertGlossDemo } from "@/components/showcase/demos/alert/AlertGloss.demo";
import alertGlossSource from "@/components/showcase/demos/alert/AlertGloss.demo.tsx?raw";
import { AlertSizesDemo } from "@/components/showcase/demos/alert/AlertSizes.demo";
import alertSizesSource from "@/components/showcase/demos/alert/AlertSizes.demo.tsx?raw";
import { AlertStatusesDemo } from "@/components/showcase/demos/alert/AlertStatuses.demo";
import alertStatusesSource from "@/components/showcase/demos/alert/AlertStatuses.demo.tsx?raw";
import { AlertWithActionDemo } from "@/components/showcase/demos/alert/AlertWithAction.demo";
import alertWithActionSource from "@/components/showcase/demos/alert/AlertWithAction.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function AlertShowcase() {
  return (
    <ShowcasePage
      title="Alert"
      description="Information messages with title, description and statuses."
      importPath='import { Alert } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Statuses" description="title and description on the root — Simple API.">
        <ShowcaseDemoFromFile align="stretch" Demo={AlertStatusesDemo} source={alertStatusesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="stretch" Demo={AlertSizesDemo} source={alertSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="Glass panel with hover-lift.">
        <ShowcaseDemoFromFile align="stretch" Demo={AlertGlossDemo} source={alertGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Action, notification stack and compound-marking — demo-files in `demos/alert/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={AlertClassNamesFullDemo} source={alertClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={AlertWithActionDemo} source={alertWithActionSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={AlertCompactStackDemo} source={alertCompactStackSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={AlertCompoundBannerDemo} source={alertCompoundBannerSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="title, description, status, variant (including. gloss), size, icon, action on the root."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Message, Indicator, Content, Title, Description, Action — for complex markup."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Availability">
          <p>
            For <code>danger</code> and <code>warning</code> — <code>role=&quot;alert&quot;</code>. Auto-id
            For <code>aria-labelledby</code> / <code>aria-describedby</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Next step">
          <p>
            The next step is to go through and unify the names of the slots (
            <code>root</code>/<code>content</code>/<code>message</code> etc.) in the general guideline,
            so that they are called the same everywhere in China.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
