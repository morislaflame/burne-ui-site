/**
 * Theme defaults / apply / export — re-exported from `burne-ui`.
 * Named color/font/layout presets live in `./themePresets` + `./colorPresets` + `./themePalettes`.
 * Editor labels live in `./themeEditorChrome`.
 */
export {
  COLOR_CSS_VAR,
  DEFAULT_FONT,
  DEFAULT_FONT_MONO,
  FONT_WEIGHT_CSS_VAR,
  FONT_WEIGHT_DEFAULTS,
  MOTION_DEFAULTS,
  SCALE_DEFAULTS,
  TEXT_SCALE_BASES,
  applyThemeTokens,
  clearThemeInlineTokens,
  createDefaultThemeState,
  exportBurneThemeConfigSource,
  exportThemeCss,
  activateThemeModePalette,
  ensureModePalettes,
  patchThemeColor,
  themeTokenStateToConfig,
  type ThemeColorKey,
  type ThemeColors,
  type ThemeFontWeightKey,
  type ThemeFontWeights,
  type ThemeMode,
  type ThemeStatusForegroundKey,
  type ThemeStatusForegrounds,
  type ThemeTokenState,
} from "burne-ui";

export {
  ANIMATION_FLAG_LABELS,
  COLOR_LABELS,
  FONT_WEIGHT_LABELS,
  GSAP_EASE_OPTIONS,
  MOTION_DURATION_LABELS,
  MOTION_EASE_LABELS,
  MOTION_SCALE_LABELS,
  RIPPLE_EASE_CSS_OPTIONS,
  SCALE_TOKEN_LABELS,
  STATUS_FOREGROUND_LABELS,
} from "./themeEditorChrome";

export {
  FONT_PRESETS,
  LAYOUT_PRESETS,
  MONO_FONT_PRESETS,
  type LayoutPresetKey,
} from "./themePresets";

export type { ColorPresetKey } from "./colorPresets";

import {
  createDefaultThemeState,
  type ThemeMode,
  type ThemeTokenState,
} from "burne-ui";

/** Docs theme-builder state — kit tokens + active named color preset id. */
export type ThemeEditorState = ThemeTokenState & {
  colorPreset: string | null;
};

export function createDefaultEditorState(theme: ThemeMode = "dark"): ThemeEditorState {
  return { ...createDefaultThemeState(theme), colorPreset: null };
}
