import { Alert, type AlertSize } from "burne-ui";

const SIZES: AlertSize[] = ["small", "base", "mid", "large"];

export function AlertSizesDemo() {
  return (
    <div className="flex flex-col gap-mid">
      {SIZES.map((size) => (
        <Alert key={size} status="info" size={size}>
          <Alert.Message>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>size={size}</Alert.Title>
              <Alert.Description>
                Padding, icon, typography and radius follow the size grid (same rounded-* as Button).
              </Alert.Description>
            </Alert.Content>
          </Alert.Message>
        </Alert>
      ))}
    </div>
  );
}
