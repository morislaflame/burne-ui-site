# Toast

Оберните приложение, чтобы работал `useToast()`. С `BurneUIProvider` Toast включён по умолчанию (проп `toast`). Отдельно:

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

## Использование

```tsx
"use client";

import { Button, useToast } from "burne-ui";

export function SaveButton() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast.success("Сохранено", {
          description: "Изменения успешно применены",
        })
      }
    >
      Сохранить
    </Button>
  );
}
```

Доступны:

- `toast.show(...)`
- `toast.success(...)`, `toast.danger(...)`, `toast.warning(...)`, `toast.info(...)`
- `toast.promise(promise, { loading, success, error })`
- `toast.dismiss(id)`
