import { Breadcrumbs } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function BreadcrumbsDocTrailDemo() {
  return (
    <Breadcrumbs collapse={false} className="w-full max-w-component-mid items-center justify-center">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Documentation
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Components
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="#" onClick={preventNav}>
          Navigation
        </Breadcrumbs.Item>
        <Breadcrumbs.Item current>Breadcrumbs</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
