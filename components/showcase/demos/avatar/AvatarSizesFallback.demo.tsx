import { IoPerson } from "react-icons/io5";

import { Avatar } from "burne-ui";
import { PIN_IMAGE2 } from "@/lib/showcase/mock-images";

export function AvatarSizesFallbackDemo() {
  return (
    <div className="flex flex-wrap items-center gap-mid">
      <Avatar size="small" label="S" />
      <Avatar size="base" label="B" />
      <Avatar size="mid" label="M" />
      <Avatar size="large" label="L" />
      <Avatar label="AB" />
      <Avatar label="Grace Hopper" src={PIN_IMAGE2} alt="" loading="lazy" nickname="grace_h" />
      <Avatar>
        <Avatar.Fallback>
          <IoPerson aria-hidden />
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
}
