import { useState } from "react";

import { Tabs } from "burne-ui";
import { Text } from "burne-ui";

export function TabsDefaultDemo() {
  const [tab, setTab] = useState("overview");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full max-w-component-large items-center justify-center">
      <Tabs.List>
        <Tabs.Tab value="overview">Review</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Soon
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview" className="pt-mid">
        <Text as="p" variant="small" className="text-muted">
          Active tab: {tab} (variant default)
        </Text>
      </Tabs.Panel>
      <Tabs.Panel value="details" className="pt-mid">
        <Text as="p" variant="small">
          Second panel with other content.
        </Text>
      </Tabs.Panel>
    </Tabs>
  );
}
