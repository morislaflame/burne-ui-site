import { Skeleton } from "burne-ui";

export function SkeletonBasicShapesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-mid">
      <Skeleton className="h-10 w-32" />
      <Skeleton.Circle />
    </div>
  );
}
