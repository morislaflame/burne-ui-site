import { Breadcrumbs } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function BreadcrumbsClassNamesFullDemo() {
  return (
    <Breadcrumbs
      className="max-w-component-small rounded-mid border-token bg-surface p-mid shadow-token-base"
      classNames={{
        list: "gap-small",
        listItem: "gap-xsmall",
        separator: "text-primary opacity-100",
        separatorWrapper: "text-primary",
        link: "text-primary hover:text-primary",
        linkWrapper: "rounded-small",
        linkText: "tracking-tight text-mid",
        static: "text-primary",
        current: "font-semibold text-primary text-large",
        ellipsisTrigger: "text-primary",
        ellipsisLiftWrapper: "rounded-small",
        ellipsisText: "font-semibold",
        ellipsisPopover: "p-base",
        dropdownItem: "text-primary text-base",
      }}
    >
      <Breadcrumbs.List>
        <div>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Home
          </Breadcrumbs.Item>
        </div>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Catalog
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Electronics
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Laptops
        </Breadcrumbs.Item>
        <Breadcrumbs.Item current>MacBook Pro</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
