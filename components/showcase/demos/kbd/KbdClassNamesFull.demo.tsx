import { Kbd } from "burne-ui";

export function KbdClassNamesFullDemo() {
  return (
    <Kbd
      variant="primary"
      classNames={{
        root: "border-info/40 bg-info-tint text-info",
      }}
    >
      Cmd ⌘
    </Kbd>
  );
}
