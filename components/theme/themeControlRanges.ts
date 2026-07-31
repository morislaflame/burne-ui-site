/** Shared min/max/step for Theme builder Scale controls (site only).
 *
 * `min`/`max` — slider range (wider, still usable).
 * `shuffleMin`/`shuffleMax` — band used by Shuffle (keeps themes looking sane).
 */

export const SCALE_CONTROLS = [
  {
    key: "space" as const,
    min: 0.2,
    max: 1,
    shuffleMin: 0.35,
    shuffleMax: 0.65,
    step: 0.025,
    unit: "rem",
  },
  {
    key: "size" as const,
    min: 0.7,
    max: 1.4,
    shuffleMin: 0.85,
    shuffleMax: 1.15,
    step: 0.025,
    unit: "rem",
  },
  {
    key: "radius" as const,
    min: 0,
    max: 2,
    shuffleMin: 0,
    shuffleMax: 1.25,
    step: 0.025,
    unit: "rem",
  },
  {
    key: "borderWidth" as const,
    min: 0,
    max: 4,
    shuffleMin: 0,
    shuffleMax: 2,
    step: 0.5,
    unit: "px",
  },
  {
    key: "focusRingWidth" as const,
    min: 0,
    max: 6,
    shuffleMin: 0,
    shuffleMax: 3,
    step: 0.5,
    unit: "px",
  },
  {
    key: "focusRingOffset" as const,
    min: 0,
    max: 8,
    shuffleMin: 0,
    shuffleMax: 4,
    step: 1,
    unit: "px",
  },
  {
    key: "textScale" as const,
    min: 0.8,
    max: 1.4,
    shuffleMin: 0.95,
    shuffleMax: 1.15,
    step: 0.025,
    unit: "×",
  },
] as const;

export type ScaleControlKey = (typeof SCALE_CONTROLS)[number]["key"];
