# Motion

Burne UI использует **GSAP**. Hover-lift, press-squeeze, ripple, async-кнопки, Loading dots и др. настраиваются через **`configureMotion()`**.

## Где вызывать

| Среда | Место |
|-------|--------|
| Vite / CRA | `main.tsx` до `createRoot(...).render(...)` |
| Next.js | Client-провайдер в `layout.tsx`; предпочтительно **`useLayoutEffect`**, не `useEffect` |

## Пример (Next.js)

```tsx
"use client";

import { configureMotion } from "burne-ui";
import { useLayoutEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    configureMotion({
      interactiveDuration: 280,
      tooltipDuration: 200,
      expandDuration: 320,
      modalDuration: 280,
      enableAnimations: true,
      enableHoverLift: true,
      enablePressSqueeze: true,
      enableRipple: true,
    });
  }, []);

  return <>{children}</>;
}
```

Можно задать motion knobs в `burne-theme.ts` (`config.motion`) — `BurneUIProvider` применит их.

## Основные группы `MotionConfig`

| Группа | Ключи |
|--------|--------|
| Тайминги / easing | `interactiveDuration`, `modalDuration`, `tooltipDuration`, `expandDuration`, `*Ease` |
| CSS surface transitions | `surfaceTransitionDuration` → `--motion-surface-duration` |
| Hover / press | `hoverLiftScale`, `pressSqueezeScale` |
| Ripple | `rippleDefaultDuration`, `rippleExpandableDuration`, … |
| Master kill-switch | `enableAnimations: false` отключает все feature-флаги |
| Feature flags | `enableHoverLift`, `enablePressSqueeze`, `enableRipple`, `enableModalMotion`, … |

Дефолты — **`MOTION_CONFIG_DEFAULTS`**. Библиотека учитывает **`prefers-reduced-motion: reduce`**.
