"use client";

import { useState } from "react";

import { SearchInput } from "burne-ui";

export function SearchInputGlossDemo() {
  const [search, setSearch] = useState("");

  return (
    <SearchInput
      variant="gloss"
      aria-label="Search gloss"
      placeholder="Find…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-64"
    />
  );
}
