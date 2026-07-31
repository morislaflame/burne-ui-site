import { DocsShell } from "@/components/docs/docs-shell";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <DocsShell>{children}</DocsShell>
    </div>
  );
}
