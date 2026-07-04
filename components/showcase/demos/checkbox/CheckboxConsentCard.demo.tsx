import { useId, useState } from "react";
import { IoStar } from "react-icons/io5";

import { Checkbox } from "burne-ui";
import { Text } from "burne-ui";

export function CheckboxConsentCardDemo() {
  const [favorite, setFavorite] = useState(false);
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className="block w-full max-w-sm cursor-pointer rounded-mid border-token bg-secondary p-mid"
    >
      <Checkbox
        id={inputId}
        checked={favorite}
        onChange={(e) => setFavorite(e.target.checked)}
        className="w-full gap-x-plus gap-y-xsmall"
      >
        <Checkbox.Control>
          <Checkbox.Indicator size="large">
            <IoStar aria-hidden className="icon-small text-primary-foreground -translate-y-[0.5px]" />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <div id={`${inputId}-label`} className="min-w-0 flex flex-col gap-xsmall">
          <Text as="p" variant="base" className="font-medium">
            Become a Star 
          </Text>
          <Text as="p" variant="small" className="text-muted">
            Customize your experience with Burne
          </Text>
        </div>
      </Checkbox>
    </label>
  );
}
