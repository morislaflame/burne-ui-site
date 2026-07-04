import { Skeleton } from "burne-ui";

export function SkeletonTextBlockDemo() {
  return (
    <div className="flex max-w-component-small w-full flex-col gap-small">
      <Skeleton.Text lines={3} className="w-full"/>
      <Skeleton.Block className="h-20 w-full" />
    </div>
  );
}
