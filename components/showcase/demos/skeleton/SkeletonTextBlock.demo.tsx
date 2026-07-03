import { Skeleton } from "burne-ui";

export function SkeletonTextBlockDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-small">
      <Skeleton.Text lines={3} />
      <Skeleton.Block className="h-20" />
    </div>
  );
}
