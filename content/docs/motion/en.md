# Motion

Burne UI uses **GSAP**. Hover-lift, press-squeeze, ripple, async buttons, Loading dots, and more are controlled via **`configureMotion()`**.

## Where to call

| Environment | Place |
|-------------|--------|
| Vite / CRA | `main.tsx` before `createRoot(...).render(...)` |
| Next.js | Client provider in `layout.tsx`; prefer **`useLayoutEffect`**, not `useEffect` |

## Example (Next.js)

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

You can also put motion knobs in `burne-theme.ts` (`config.motion`) — `BurneUIProvider` applies them.

## Main `MotionConfig` groups

| Group | Keys |
|-------|------|
| Timings / easing | `interactiveDuration`, `modalDuration`, `tooltipDuration`, `expandDuration`, `*Ease` |
| CSS surface transitions | `surfaceTransitionDuration` → `--motion-surface-duration` |
| Hover / press | `hoverLiftScale`, `pressSqueezeScale` |
| Ripple | `rippleDefaultDuration`, `rippleExpandableDuration`, … |
| Master kill-switch | `enableAnimations: false` disables all feature flags |
| Feature flags | `enableHoverLift`, `enablePressSqueeze`, `enableRipple`, `enableModalMotion`, … |

Defaults live in **`MOTION_CONFIG_DEFAULTS`**. The library respects **`prefers-reduced-motion: reduce`**.
