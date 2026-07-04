import { useState } from "react";

import { SearchInput } from "burne-ui";

export function SearchInputVariantsDemo() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full flex-col items-center gap-mid">
      <SearchInput
        aria-label="Search default"
        placeholder="variant default"
        value={search}
        onValueChange={setSearch}
        defaultExpanded
        className="w-64"
      />
      <SearchInput
        variant="outline"
        aria-label="Search outline"
        placeholder="variant outline"
        value={search}
        onValueChange={setSearch}
        defaultExpanded
        className="w-64"
      />
      <SearchInput
        variant="secondary"
        aria-label="Search secondary"
        placeholder="variant secondary"
        value={search}
        onValueChange={setSearch}
        defaultExpanded
        className="w-64"
      />
    </div>
  );
}
