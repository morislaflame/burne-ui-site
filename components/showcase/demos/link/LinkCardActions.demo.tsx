import { IoOpenOutline, IoShareSocialOutline } from "react-icons/io5";

import { Link } from "burne-ui";
import { Surface } from "burne-ui";
import { Text } from "burne-ui";

import { preventNav } from "@/lib/showcase/shared/utils";

export function LinkCardActionsDemo() {
  return (
    <Surface variant="secondary" padding="large" className="flex w-full max-w-sm flex-col gap-large">
      <div className="flex flex-col gap-xsmall">
        <Text as="p" variant="base" className="font-medium">
          Release 1.2.0
        </Text>
        <Text as="p" variant="xsmall" className="text-muted">
          Updating form components and gloss-options.
        </Text>
      </div>
      <div className="flex flex-wrap gap-large">
        <Link href="#" onClick={preventNav} icon={<IoOpenOutline aria-hidden />} size="small" underline>
          Changelog
        </Link>
        <Link href="#" onClick={preventNav} icon={<IoShareSocialOutline aria-hidden />} size="small">
          Share
        </Link>
      </div>
    </Surface>
  );
}
