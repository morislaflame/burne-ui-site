"use client";

import { BadgeAnchorDemo } from "@/components/showcase/demos/badge/BadgeAnchor.demo";
import badgeAnchorSource from "@/components/showcase/demos/badge/BadgeAnchor.demo.tsx?raw";
import { BadgeClassNamesFullDemo } from "@/components/showcase/demos/badge/BadgeClassNamesFull.demo";
import badgeClassNamesFullSource from "@/components/showcase/demos/badge/BadgeClassNamesFull.demo.tsx?raw";
import { BadgeGlossDemo } from "@/components/showcase/demos/badge/BadgeGloss.demo";
import badgeGlossSource from "@/components/showcase/demos/badge/BadgeGloss.demo.tsx?raw";
import { BadgeInboxButtonDemo } from "@/components/showcase/demos/badge/BadgeInboxButton.demo";
import badgeInboxButtonSource from "@/components/showcase/demos/badge/BadgeInboxButton.demo.tsx?raw";
import { BadgePlacementsDemo } from "@/components/showcase/demos/badge/BadgePlacements.demo";
import badgePlacementsSource from "@/components/showcase/demos/badge/BadgePlacements.demo.tsx?raw";
import { BadgeServiceStatusListDemo } from "@/components/showcase/demos/badge/BadgeServiceStatusList.demo";
import badgeServiceStatusListSource from "@/components/showcase/demos/badge/BadgeServiceStatusList.demo.tsx?raw";
import { BadgeTagCloudDemo } from "@/components/showcase/demos/badge/BadgeTagCloud.demo";
import badgeTagCloudSource from "@/components/showcase/demos/badge/BadgeTagCloud.demo.tsx?raw";
import { BadgeSizesDemo } from "@/components/showcase/demos/badge/BadgeSizes.demo";
import badgeSizesSource from "@/components/showcase/demos/badge/BadgeSizes.demo.tsx?raw";
import { BadgeVariantsDemo } from "@/components/showcase/demos/badge/BadgeVariants.demo";
import badgeVariantsSource from "@/components/showcase/demos/badge/BadgeVariants.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function BadgeShowcase() {
  return (
    <ShowcasePage
      title="Badge"
      description="Status marks, counters and indicator dots on interface elements."
      importPath='import { Badge } from "burne-ui";'
      tags={["core", "feedback"]}
    >
      <ShowcaseSection title="Options and statuses" description="variant, status and an icon on the root Badge.">
        <ShowcaseDemoFromFile Demo={BadgeVariantsDemo} source={badgeVariantsSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile Demo={BadgeSizesDemo} source={badgeSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — glass surface with motion.">
        <ShowcaseDemoFromFile Demo={BadgeGlossDemo} source={badgeGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Badge.Anchor" description="Counter and dot-indicator on top of avatar.">
        <ShowcaseDemoFromFile Demo={BadgeAnchorDemo} source={badgeAnchorSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Accommodation"
        description="placement at Badge inside Badge.Anchor: top-right, top-left, bottom-right, bottom-left."
      >
        <ShowcaseDemoFromFile Demo={BadgePlacementsDemo} source={badgePlacementsSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Tags, statuses and Badge.Anchor — demo-files in `demos/badge/`."
      >
        <ShowcaseDemoFromFile Demo={BadgeClassNamesFullDemo} source={badgeClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={BadgeTagCloudDemo} source={badgeTagCloudSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={BadgeServiceStatusListDemo} source={badgeServiceStatusListSource} />
        <ShowcaseDemoFromFile Demo={BadgeInboxButtonDemo} source={badgeInboxButtonSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="variant, status, size, icon on the root Badge. Badge.Anchor — compound-wrapper for positioning on top children."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Customization">
          <p>
            <code>placement</code> For dot-mode in <code>Badge.Anchor</code>. Dimensions:{" "}
            <code>small</code>, <code>base</code>, <code>mid</code>, <code>large</code>.{" "}
            <code>variant=&quot;gloss&quot;</code> — glass shell. Additional styles —{" "}
            <code>className</code> and <code>classNames</code>; hover-lift at the subsidiary Badge in Anchor —{" "}
            <code>configureMotion()</code> (<code>badgeAnchorHoverLiftScale</code>).
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Next step">
          <p>
            The next step is to go through and unify the names of the slots (
            <code>root</code>/<code>content</code>/<code>message</code> etc.) in the general guideline,
            so that they are called the same everywhere in China.
          </p>
        </ShowcaseDoc.Block>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
