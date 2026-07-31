import {
  applyColorPresetToState,
  COLOR_PRESET_DEFINITIONS,
  type ColorPresetKey,
} from "./colorPresets";
import { SCALE_CONTROLS } from "./themeControlRanges";
import type { ThemeEditorState } from "./themeDefaults";
import { FONT_PRESETS, MONO_FONT_PRESETS } from "./themePresets";

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

/** Random value on the same stepped grid as the Scale sliders. */
export function randomSteppedValue(min: number, max: number, step: number): number {
  const steps = Math.max(0, Math.round((max - min) / step));
  const index = Math.floor(Math.random() * (steps + 1));
  const raw = min + index * step;
  const decimals = step < 0.05 ? 3 : step < 1 ? 2 : 0;
  return Number(raw.toFixed(decimals));
}

const COLOR_PRESET_KEYS = Object.keys(COLOR_PRESET_DEFINITIONS) as ColorPresetKey[];

/**
 * Random color preset + Scale tokens + sans/mono fonts.
 * Motion / animation tokens are left unchanged.
 */
export function shuffleThemeState(prev: ThemeEditorState): ThemeEditorState {
  const withPreset = applyColorPresetToState(prev, pickRandom(COLOR_PRESET_KEYS));

  const scales = Object.fromEntries(
    SCALE_CONTROLS.map(({ key, min, max, shuffleMin, shuffleMax, step }) => [
      key,
      randomSteppedValue(shuffleMin ?? min, shuffleMax ?? max, step),
    ]),
  ) as Pick<ThemeEditorState, (typeof SCALE_CONTROLS)[number]["key"]>;

  return {
    ...withPreset,
    ...scales,
    fontFamily: pickRandom(FONT_PRESETS).value,
    fontFamilyMono: pickRandom(MONO_FONT_PRESETS).value,
  };
}
