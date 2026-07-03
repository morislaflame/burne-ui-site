import { CloseButton } from "burne-ui";

export function CloseButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-small">
      <CloseButton aria-label="Close" />
      <CloseButton aria-label="Close outline" variant="outline" />
    </div>
  );
}
