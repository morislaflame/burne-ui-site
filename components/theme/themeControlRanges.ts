/** Shared min/max/step for Theme builder Scale controls (site only). */

export const SCALE_CONTROLS = [
  { key: "space" as const, min: 0.3, max: 0.8, step: 0.025, unit: "rem" },
  { key: "size" as const, min: 0.8, max: 1.25, step: 0.025, unit: "rem" },
  { key: "radius" as const, min: 0, max: 1.5, step: 0.025, unit: "rem" },
  { key: "borderWidth" as const, min: 0, max: 2, step: 0.5, unit: "px" },
  { key: "textScale" as const, min: 0.85, max: 1.2, step: 0.025, unit: "×" },
] as const;

export type ScaleControlKey = (typeof SCALE_CONTROLS)[number]["key"];
