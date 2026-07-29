import { Alert } from "burne-ui";
import { Button } from "burne-ui";

export function AlertWithActionDemo() {
  return (
    <Alert
      status="warning"
      classNames={{
        root: "rounded-large p-large bg-surface-tint-warning",
      }}
    >
      <Alert.Message>
        <Alert.Indicator className="text-foreground"/>
        <Alert.Content>
          <Alert.Title className="text-small">Session expires soon</Alert.Title>
          <Alert.Description className="text-base">Save your draft or continue working — you will be logged out in 5 minutes.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button variant="outline" size="small" className="shrink-0">
            Extend
          </Button>
        </Alert.Action>
      </Alert.Message>
    </Alert>
  );
}
