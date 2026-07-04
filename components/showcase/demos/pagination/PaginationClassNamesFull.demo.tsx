import { useState } from "react";

import { Pagination } from "burne-ui";

export function PaginationClassNamesFullDemo() {
  const [page, setPage] = useState(3);
  const totalPages = 12;

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      classNames={{
        root: "rounded-mid border border-primary/25 p-base bg-surface shadow-token-base max-w-component-large",
        summaryText: "text-primary font-medium",
        content: "gap-small",
        interactive: "text-muted hover:text-primary",
        pageActive: "text-primary font-semibold",
        ellipsis: "text-warning",
      }}
    >
      <Pagination.Summary>
        Page {page} from {totalPages}
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous />
        </Pagination.Item>
        <Pagination.Pages />
        <Pagination.Item>
          <Pagination.Next />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
