import { IoBookmarkOutline } from "react-icons/io5";

import { ToggleButton } from "burne-ui";

export function ToggleButtonUncontrolledDemo() {
  return (
    <ToggleButton variant="default" defaultPressed leftIcon={<IoBookmarkOutline aria-hidden />}>
      Bookmark
    </ToggleButton>
  );
}
