import type { Metadata } from "next";

import { HomeLanding } from "@/components/home/HomeLanding";

export const metadata: Metadata = {
  title: "Burne UI",
  description:
    "Modern React design system — themes, motion, and components.",
};

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <main className="site-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain pt-[var(--site-chrome-height)]">
        <HomeLanding />
      </main>
    </div>
  );
}
