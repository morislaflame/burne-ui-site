import { ShowcaseShell } from "@/components/showcase/showcase-shell";

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ShowcaseShell>{children}</ShowcaseShell>
    </div>
  );
}
