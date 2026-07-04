import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";

import { Tabs } from "burne-ui";

const TAB_ITEMS = [
  { value: "account", label: "Account", icon: IoPersonOutline },
  { value: "documents", label: "Documents", icon: IoDocumentTextOutline },
] as const;

export function TabsClassNamesFullDemo() {
  return (
    <Tabs
      defaultValue="account"
      classNames={{
        root: "max-w-component-large rounded-mid p-base bg-surface",
        list: "bg-primary/5 rounded-small p-base",
        indicator: "bg-primary",
        tab: "font-medium",
        tabText: "gap-small",
        panel: "rounded-small bg-primary/5 p-mid",
      }}
    >
      <Tabs.List>
        {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
          <Tabs.Tab key={value} value={value}>
            <Icon aria-hidden className="icon-base shrink-0" />
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {TAB_ITEMS.map(({ value, label }) => (
        <Tabs.Panel key={value} value={value}>
          <p className="text-small text-muted">Tab content «{label}».</p>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
