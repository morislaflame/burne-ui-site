import { Button } from "burne-ui";

export function ButtonAsyncClickDemo() {
  return (
    <Button
      ripple
      onAsyncClick={() =>
        new Promise<boolean>((resolve) => {
          window.setTimeout(() => resolve(true), 1400);
        })
      }
    >
      Async
    </Button>
  );
}
