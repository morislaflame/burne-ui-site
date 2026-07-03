import { Link } from "burne-ui";
import { Text } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function LinkArticleInlineDemo() {
  return (
    <article className="w-full max-w-lg">
      <Text as="p" variant="base">
        Burne UI — component library with compound API. More details in{" "}
        <Link href="#" onClick={preventNav} underline>
          documentation
        </Link>{" "}
        or on{" "}
        <Link href="https://github.com" target="_blank" rel="noreferrer" showDefaultIcon>
          GitHub
        </Link>
        .
      </Text>
    </article>
  );
}
