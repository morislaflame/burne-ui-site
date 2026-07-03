"use client";

import { TableActivityFeedDemo } from "@/components/showcase/demos/table/TableActivityFeed.demo";
import tableActivityFeedSource from "@/components/showcase/demos/table/TableActivityFeed.demo.tsx?raw";
import { TableBasicDemo } from "@/components/showcase/demos/table/TableBasic.demo";
import tableBasicSource from "@/components/showcase/demos/table/TableBasic.demo.tsx?raw";
import { TableClassNamesFullDemo } from "@/components/showcase/demos/table/TableClassNamesFull.demo";
import tableClassNamesFullSource from "@/components/showcase/demos/table/TableClassNamesFull.demo.tsx?raw";
import { TableGlossDemo } from "@/components/showcase/demos/table/TableGloss.demo";
import tableGlossSource from "@/components/showcase/demos/table/TableGloss.demo.tsx?raw";
import { TableGlossSelectionDemo } from "@/components/showcase/demos/table/TableGlossSelection.demo";
import tableGlossSelectionSource from "@/components/showcase/demos/table/TableGlossSelection.demo.tsx?raw";
import { TableInvoiceToolbarDemo } from "@/components/showcase/demos/table/TableInvoiceToolbar.demo";
import tableInvoiceToolbarSource from "@/components/showcase/demos/table/TableInvoiceToolbar.demo.tsx?raw";
import { TableRowSelectionDemo } from "@/components/showcase/demos/table/TableRowSelection.demo";
import tableRowSelectionSource from "@/components/showcase/demos/table/TableRowSelection.demo.tsx?raw";
import { TableTeamRosterDemo } from "@/components/showcase/demos/table/TableTeamRoster.demo";
import tableTeamRosterSource from "@/components/showcase/demos/table/TableTeamRoster.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function TableShowcase() {
  return (
    <ShowcasePage
      title="Table"
      description="Data tables with sorting, row selection and scrolling."
      importPath='import { Table } from "burne-ui";'
      tags={["core", "data"]}
    >
      <ShowcaseSection title="Basic" description="ScrollContainer, Header, Body and Badge in cells.">
        <ShowcaseDemoFromFile align="stretch" Demo={TableBasicDemo} source={tableBasicSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Row selection" description="selectionMode multiple and control selectedKeys.">
        <ShowcaseDemoFromFile align="stretch" Demo={TableRowSelectionDemo} source={tableRowSelectionSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant gloss — hover lines primary-tint, hover-lift panels.">
        <ShowcaseDemoFromFile align="stretch" Demo={TableGlossDemo} source={tableGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Gloss + choice"
        description="selectionMode multiple — selected rows too primary-tint."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={TableGlossSelectionDemo}
          source={tableGlossSelectionSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on root."
      >
        <ShowcaseDemoFromFile
          align="stretch"
          Demo={TableClassNamesFullDemo}
          source={tableClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Roster with avatars, account toolbar and activity feed — `demos/table/`."
      >
        <ShowcaseDemoFromFile align="stretch" Demo={TableTeamRosterDemo} source={tableTeamRosterSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TableInvoiceToolbarDemo} source={tableInvoiceToolbarSource} />
        <ShowcaseDemoFromFile align="stretch" Demo={TableActivityFeedDemo} source={tableActivityFeedSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="compound"
            description="ScrollContainer, Content, Header, Column, Body, Row and Cell — table slots."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="Data">
          <p>
            <code>items</code> on Body and render-prop{" "}
            <code>{`{(row) => ...}`}</code> for strings. <code>selectionMode</code>,{" "}
            <code>selectedKeys</code> and <code>onSelectionChange</code> — for selection.
          </p>
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss />
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
