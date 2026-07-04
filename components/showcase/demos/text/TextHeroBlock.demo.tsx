import { Text } from "burne-ui";

export function TextHeroBlockDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-small rounded-mid border border-primary/20 bg-gradient-to-br from-primary/10 via-surface to-surface p-mid">
      <Text as="span" variant="tools" className="uppercase tracking-widest text-primary">
        Burne UI · Showcase
      </Text>
      <Text
        as="h2"
        variant="accent-header"
      >
        Custom hero-block
      </Text>
      <Text as="p" variant="base" className="max-w-md text-muted">
        Gradient on the header and background solid - via utility-classes on top preset variant.
      </Text>
    </div>
  );
}
