import { Alert } from "burne-ui";

export function AlertStatusesDemo() {
  return (
    <div className="flex flex-col gap-mid">
      <Alert title="Hint" description="Components are imported from the library through the alias @." />
      <Alert status="info" title="Information" description="Neutral system message." />
      <Alert status="danger" title="Error" description="Critical problem with connection." />
    </div>
  );
}
