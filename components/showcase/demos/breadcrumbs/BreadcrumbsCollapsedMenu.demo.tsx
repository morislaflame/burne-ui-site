import { Breadcrumbs } from "burne-ui";
import { Text } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function BreadcrumbsCollapsedMenuDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-mid">
      <Text as="p" variant="small" className="text-muted">
        More than three points are compressed: first · … · last two.
      </Text>
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Home
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Catalog
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Electronics
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Laptops
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Apple
          </Breadcrumbs.Item>
          <Breadcrumbs.Item current>MacBook Pro 14&quot;</Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    </div>
  );
}
