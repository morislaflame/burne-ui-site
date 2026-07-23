"use client";

import { PaginationClassNamesFullDemo } from "@/components/showcase/demos/pagination/PaginationClassNamesFull.demo";
import paginationClassNamesFullSource from "@/components/showcase/demos/pagination/PaginationClassNamesFull.demo.tsx?raw";
import { PaginationCompactCenteredDemo } from "@/components/showcase/demos/pagination/PaginationCompactCentered.demo";
import paginationCompactCenteredSource from "@/components/showcase/demos/pagination/PaginationCompactCentered.demo.tsx?raw";
import { PaginationCompactDemo } from "@/components/showcase/demos/pagination/PaginationCompact.demo";
import paginationCompactSource from "@/components/showcase/demos/pagination/PaginationCompact.demo.tsx?raw";
import { PaginationCustomLabelsDemo } from "@/components/showcase/demos/pagination/PaginationCustomLabels.demo";
import paginationCustomLabelsSource from "@/components/showcase/demos/pagination/PaginationCustomLabels.demo.tsx?raw";
import { PaginationTableFooterDemo } from "@/components/showcase/demos/pagination/PaginationTableFooter.demo";
import paginationTableFooterSource from "@/components/showcase/demos/pagination/PaginationTableFooter.demo.tsx?raw";
import { PaginationWithPagesDemo } from "@/components/showcase/demos/pagination/PaginationWithPages.demo";
import paginationWithPagesSource from "@/components/showcase/demos/pagination/PaginationWithPages.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function PaginationShowcase() {
  return (
    <ShowcasePage
      title="Pagination"
      description="Navigation through list pages with back/forward buttons and numbering."
      importPath='import { Pagination } from "burne-ui";'
      tags={["core", "navigation"]}
    >
      <ShowcaseSection
        title="Compact"
        description="Previous and next page with text summary."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationCompactDemo} source={paginationCompactSource} />
      </ShowcaseSection>

      <ShowcaseSection title="With numbers" description="Pagination.Pages to go directly to the page.">
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationWithPagesDemo} source={paginationWithPagesSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Slots root, summary, content, interactive, pageActive, navText and ellipsis — through prop classNames."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationClassNamesFullDemo} source={paginationClassNamesFullSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Table footer, centered navigation and custom captions — `demos/pagination/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationTableFooterDemo} source={paginationTableFooterSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationCompactCenteredDemo} source={paginationCompactCenteredSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={PaginationCustomLabelsDemo} source={paginationCustomLabelsSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="page, totalPages and onPageChange on the root. Summary, Content, Item, Previous, Next and Pages — slots."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Control">
          <p>
            Store page state externally via <code>useState</code>. <code>onPageChange</code> called when
            click on buttons and numbers.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
