import { Link } from "burne-ui";

export function LinkClassNamesFullDemo() {
  return (
    <Link
      href="#"
      showDefaultIcon
      underline
      classNames={{
        root: "gap-small rounded-mid border border-primary/25 p-xsmall text-primary",
        text: "font-semibold tracking-wide",
        icon: "text-warning",
      }}
    >
      Documentation
    </Link>
  );
}
