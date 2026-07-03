import { useMemo, useState } from "react";

import { Avatar } from "burne-ui";
import { Badge } from "burne-ui";
import { Surface } from "burne-ui";
import { Table, type SortDescriptor } from "burne-ui";
import { PIN_IMAGE1, PIN_IMAGE2, PIN_IMAGE3 } from "@/lib/showcase/mock-images";

type Member = {
  id: number;
  name: string;
  role: string;
  status: "Active" | "On Leave";
  avatar?: string;
};

const MEMBERS: Member[] = [
  { id: 1, name: "Kate Moore", role: "CEO", status: "Active", avatar: PIN_IMAGE1 },
  { id: 2, name: "John Smith", role: "CTO", status: "Active", avatar: PIN_IMAGE2 },
  { id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave", avatar: PIN_IMAGE3 },
];

const STATUS_BADGE = {
  Active: "success",
  "On Leave": "warning",
} as const;

export function TableTeamRosterDemo() {
  const [sort, setSort] = useState<SortDescriptor>({ column: "name", direction: "ascending" });

  const sorted = useMemo(() => {
    const rows = [...MEMBERS];
    if (sort.column === "name") {
      rows.sort((a, b) => a.name.localeCompare(b.name, "ru"));
      if (sort.direction === "descending") rows.reverse();
    }
    return rows;
  }, [sort]);

  return (
    <Surface variant="secondary" padding="mid" className="w-full max-w-xl">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Team"
            className="min-w-[28rem]"
            sortDescriptor={sort}
            onSortChange={setSort}
          >
            <Table.Header>
              <Table.Column id="name" isRowHeader allowsSorting>
                Participant
              </Table.Column>
              <Table.Column id="role">Role</Table.Column>
              <Table.Column id="status">Status</Table.Column>
            </Table.Header>
            <Table.Body items={sorted}>
              {(row: Member) => (
                <Table.Row key={row.id} id={row.id}>
                  <Table.Cell>
                    <span className="inline-flex items-center gap-small">
                      <Avatar size="small" label={row.name} src={row.avatar} alt="" loading="lazy" />
                      {row.name}
                    </span>
                  </Table.Cell>
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
    </Surface>
  );
}
