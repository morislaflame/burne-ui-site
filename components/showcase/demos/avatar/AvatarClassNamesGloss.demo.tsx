import { Avatar } from "burne-ui";
import { PIN_IMAGE1, PIN_IMAGE2 } from "@/lib/showcase/mock-images";

export function AvatarClassNamesGlossDemo() {
  return (
    <div className="flex flex-wrap items-center gap-mid">
      <Avatar
        variant="gloss"
        size="base"
        label="Root"
        src={PIN_IMAGE1}
        alt=""
        loading="lazy"
        classNames={{
          root: "ring-2 ring-primary ring-offset-2 ring-offset-background",
          glossWrap: "rounded-full",
        }}
      />
      <Avatar
        variant="gloss"
        size="mid"
        label="Wrap"
        src={PIN_IMAGE2}
        alt=""
        loading="lazy"
        classNames={{
          root: "border border-info/40",
        }}
      />
      <Avatar
        variant="gloss"
        size="large"
        label="Fallback"
        className="text-primary"
        classNames={{
          root: "bg-primary/10 text-primary font-semibold",
        }}
      />
    </div>
  );
}
