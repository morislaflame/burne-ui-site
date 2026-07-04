import { Button } from "burne-ui";
import { Card } from "burne-ui";
import { Text } from "burne-ui";

export function CardClassNamesFullDemo() {
  return (
    <Card
      variant="secondary"
      classNames={{
        root: "rounded-large border-info/40 shadow-token-mid",
        header: "gap-xsmall",
        title: "text-primary font-semibold",
        description: "text-foreground/75",
        body: "pt-mid",
        footer: "border-primary/30",
      }}
      className="max-w-component-small"
    >
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
        <Card.Description>Setting up slots via classNames on root.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Text variant="small">Example body-slots with additional space at the top.</Text>
      </Card.Body>
      <Card.Footer>
        <Button size="small" variant="outline">
          Tune
        </Button>
      </Card.Footer>
    </Card>
  );
}
