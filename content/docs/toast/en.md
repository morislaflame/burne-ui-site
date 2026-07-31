# Toast

Wrap the app so `useToast()` works. With `BurneUIProvider`, Toast is enabled by default (`toast` prop). Standalone:

```tsx
"use client";

import { Toast } from "burne-ui";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider defaultPlacement="bottom-center" defaultVariant="default">
      {children}
    </Toast.Provider>
  );
}
```

## Usage

```tsx
"use client";

import { Button, useToast } from "burne-ui";

export function SaveButton() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast.success("Saved", {
          description: "Changes applied successfully",
        })
      }
    >
      Save
    </Button>
  );
}
```

Available:

- `toast.show(...)`
- `toast.success(...)`, `toast.danger(...)`, `toast.warning(...)`, `toast.info(...)`
- `toast.promise(promise, { loading, success, error })`
- `toast.dismiss(id)`
