import { Alert } from "burne-ui";
import { Button } from "burne-ui";
import { Text } from "burne-ui";

export function AlertCompoundBannerDemo() {
  return (
    <Alert className="rounded-large p-large" variant="gloss">
      <Alert.Message>
        <Alert.Content>
          <Alert.Title className="text-large">Early access to gloss theme</Alert.Title>
          <Alert.Description>
            <Text as="span" variant="small" className="text-muted">
              Enable the experiment in the workspace settings — available until the end of the month.
            </Text>
          </Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button variant="gloss" size="small">
            Enable
          </Button>
        </Alert.Action>
      </Alert.Message>
    </Alert>
  );
}
