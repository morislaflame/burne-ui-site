import { CloseButton } from "burne-ui";

export function CloseButtonClassNamesFullDemo() {
  return (
    <CloseButton
      variant="outline"
      size="mid"
      classNames={{
        root: "border-primary/50 bg-primary/5 shadow-token-base hover:bg-primary-tint",
        icon: "text-primary",
      }}
      aria-label="Close with custom classNames"
    />
  );
}
