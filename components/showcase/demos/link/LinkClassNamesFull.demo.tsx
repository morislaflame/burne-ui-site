import { Link } from "burne-ui";

export function LinkClassNamesFullDemo() {
  return (
    <Link
      href="#"
      showDefaultIcon
      underline
      classNames={{
        anchor: "gap-small rounded-mid border border-primary/25 bg-surface p-base text-primary",
        text: "font-semibold tracking-wide text-mid",
        iconEnd: "text-primary",
      }}
    >
      Documentation
    </Link>
  );
}
