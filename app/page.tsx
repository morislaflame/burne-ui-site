import { redirect } from "next/navigation";

import { DEFAULT_SHOWCASE_PAGE_ID, showcasePagePath } from "@/lib/showcase/registry";

export default function Home() {
  redirect(showcasePagePath(DEFAULT_SHOWCASE_PAGE_ID));
}
