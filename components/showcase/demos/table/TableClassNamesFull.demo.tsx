import { Table } from "burne-ui";

const rows = [
  { id: 1, name: "Kate Moore", role: "CEO" },
  { id: 2, name: "John Smith", role: "CTO" },
  { id: 3, name: "Sara Johnson", role: "CMO" },
];

export function TableClassNamesFullDemo() {
  return (
    <Table
      classNames={{
        root: "rounded-mid border border-primary/25 shadow-token-base",
        headerRow: "bg-primary/10",
        column: "text-primary font-semibold",
        row: "hover:bg-primary/5",
        cell: "text-foreground/90",
        footer: "bg-primary/5",
      }}
      className="max-w-component-large items-center justify-center w-full"
    >
      <Table.ScrollContainer>
        <Table.Content aria-label="Team">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Role</Table.Column>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell className="font-medium">{row.name}</Table.Cell>
                <Table.Cell className="text-muted">{row.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <span className="text-small text-muted">Setting up slots via classNames on root.</span>
      </Table.Footer>
    </Table>
  );
}
