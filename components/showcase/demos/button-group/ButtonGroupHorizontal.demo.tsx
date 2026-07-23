import { IoEllipsisHorizontal } from "react-icons/io5";

import { ButtonGroup } from "burne-ui";
import { Button } from "burne-ui";
import { Dropdown } from "burne-ui";

export function ButtonGroupHorizontalDemo() {
  return (
    <ButtonGroup aria-label="Actions with a document">
      <ButtonGroup.Text>View</ButtonGroup.Text>
      <Button variant="outline">List</Button>
      <Button variant="outline" groupSegment={{ orientation: "horizontal", position: "middle" }}>
        Net
      </Button>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button
            variant="primary"
            aria-label="Additional actions"
            iconOnly
            groupSegment={{ orientation: "horizontal", position: "last" }}
          >
            <IoEllipsisHorizontal aria-hidden className="icon-base" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Popover align="end">
          <Dropdown.Item value="dup" selection={false}>
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item value="del" status="danger" selection={false}>
            Delete
          </Dropdown.Item>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}
