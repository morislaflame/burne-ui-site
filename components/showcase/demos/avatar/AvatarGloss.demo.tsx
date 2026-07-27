import { Avatar } from "burne-ui";
import { PIN_IMAGE1, PIN_IMAGE2 } from "@/lib/showcase/mock-images";

export function AvatarGlossDemo() {
  return (
    <div className="flex flex-wrap items-center gap-large">
      <Avatar variant="gloss" size="base" label="Gloss" src={PIN_IMAGE1} alt="" loading="lazy" />
      <Avatar variant="gloss" size="mid" label="Glass" src={PIN_IMAGE2} alt="" loading="lazy" />
      <Avatar variant="gloss" size="large" label="Fallback" />
    </div>
  );
}
