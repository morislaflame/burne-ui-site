import { IoEllipsisHorizontal } from "react-icons/io5";

import { ButtonGroup } from "burne-ui";
import { Button } from "burne-ui";
import { Dropdown } from "burne-ui";

export function ButtonGroupGlossDemo() {
  return (
    <ButtonGroup variant="gloss" aria-label="Gloss actions">
      <ButtonGroup.Text>View</ButtonGroup.Text>
      <Button>List</Button>
      <Button>Net</Button>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button aria-label="Additional actions" iconOnly>
            <IoEllipsisHorizontal aria-hidden className="icon-base" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Popover align="end">
          <Dropdown.Item value="share" selection={false}>
            Share
          </Dropdown.Item>
          <Dropdown.Item value="del" status="danger" selection={false}>
            Delete
          </Dropdown.Item>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}
