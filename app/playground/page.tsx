import type { Metadata } from "next";

import { HomePreview } from "@/components/home/HomePreview";

export const metadata: Metadata = {
  title: "Playground · Burne UI",
  description: "Live component previews with theme customization.",
};

export default function PlaygroundPage() {
  return <HomePreview />;
}
