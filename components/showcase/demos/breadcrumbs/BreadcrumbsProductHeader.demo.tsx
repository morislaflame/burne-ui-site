import { IoHomeOutline } from "react-icons/io5";

import { Breadcrumbs } from "burne-ui";
import { Text } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function BreadcrumbsProductHeaderDemo() {
  return (
    <div className="flex w-full flex-col gap-mid rounded-mid border-token bg-surface px-mid py-small">
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            <span className="inline-flex items-center gap-xsmall">
              <IoHomeOutline aria-hidden className="size-3.5" />
              Shop
            </span>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Cloth
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" onClick={preventNav}>
            Jackets
          </Breadcrumbs.Item>
          <Breadcrumbs.Item current>Parka Arctic</Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
      <Text as="h3" variant="base" className="font-semibold">
        Parka Arctic
      </Text>
    </div>
  );
}
