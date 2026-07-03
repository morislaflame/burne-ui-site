import { useState } from "react";

import { SearchInput } from "burne-ui";

export function SearchInputBasicDemo() {
  const [search, setSearch] = useState("");

  return (
    <SearchInput
      aria-label="Search"
      placeholder="Find component…"
      value={search}
      onValueChange={setSearch}
      className="w-64"
    />
  );
}
