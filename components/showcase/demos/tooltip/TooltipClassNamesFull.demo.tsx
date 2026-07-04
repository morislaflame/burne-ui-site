import { IoHelpCircleOutline } from "react-icons/io5";

import { Button } from "burne-ui";
import { Tooltip } from "burne-ui";

export function TooltipClassNamesFullDemo() {
  return (
    <Tooltip
      delayShowMs={0}
      side="top"
      classNames={{
        root: "rounded-full",
        trigger: "rounded-full",
        arrow: "bg-secondary",
        panel: "border-primary/30",
        indicator: "text-secondary",
        title: "text-secondary font-semibold",
        description: "text-muted",
      }}
    >
      <Tooltip.Trigger>
        <Button variant="outline" type="button" aria-label="Reference">
          <IoHelpCircleOutline aria-hidden className="icon-mid" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        <Tooltip.Title>Custom slots</Tooltip.Title>
        <Tooltip.Description>
          trigger, root, content, arrow, panel, indicator, title and description through classNames.
        </Tooltip.Description>
      </Tooltip.Content>
    </Tooltip>
  );
}

export function TooltipClassNamesGlossDemo() {
  return (
    <Tooltip
      delayShowMs={0}
      surface="gloss"
      side="bottom"
      classNames={{
        glossContent: "gap-y-xsmall",
        panel: "ring-1 ring-white/10",
        title: "text-foreground/95",
      }}
    >
      <Tooltip.Trigger>
        <Button variant="secondary" type="button">
          Gloss tooltip
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        Glass tip with custom glossContent
      </Tooltip.Content>
    </Tooltip>
  );
}
