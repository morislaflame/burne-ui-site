import { Alert } from "burne-ui";

const ITEMS = [
  {
    status: "success" as const,
    title: "Deployment completed",
    description: "Preview on Vercel updated.",
    className: "border-l-4 border-success bg-success/5",
  },
  {
    status: "info" as const,
    title: "New comment",
    description: "Alex left a review to PR #42.",
    className: "border-l-4 border-info bg-info/5",
  },
] as const;

export function AlertCompactStackDemo() {
  return (
    <div className="flex flex-col gap-base">
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
