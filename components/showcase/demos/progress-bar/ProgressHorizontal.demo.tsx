import { ProgressBar } from "burne-ui";

export function ProgressHorizontalDemo() {
  return (
    <div className="flex flex-col gap-mid w-full max-w-120">
      <ProgressBar label="Loading" value={62} className="w-full" />
      <ProgressBar label="Indeterminate" indeterminate className="w-full" />
      <ProgressBar label="Success" value={100} color="var(--color-success)" className="w-full" />
    </div>
  );
}
