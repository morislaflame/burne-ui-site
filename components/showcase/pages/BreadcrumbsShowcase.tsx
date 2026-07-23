"use client";

import { BreadcrumbsClassNamesFullDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsClassNamesFull.demo";
import breadcrumbsClassNamesFullSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsClassNamesFull.demo.tsx?raw";
import { BreadcrumbsCollapsedMenuDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsCollapsedMenu.demo";
import breadcrumbsCollapsedMenuSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsCollapsedMenu.demo.tsx?raw";
import { BreadcrumbsDocTrailDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsDocTrail.demo";
import breadcrumbsDocTrailSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsDocTrail.demo.tsx?raw";
import { BreadcrumbsLongPathDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsLongPath.demo";
import breadcrumbsLongPathSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsLongPath.demo.tsx?raw";
import { BreadcrumbsProductHeaderDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsProductHeader.demo";
import breadcrumbsProductHeaderSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsProductHeader.demo.tsx?raw";
import { BreadcrumbsShortPathDemo } from "@/components/showcase/demos/breadcrumbs/BreadcrumbsShortPath.demo";
import breadcrumbsShortPathSource from "@/components/showcase/demos/breadcrumbs/BreadcrumbsShortPath.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function BreadcrumbsShowcase() {
  return (
    <ShowcasePage
      title="Breadcrumbs"
      description="Navigation chain through the page hierarchy with support for the current item."
      importPath='import { Breadcrumbs } from "burne-ui";'
      tags={["core", "navigation"]}
    >
      <ShowcaseSection title="Shortcut" description="Typical chain of three levels.">
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsShortPathDemo} source={breadcrumbsShortPathSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Long way" description="Several intermediate levels before the current page.">
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsLongPathDemo} source={breadcrumbsLongPathSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Compression from menu «…», product header and documentation path — `demos/breadcrumbs/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsClassNamesFullDemo} source={breadcrumbsClassNamesFullSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsCollapsedMenuDemo} source={breadcrumbsCollapsedMenuSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsProductHeaderDemo} source={breadcrumbsProductHeaderSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={BreadcrumbsDocTrailDemo} source={breadcrumbsDocTrailSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="`items` on root for quick assembly. Slots can be configured via `classNames`."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Breadcrumbs.List + Breadcrumbs.Item. Item can be nested through wrappers, collection is done recursively."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Availability">
          <p>
            The list is rendered as <code>&lt;ol&gt;</code>. The current page is marked <code>aria-current</code>.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Next step">
          <p>
            The next step is to go through and unify the names of the slots (
            <code>root</code>/<code>content</code>/<code>message</code> etc.) in the general guideline,
            so that they are called the same everywhere in China.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
