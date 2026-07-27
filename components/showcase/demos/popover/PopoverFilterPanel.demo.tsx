import { useState } from "react";

import { Button } from "burne-ui";
import { Checkbox } from "burne-ui";
import { Popover } from "burne-ui";
import { CheckboxGroup, Label } from "burne-ui";

export function PopoverFilterPanelDemo() {
  const [active, setActive] = useState(false);

  return (
    <Popover open={active} onOpenChange={setActive}>
      <Popover.Trigger asChild>
        <Button variant="outline" type="button">
          Filters
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-56">
        <Popover.Body className="flex flex-col gap-large">
          <CheckboxGroup 
            selection="single"
          >
            <CheckboxGroup.Legend>
              <Label>
                Status
              </Label>
              <CheckboxGroup.Hint>
                Select display
              </CheckboxGroup.Hint>
            </CheckboxGroup.Legend>
            <CheckboxGroup.List>
              <Checkbox
                label="All"
                name="visible"
                value="all"
              />
              <Checkbox
                label="Drafts only"
                name="visible"
                value="drafts"
              />
            </CheckboxGroup.List>
          </CheckboxGroup>
          <Button size="small" type="button" onClick={() => setActive(false)}>
            Apply
          </Button>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
