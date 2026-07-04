import { Avatar } from "burne-ui";
import { Badge } from "burne-ui";
import { Text } from "burne-ui";
import { PIN_IMAGE1, PIN_IMAGE2, PIN_IMAGE3 } from "@/lib/showcase/mock-images";

const USERS = [
  { label: "Kate Moore", src: PIN_IMAGE1, online: true },
  { label: "John Smith", src: PIN_IMAGE2, online: true },
  { label: "Sara Johnson", src: PIN_IMAGE3, online: false },
] as const;

export function AvatarPresenceRowDemo() {
  return (
    <div className="flex w-full max-w-component-small justify-center flex-col gap-mid">
      <Text as="p" variant="small" className="font-medium">
        Online status
      </Text>
      <ul className="flex flex-col gap-small">
        {USERS.map((user) => (
          <li key={user.label} className="flex items-center gap-mid">
            <Badge.Anchor>
              <Avatar size="base" label={user.label} src={user.src} alt="" loading="lazy" />
              <Badge
                status={user.online ? "success" : "default"}
                dot
                placement="bottom-right"
                size="small"
                aria-label={user.online ? "Online" : "Offline"}
              />
            </Badge.Anchor>
            <Text as="span" variant="small">
              {user.label}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
