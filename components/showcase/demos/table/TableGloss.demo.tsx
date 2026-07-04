import { Badge } from "burne-ui";
import { Table } from "burne-ui";
import { Text } from "burne-ui";

import { STATUS_BADGE, TABLE_ROWS, type TableRow } from "@/lib/showcase/shared/constants";

export function TableGlossDemo() {
  return (
    <div className="flex flex-col gap-mid items-center justify-center max-w-component-large w-full">
      <Table variant="gloss" className="w-full">
        <Table.ScrollContainer>
          <Table.Content aria-label="Gloss team" className="min-w-[28rem]">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body items={TABLE_ROWS}>
              {(row: TableRow) => (
                <Table.Row key={row.id} id={row.id}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.role}</Table.Cell>
                  <Table.Cell>
                    <Badge status={STATUS_BADGE[row.status]}>{row.status}</Badge>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
      <Text as="p" variant="small" className="text-muted">
        Hover over a line - highlight <span className="text-foreground">primary-tint</span>.
      </Text>
    </div>
  );
}
