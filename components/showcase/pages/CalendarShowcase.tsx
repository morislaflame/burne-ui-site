"use client";

import { CalendarBookingPanelDemo } from "@/components/showcase/demos/calendar/CalendarBookingPanel.demo";
import calendarBookingPanelSource from "@/components/showcase/demos/calendar/CalendarBookingPanel.demo.tsx?raw";
import { CalendarClassNamesFullDemo } from "@/components/showcase/demos/calendar/CalendarClassNamesFull.demo";
import calendarClassNamesFullSource from "@/components/showcase/demos/calendar/CalendarClassNamesFull.demo.tsx?raw";
import { CalendarCompoundLayoutDemo } from "@/components/showcase/demos/calendar/CalendarCompoundLayout.demo";
import calendarCompoundLayoutSource from "@/components/showcase/demos/calendar/CalendarCompoundLayout.demo.tsx?raw";
import { CalendarGlossDemo } from "@/components/showcase/demos/calendar/CalendarGloss.demo";
import calendarGlossSource from "@/components/showcase/demos/calendar/CalendarGloss.demo.tsx?raw";
import { CalendarInlineWidgetDemo } from "@/components/showcase/demos/calendar/CalendarInlineWidget.demo";
import calendarInlineWidgetSource from "@/components/showcase/demos/calendar/CalendarInlineWidget.demo.tsx?raw";
import { CalendarModesDemo } from "@/components/showcase/demos/calendar/CalendarModes.demo";
import calendarModesSource from "@/components/showcase/demos/calendar/CalendarModes.demo.tsx?raw";
import { CalendarSizesDemo } from "@/components/showcase/demos/calendar/CalendarSizes.demo";
import calendarSizesSource from "@/components/showcase/demos/calendar/CalendarSizes.demo.tsx?raw";
import { ShowcaseDemoFromFile } from "@/components/showcase/layout/ShowcaseDemoFromFile";
import { ShowcaseDoc } from "@/components/showcase/layout/ShowcaseDoc";
import { ShowcasePage } from "@/components/showcase/layout/ShowcasePage";
import { ShowcaseSection } from "@/components/showcase/layout/ShowcaseSection";

export function CalendarShowcase() {
  return (
    <ShowcasePage
      title="Calendar"
      description="Date picker: single, range, multiple dates and compound API with footer."
      importPath='import { Calendar } from "burne-ui";'
      tags={["core", "forms"]}
    >
      <ShowcaseSection title="Selection Modes" description="mode: single, range, multiple and compound with Calendar.Footer.">
        <ShowcaseDemoFromFile align="start" Demo={CalendarModesDemo} source={calendarModesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Dimensions" description="size: small, base, mid, large.">
        <ShowcaseDemoFromFile align="start" Demo={CalendarSizesDemo} source={calendarSizesSource} />
      </ShowcaseSection>

      <ShowcaseSection title="Gloss" description="variant=&quot;gloss&quot; — glass calendar panel.">
        <ShowcaseDemoFromFile align="start" Demo={CalendarGlossDemo} source={calendarGlossSource} />
      </ShowcaseSection>

      <ShowcaseSection
        title="classNames"
        description="Full customization of slots via classNames on root."
      >
        <ShowcaseDemoFromFile
          align="start"
          Demo={CalendarClassNamesFullDemo}
          source={calendarClassNamesFullSource}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom Variations"
        description="Booking in Surface, compound layout and compact widget — `demos/calendar/`."
      >
        <ShowcaseDemoFromFile align="start" Demo={CalendarBookingPanelDemo} source={calendarBookingPanelSource} />
        <ShowcaseDemoFromFile align="start" Demo={CalendarCompoundLayoutDemo} source={calendarCompoundLayoutSource} />
        <ShowcaseDemoFromFile align="start" Demo={CalendarInlineWidgetDemo} source={calendarInlineWidgetSource} />
      </ShowcaseSection>

      <ShowcaseDoc>
        <ShowcaseDoc.Block title="Import">
          <ShowcaseDoc.Import path="burne-ui" />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Block title="API">
          <ShowcaseDoc.ApiRow
            api="simple"
            description="value / onValueChange on the root with prop mode."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="Calendar.Header, Calendar.Grid, Calendar.Footer for custom layout."
          />
          <ShowcaseDoc.ApiRow
            api="compound"
            description="root, header, grid, dayCell, cell, cellFill, footer and other slots on root."
          />
        </ShowcaseDoc.Block>
        <ShowcaseDoc.Customization gloss>
          <p>
            Localization and restrictions — <code>minValue</code>, <code>maxValue</code>, <code>locale</code>.
            Fill selected cells — <code>configureMotion()</code> (<code>enableToggleButtonFill</code>).
          </p>
        </ShowcaseDoc.Customization>
      </ShowcaseDoc>
    </ShowcasePage>
  );
}
