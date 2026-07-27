import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

import {
  applyColorPresetToState,
  applyThemeModeToState,
  type ColorPresetKey,
} from "./colorPresets";
import {
  applyThemeTokens,
  clearThemeInlineTokens,
  createDefaultEditorState,
  exportBurneThemeConfigSource,
  exportThemeCss,
  MOTION_DEFAULTS,
  patchThemeColor,
  SCALE_DEFAULTS,
  themeTokenStateToConfig,
  type ThemeColorKey,
  type ThemeEditorState,
  type ThemeFontWeightKey,
  type ThemeMode,
  type ThemeStatusForegroundKey,
} from "./themeDefaults";
import { shuffleThemeState } from "./shuffleThemeState";
import { LAYOUT_PRESETS, type LayoutPresetKey } from "./themePresets";

const ThemeTokensContext = createContext<ThemeTokensApi | null>(null);

export function ThemeTokensProvider({ children }: { children: ReactNode }) {
  const api = useThemeTokensState();
  return createElement(ThemeTokensContext.Provider, { value: api }, children);
}

export function useThemeTokens(): ThemeTokensApi {
  const ctx = useContext(ThemeTokensContext);
  if (!ctx) {
    throw new Error("useThemeTokens must be inside ThemeTokensProvider.");
  }
  return ctx;
}

function useThemeTokensState() {
  const [state, setState] = useState<ThemeEditorState>(() => createDefaultEditorState("dark"));

  useLayoutEffect(() => {
    applyThemeTokens(state);
  }, [state]);

  useEffect(() => {
    return () => {
      clearThemeInlineTokens();
    };
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setState((prev) => applyThemeModeToState(prev, theme));
  }, []);

  const setScale = useCallback((key: "space" | "size" | "radius" | "textScale" | "borderWidth", value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFontFamily = useCallback((fontFamily: string) => {
    setState((prev) => ({ ...prev, fontFamily }));
  }, []);

  const setFontFamilyMono = useCallback((fontFamilyMono: string) => {
    setState((prev) => ({ ...prev, fontFamilyMono }));
  }, []);

  const setFontWeight = useCallback((key: ThemeFontWeightKey, value: number) => {
    setState((prev) => ({
      ...prev,
      fontWeights: { ...prev.fontWeights, [key]: value },
    }));
  }, []);

  const setShadowStrength = useCallback((shadowStrength: number) => {
    setState((prev) => ({ ...prev, shadowStrength }));
  }, []);

  const setShadowSize = useCallback((shadowSize: number) => {
    setState((prev) => ({ ...prev, shadowSize }));
  }, []);

  const setToastScrimSize = useCallback((toastScrimSize: number) => {
    setState((prev) => ({ ...prev, toastScrimSize }));
  }, []);

  const setToastScrimDensity = useCallback((toastScrimDensity: number) => {
    setState((prev) => ({ ...prev, toastScrimDensity }));
  }, []);

  const setMotionDuration = useCallback(
    (
      key:
        | "interactiveDuration"
        | "modalDuration"
        | "tooltipDuration"
        | "expandDuration"
        | "progressFillDuration"
        | "progressIndeterminateDuration"
        | "loadingDotsDuration"
        | "switchThumbDuration"
        | "selectionFillDuration"
        | "feedbackExpandDuration"
        | "rippleDefaultDuration"
        | "rippleExpandableDuration"
        | "surfaceTransitionDuration"
        | "toastDismissDuration",
      value: number,
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setMotionScale = useCallback(
    (
      key:
        | "hoverLiftScale"
        | "badgeAnchorHoverLiftScale"
        | "pressSqueezeMid"
        | "pressSqueezeDurationFactor"
        | "rippleDefaultOpacityFrom"
        | "rippleExpandableOpacityFrom",
      value: number,
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setMotionEase = useCallback(
    (
      key:
        | "interactiveEase"
        | "hoverLiftEase"
        | "switchThumbEase"
        | "selectionFillEase"
        | "expandOpenEase"
        | "progressFillEase"
        | "progressIndeterminateEase"
        | "loadingDotsEaseUp"
        | "loadingDotsEaseDown"
        | "toastDismissEase",
      value: string,
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setRippleEaseCss = useCallback((rippleEaseCss: string) => {
    setState((prev) => ({ ...prev, rippleEaseCss }));
  }, []);

  const setAnimationFlag = useCallback(
    (
      key:
        | "enableAnimations"
        | "enableHoverLift"
        | "enablePressSqueeze"
        | "enableToggleButtonFill"
        | "enableRipple"
        | "enableExpandable"
        | "enableToastStack"
        | "enableAsyncButtonCrossfade"
        | "enableContentFade"
        | "enableFeedbackExpand"
        | "enableProgressFill"
        | "enableLoadingDots"
        | "enableModalMotion"
        | "enableSwitchThumb"
        | "enableTabsIndicator"
        | "enablePaginationFlip"
        | "enableSelectionFill",
      value: boolean,
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setColor = useCallback((key: ThemeColorKey, value: string) => {
    setState((prev) => ({ ...patchThemeColor(prev, key, value), colorPreset: null }));
  }, []);

  const setStatusForeground = useCallback((key: ThemeStatusForegroundKey, value: string) => {
    setState((prev) => ({ ...patchThemeColor(prev, key, value), colorPreset: null }));
  }, []);

  const applyPreset = useCallback((preset: ColorPresetKey) => {
    setState((prev) => applyColorPresetToState(prev, preset, { resetScale: true }));
  }, []);

  const applyColorPreset = useCallback((preset: ColorPresetKey) => {
    setState((prev) => applyColorPresetToState(prev, preset));
  }, []);

  const applyLayoutPreset = useCallback((preset: LayoutPresetKey) => {
    const p = LAYOUT_PRESETS[preset];
    setState((prev) => ({ ...prev, ...p }));
  }, []);

  const reset = useCallback(() => {
    setState(createDefaultEditorState("dark"));
    clearThemeInlineTokens();
  }, []);

  const shuffle = useCallback(() => {
    setState((prev) => shuffleThemeState(prev));
  }, []);

  const copyCss = useCallback(async () => {
    const css = exportThemeCss(state);
    await navigator.clipboard.writeText(css);
    return css;
  }, [state]);

  /** TypeScript config for `BurneUIProvider config={...}` — save as `burne-theme.ts`. */
  const copyConfig = useCallback(async () => {
    const source = exportBurneThemeConfigSource(themeTokenStateToConfig(state));
    await navigator.clipboard.writeText(source);
    return source;
  }, [state]);

  return {
    state,
    setTheme,
    setScale,
    setFontFamily,
    setFontFamilyMono,
    setFontWeight,
    setShadowStrength,
    setShadowSize,
    setToastScrimSize,
    setToastScrimDensity,
    setMotionDuration,
    setMotionScale,
    setMotionEase,
    setRippleEaseCss,
    setAnimationFlag,
    setColor,
    setStatusForeground,
    applyPreset,
    applyColorPreset,
    applyLayoutPreset,
    reset,
    shuffle,
    copyCss,
    copyConfig,
    defaults: { ...SCALE_DEFAULTS, ...MOTION_DEFAULTS },
  };
}

export type ThemeTokensApi = ReturnType<typeof useThemeTokensState>;
