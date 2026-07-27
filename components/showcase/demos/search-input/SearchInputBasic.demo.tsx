"use client";

import { useState } from "react";

import { SearchInput } from "burne-ui";

export function SearchInputBasicDemo() {
  const [search, setSearch] = useState("");

  return (
    <SearchInput
      aria-label="Search"
      placeholder="Find component…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-64"
    />
  );
}
