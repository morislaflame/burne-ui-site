import { Button } from "burne-ui";
import { Tooltip } from "burne-ui";

export function TooltipGlossDemo() {
  return (
    <Tooltip surface="gloss" variant="info">
      <Tooltip.Trigger>
        <Button variant="gloss">Gloss Tooltip</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Icon />
        <Tooltip.Title>Reference</Tooltip.Title>
        <Tooltip.Description>
          Glass tip with icon to the left of the text (surface=&quot;gloss&quot;)
        </Tooltip.Description>
      </Tooltip.Content>
    </Tooltip>
  );
}
