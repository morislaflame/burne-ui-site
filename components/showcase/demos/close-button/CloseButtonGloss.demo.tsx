import { CloseButton } from "burne-ui";

export function CloseButtonGlossDemo() {
  return (
    <div className="flex flex-wrap items-center gap-small">
      <CloseButton aria-label="Close gloss" variant="gloss" />
      <CloseButton aria-label="Close gloss outline" variant="outline" />
    </div>
  );
}
