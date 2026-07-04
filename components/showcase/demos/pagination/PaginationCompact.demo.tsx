import { useState } from "react";

import { Pagination } from "burne-ui";

export function PaginationCompactDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination page={page} totalPages={10} onPageChange={setPage} className="w-full max-w-component-large">
      <Pagination.Summary>Page {page} from 10</Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
