import { Kbd } from "burne-ui";

export function KbdClassNamesFullDemo() {
  return (
    <Kbd
      variant="outline"
      classNames={{
        root: "border-info/40 bg-info/5 text-info",
      }}
    >
      /
    </Kbd>
  );
}
