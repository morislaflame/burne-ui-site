import { IoEllipsisHorizontal } from "react-icons/io5";

import { ButtonGroup, ButtonGroupText } from "burne-ui";
import { Button } from "burne-ui";
import { Dropdown } from "burne-ui";

export function ButtonGroupGlossDemo() {
  return (
    <ButtonGroup variant="gloss" aria-label="Gloss actions">
      <ButtonGroupText>View</ButtonGroupText>
      <Button>List</Button>
      <Button>Net</Button>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button aria-label="Additional actions" iconOnly>
            <IoEllipsisHorizontal aria-hidden className="icon-base" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Item value="share" selection={false}>
            Share
          </Dropdown.Item>
          <Dropdown.Item value="del" variant="danger" selection={false}>
            Delete
          </Dropdown.Item>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}
