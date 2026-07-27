import { Avatar } from "burne-ui";
import { Badge } from "burne-ui";
import { PIN_IMAGE1, PIN_IMAGE3 } from "@/lib/showcase/mock-images";

export function BadgeAnchorDemo() {
  return (
    <div className="flex flex-wrap items-center gap-large">
      <Badge.Anchor>
        <Avatar size="large" label="Jordan Doe" src={PIN_IMAGE1} alt="" loading="lazy" />
        <Badge status="danger" variant="primary" size="small">
          5
        </Badge>
      </Badge.Anchor>
      <Badge.Anchor>
        <Avatar size="large" label="Casey Davis" src={PIN_IMAGE3} alt="" loading="lazy" />
        <Badge status="success" dot placement="bottom-right" size="small" aria-label="Online" />
      </Badge.Anchor>
    </div>
  );
}
