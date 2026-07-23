import { Badge } from "burne-ui";
import { Button } from "burne-ui";

export function BadgeInboxButtonDemo() {
  return (
    <Badge.Anchor>
      <Button variant="outline" icon={<span aria-hidden>📬</span>}>
        Inbox
      </Button>
      <Badge status="danger" variant="primary" size="small" placement="top-right">
        12
      </Badge>
    </Badge.Anchor>
  );
}
