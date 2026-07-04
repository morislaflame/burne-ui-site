import { useState } from "react";

import { Badge } from "burne-ui";
import { Table, type Selection } from "burne-ui";
import { Text } from "burne-ui";

import { STATUS_BADGE, TABLE_ROWS, type TableRow } from "@/lib/showcase/shared/constants";

export function TableRowSelectionDemo() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<number>());
  const selectedLabel =
    selectedKeys === "all"
      ? "All"
      : (selectedKeys as Set<number>).size > 0
        ? Array.from(selectedKeys as Set<number>).join(", ")
        : "No";

  return (
    <div className="flex flex-col gap-mid items-center justify-center max-w-component-large w-full">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Team with choice"
            className="min-w-[480px]"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
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
        Selected id: <span className="font-medium text-foreground">{selectedLabel}</span>
      </Text>
    </div>
  );
}
