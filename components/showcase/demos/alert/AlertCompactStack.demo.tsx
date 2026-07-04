import { Alert } from "burne-ui";

const ITEMS = [
  {
    status: "success" as const,
    title: "Deployment completed",
    description: "Preview on Vercel updated.",
    className: "border-l-4 border-primary bg-surface",
  },
  {
    status: "info" as const,
    title: "New comment",
    description: "Alex left a review to PR #42.",
    className: "border-l-4 border-primary bg-surface",
  },
] as const;

export function AlertCompactStackDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-base items-center justify-center">
      {ITEMS.map((item) => (
        <Alert
          key={item.title}
          status={item.status}
          title={item.title}
          description={item.description}
          className={item.className}
        />
      ))}
    </div>
  );
}
