import { useState } from "react";

import { Button } from "burne-ui";
import { Label } from "burne-ui";
import { Select } from "burne-ui";
import { Separator } from "burne-ui";
import { Slider } from "burne-ui";
import { Switch } from "burne-ui";
import { Text } from "burne-ui";
import { cn } from "burne-ui";
import type { SelectOption } from "burne-ui";

import {
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
  type ThemeColorKey,
  type ThemeFontWeightKey,
  type ThemeStatusForegroundKey,
} from "./themeDefaults";
import { SCALE_CONTROLS } from "./themeControlRanges";
import { FONT_PRESETS, MONO_FONT_PRESETS } from "./themePresets";
import {
  buildTintValue,
  parseTintValue,
  TINT_MIX_MODE_LABELS,
  type ParsedTint,
  type TintMixMode,
} from "./tintMix";
import type { ThemeTokensApi } from "./useThemeTokens";

const TINT_COLOR_KEYS = new Set<ThemeColorKey>(["primaryTint", "primaryTintStrong"]);

const FONT_WEIGHT_OPTIONS = [300, 400, 500, 600, 700, 800] as const;

const MOTION_DURATION_CONTROLS = [
  { key: "interactiveDuration" as const, min: 120, max: 600, step: 10, unit: "ms" },
  { key: "modalDuration" as const, min: 120, max: 600, step: 10, unit: "ms" },
  { key: "tooltipDuration" as const, min: 80, max: 400, step: 10, unit: "ms" },
  { key: "switchThumbDuration" as const, min: 120, max: 600, step: 10, unit: "ms" },
  { key: "selectionFillDuration" as const, min: 120, max: 800, step: 10, unit: "ms" },
  { key: "expandDuration" as const, min: 100, max: 800, step: 10, unit: "ms" },
  { key: "feedbackExpandDuration" as const, min: 200, max: 1200, step: 10, unit: "ms" },
  { key: "rippleDefaultDuration" as const, min: 200, max: 1200, step: 10, unit: "ms" },
  { key: "rippleExpandableDuration" as const, min: 200, max: 1200, step: 10, unit: "ms" },
  { key: "progressFillDuration" as const, min: 120, max: 1200, step: 10, unit: "ms" },
  { key: "progressIndeterminateDuration" as const, min: 400, max: 3000, step: 50, unit: "ms" },
  { key: "loadingDotsDuration" as const, min: 300, max: 2400, step: 50, unit: "ms" },
  { key: "surfaceTransitionDuration" as const, min: 120, max: 1200, step: 20, unit: "ms" },
  { key: "toastDismissDuration" as const, min: 80, max: 600, step: 10, unit: "ms" },
] as const;

const MOTION_SCALE_CONTROLS = [
  { key: "hoverLiftScale" as const, min: 1, max: 1.08, step: 0.005, unit: "×" },
  { key: "badgeAnchorHoverLiftScale" as const, min: 1, max: 1.1, step: 0.005, unit: "×" },
  { key: "pressSqueezeMid" as const, min: 0.92, max: 1, step: 0.005, unit: "×" },
  { key: "pressSqueezeDurationFactor" as const, min: 1, max: 2, step: 0.05, unit: "×" },
  { key: "rippleDefaultOpacityFrom" as const, min: 0.1, max: 0.8, step: 0.02, unit: "" },
  { key: "rippleExpandableOpacityFrom" as const, min: 0.1, max: 0.8, step: 0.02, unit: "" },
] as const;

const MOTION_EASE_KEYS = Object.keys(MOTION_EASE_LABELS) as (keyof typeof MOTION_EASE_LABELS)[];

const ANIMATION_FLAG_KEYS = Object.keys(ANIMATION_FLAG_LABELS) as (keyof typeof ANIMATION_FLAG_LABELS)[];

function formatSliderValue(value: number, step: number, unit: string) {
  const decimals = step < 0.05 ? 2 : step < 1 ? 1 : 0;
  return `${value.toFixed(decimals)}${unit}`;
}

const TINT_DEFAULT_PERCENT: Record<"primaryTint" | "primaryTintStrong", number> = {
  primaryTint: 20,
  primaryTintStrong: 25,
};

const COLOR_GROUPS: { label: string; keys: ThemeColorKey[] }[] = [
  {
    label: "surface tokens",
    keys: [
      "background",
      "surface",
      "secondary",
      "secondaryForeground",
      "tertiary",
      "tertiaryForeground",
    ],
  },
  {
    label: "content tokens",
    keys: ["foreground", "muted", "border"],
  },
  {
    label: "primary tokens",
    keys: [
      "primary",
      "primaryForeground",
      "primaryTint",
      "primaryTintStrong",
      "indicator",
      "indicatorForeground",
    ],
  },
  {
    label: "focus ring tokens",
    keys: [
      "focusRing",
      "focusRingDanger",
      "focusRingSuccess",
      "focusRingInfo",
      "focusRingWarning",
    ],
  },
  {
    label: "status tokens",
    keys: ["danger", "success", "info", "warning"],
  },
  {
    label: "hover tokens",
    keys: [
      "primaryHover",
      "defaultHover",
      "secondaryHover",
      "tertiaryHover",
      "surfaceTintDanger",
      "surfaceTintDangerHover",
      "dangerFillHover",
      "surfaceTintSuccess",
      "surfaceTintSuccessHover",
      "successFillHover",
      "surfaceTintInfo",
      "surfaceTintInfoHover",
      "infoFillHover",
      "surfaceTintWarning",
      "surfaceTintWarningHover",
      "warningFillHover",
    ],
  },
  {
    label: "ripple tokens",
    keys: [
      "convergeRipplePrimaryFill",
      "convergeRippleNeutral",
      "convergeRippleNeutralMuted",
      "convergeRippleDanger",
      "convergeRippleSuccess",
      "convergeRippleInfo",
      "convergeRippleWarning",
    ],
  },
];

const STATUS_FOREGROUND_KEYS = Object.keys(
  STATUS_FOREGROUND_LABELS,
) as ThemeStatusForegroundKey[];

function SectionTitle({ children }: { children: string }) {
  return (
    <Text as="span" variant="base" className="text-muted">
      {children}
    </Text>
  );
}

function ScaleControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <Slider
      size="small"
      gloss
      thickness={12}
      classNames={{
        value: "text-xsmall",
      }}
      label={label}
      showValue
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onChange}
      formatValue={(next) => formatSliderValue(next, step, unit)}
    />
  );
}

function ThemeSelect({
  label,
  value,
  options,
  onChange,
  id,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  id?: string;
}) {
  return (
    <Select
      id={id}
      size="small"
      variant="gloss"
      label={label}
      value={value}
      options={options}
      onValueChange={onChange}
    />
  );
}

function ThemeStringSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const resolved = options.includes(value) ? options : [value, ...options];

  return (
    <ThemeSelect
      label={label}
      value={value}
      options={resolved.map((item) => ({ value: item, label: item }))}
      onChange={onChange}
    />
  );
}

function MotionEaseSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return <ThemeStringSelect label={label} value={value} options={options} onChange={onChange} />;
}

function ColorControl({
  label,
  value,
  onChange,
  previewBackground,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** When `value` — formula, preview via CSS var (For example `var(--color-border)`). */
  previewBackground?: string;
}) {
  const isHex = /^#[0-9a-f]{6}$/i.test(value.trim());
  const pickerValue = isHex ? value.trim() : "#000000";
  const preview = previewBackground ?? value;

  return (
    <div className="flex flex-col gap-small">
      <Label className="text-small text-muted">{label}</Label>
      <div className="flex items-center gap-small">
        <div
          className="size-8 shrink-0 rounded-small border-token"
          style={{ background: preview }}
          title="preview"
        />
        {isHex ? (
          <input
            type="color"
            value={pickerValue}
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${label} — picker`}
            className="size-8 shrink-0 cursor-pointer rounded-small bg-transparent p-0.5"
          />
        ) : null}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} — CSS`}
          className={cn(
            "min-w-0 flex-1 rounded-base border-token bg-surface px-small py-xsmall font-mono text-xsmall text-foreground outline-none",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
        />
      </div>
    </div>
  );
}

function TintColorControl({
  label,
  value,
  defaultPercent,
  onChange,
}: {
  label: string;
  value: string;
  defaultPercent: number;
  onChange: (value: string) => void;
}) {
  const parsed = parseTintValue(value);

  const apply = (patch: Partial<ParsedTint>) => {
    const next: ParsedTint = { ...parsed, ...patch };
    if (patch.mode != null && patch.mode !== "custom" && parsed.mode === "custom") {
      next.percent = defaultPercent;
    }
    onChange(buildTintValue(next));
  };

  const mixColorHex = /^#[0-9a-f]{6}$/i.test(parsed.mixColor) ? parsed.mixColor : "#4361ee";

  return (
    <div className="flex flex-col gap-small rounded-base border-token bg-secondary p-small">
      <div className="flex items-center gap-small">
        <div
          className="size-8 shrink-0 rounded-small border-token"
          style={{ background: value }}
          title="tint preview"
        />
        <Label className="text-small text-muted">{label}</Label>
      </div>

      <ThemeSelect
        label="Mix mode"
        value={parsed.mode}
        options={(Object.keys(TINT_MIX_MODE_LABELS) as TintMixMode[]).map((mode) => ({
          value: mode,
          label: TINT_MIX_MODE_LABELS[mode],
        }))}
        onChange={(mode) => apply({ mode: mode as TintMixMode })}
      />

      {parsed.mode !== "custom" ? (
        <>
          <Slider
            size="small"
            label="Mix amount"
            showValue
            value={parsed.percent}
            min={0}
            max={40}
            step={1}
            onValueChange={(percent: number) => apply({ percent })}
            formatValue={(next: number) => `${next}%`}
          />

          {parsed.mode === "color-surface" ? (
            <div className="flex items-center gap-small">
              <input
                type="color"
                value={mixColorHex}
                onChange={(e) => apply({ mixColor: e.target.value })}
                aria-label={`${label} — mix color`}
                className="size-8 shrink-0 cursor-pointer rounded-small bg-transparent p-0.5"
              />
              <Text as="span" variant="xsmall" className="font-mono text-muted">
                {parsed.mixColor}
              </Text>
            </div>
          ) : null}
        </>
      ) : (
        <input
          type="text"
          value={parsed.custom}
          onChange={(e) => apply({ custom: e.target.value })}
          aria-label={`${label} — custom CSS`}
          className={cn(
            "w-full rounded-base border-token bg-surface px-small py-xsmall font-mono text-xsmall text-foreground outline-none",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
        />
      )}

      <Text as="span" variant="xsmall" className="truncate font-mono text-muted" title={value}>
        {value}
      </Text>
    </div>
  );
}

function FontWeightSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <ThemeSelect
      id={id}
      label={label}
      value={String(value)}
      options={FONT_WEIGHT_OPTIONS.map((weight) => ({
        value: String(weight),
        label: String(weight),
      }))}
      onChange={(next) => onChange(Number(next))}
    />
  );
}

function FontSelect({
  id,
  label,
  value,
  presets,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  presets: readonly { id: string; label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const matchedPreset = presets.find((p) => p.value === value);
  const selectValue = matchedPreset?.id ?? "custom";
  const options: SelectOption[] = [
    ...(matchedPreset ? [] : [{ value: "custom", label: "Custom" }]),
    ...presets.map((preset) => ({ value: preset.id, label: preset.label })),
  ];

  return (
    <ThemeSelect
      id={id}
      label={label}
      value={selectValue}
      options={options}
      onChange={(presetId) => {
        const preset = presets.find((p) => p.id === presetId);
        if (preset) onChange(preset.value);
      }}
    />
  );
}

function SpacingPreview({ space }: { space: number }) {
  const steps = [
    { name: "xsmall", mult: 0.5 },
    { name: "small", mult: 0.75 },
    { name: "base", mult: 1 },
    { name: "mid", mult: 2 },
    { name: "large", mult: 2.5 },
  ] as const;

  return (
    <div className="flex items-end gap-xsmall rounded-small p-base mt-mid gloss-panel">
      {steps.map(({ name, mult }) => (
        <div key={name} className="flex flex-1 flex-col items-center gap-xsmall">
          <div
            className="w-full rounded-xsmall bg-primary/30"
            style={{ height: `${space * mult * 16}px` }}
            title={`--space-${name}`}
          />
          <Text as="span" variant="xsmall" className="text-muted">
            {name}
          </Text>
        </div>
      ))}
    </div>
  );
}

export function ThemeControls({ tokens }: { tokens: ThemeTokensApi }) {
  const {
    state,
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
    applyColorPreset,
    applyLayoutPreset,
    reset,
    shuffle,
    copyCss,
    copyConfig,
  } = tokens;
  const [copied, setCopied] = useState<"css" | "config" | null>(null);

  const handleCopyCss = async () => {
    await copyCss();
    setCopied("css");
    window.setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyConfig = async () => {
    await copyConfig();
    setCopied("config");
    window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-large">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-small mb-base">
            <Text as="h2" variant="header-2">
              Theme tokens
            </Text>
            
          </div>
          <Text as="p" variant="base" className="text-muted">
            Change your theme tokens right here. Copy CSS for a stylesheet, or Copy config for{" "}
            <Text as="span" variant="base" className="text-foreground font-mono text-[0.85em]">
              BurneUIProvider
            </Text>
            . Shared layout/motion live in{" "}
            <Text as="span" variant="base" className="text-foreground font-mono text-[0.85em]">
              tokens
            </Text>
            ; colors in{" "}
            <Text as="span" variant="base" className="text-foreground font-mono text-[0.85em]">
              colors.light
            </Text>
            {" / "}
            <Text as="span" variant="base" className="text-foreground font-mono text-[0.85em]">
              colors.dark
            </Text>
            .
          </Text>
        </div>
        <div className="flex shrink-0 flex-wrap gap-xsmall">
              <Button type="button" size="small" variant="primary" onClick={reset}>
                Reset
              </Button>
              <Button
                type="button"
                size="small"
                variant="secondary"
                onClick={shuffle}
                title="Random color preset, scale tokens, and fonts (motion unchanged)"
              >
                Shuffle
              </Button>
              <Button type="button" size="small" variant="gloss" onClick={handleCopyCss}>
                {copied === "css" ? "Copied CSS" : "Copy CSS"}
              </Button>
              <Button type="button" size="small" variant="outline" onClick={handleCopyConfig}>
                {copied === "config" ? "Copied config" : "Copy config"}
              </Button>
         </div>

      <div className="flex flex-col gap-base">
        <Text as="span" variant="base" className="text-muted">
          Color presets
        </Text>
        <div className="flex flex-wrap gap-xsmall">
          {(
            [
              { id: "default", label: "Default" },
              { id: "contrast", label: "Contrast" },
              { id: "ocean", label: "Ocean" },
              { id: "violet", label: "Violet" },
              { id: "emerald", label: "Emerald" },
              { id: "rose", label: "Rose" },
              { id: "amber", label: "Amber" },
              { id: "slate", label: "Slate" },
              { id: "toffee", label: "Toffee" },
              { id: "berry", label: "Berry" },
              { id: "paprika", label: "Paprika" },
              { id: "cherry", label: "Cherry" },
              { id: "rustic", label: "Rustic" },
              { id: "earthy", label: "Earthy" },
              { id: "peach", label: "Peach" },
              { id: "sand", label: "Sand" },
              { id: "bold", label: "Bold" },
              { id: "autumn", label: "Autumn" },
              { id: "harvest", label: "Harvest" },
              { id: "mystic", label: "Mystic" },
            ] as const
          ).map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              size="small"
              variant="outline"
              onClick={() => applyColorPreset(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-base">
        <Text as="span" variant="base" className="text-muted">
          Layout presets
        </Text>
        <div className="flex flex-wrap gap-xsmall">
          <Button type="button" size="small" variant="outline" onClick={() => applyLayoutPreset("compact")}>
            Compact
          </Button>
          <Button type="button" size="small" variant="outline" onClick={() => applyLayoutPreset("spacious")}>
            Spacious
          </Button>
          <Button type="button" size="small" variant="outline" onClick={() => applyLayoutPreset("flat")}>
            Flat
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-base">
        <SectionTitle>Scale</SectionTitle> 
        {SCALE_CONTROLS.map(({ key, min, max, step, unit }) => (
          <ScaleControl
            key={key}
            label={SCALE_TOKEN_LABELS[key]}
            value={state[key]}
            min={min}
            max={max}
            step={step}
            unit={unit}
            onChange={(v) => setScale(key, v)}
          />
        ))}
        <SpacingPreview space={state.space} />
      </div>

      <Separator />

      <div className="flex flex-col gap-small">
        <SectionTitle>Fonts</SectionTitle>
        <FontSelect
          id="theme-font-sans"
          label="Sans"
          value={state.fontFamily}
          presets={FONT_PRESETS}
          onChange={setFontFamily}
        />
        <FontSelect
          id="theme-font-mono"
          label="Mono"
          value={state.fontFamilyMono}
          presets={MONO_FONT_PRESETS}
          onChange={setFontFamilyMono}
        />
        <div className="rounded-small p-base text-muted gloss-panel mt-mid">
          <Text as="p" variant="small">
            <span className="font-sans">Aa Bb 123 — sans</span>
            <br />
            <span className="font-mono">{`{ code: true }`}</span>
          </Text>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-small">
        <SectionTitle>Typeface</SectionTitle>
        {(Object.keys(FONT_WEIGHT_LABELS) as ThemeFontWeightKey[]).map((key) => (
          <FontWeightSelect
            key={key}
            id={`theme-font-weight-${key}`}
            label={FONT_WEIGHT_LABELS[key]}
            value={state.fontWeights[key]}
            onChange={(value) => setFontWeight(key, value)}
          />
        ))}
        <div className="rounded-small p-base text-muted gloss-panel mt-mid">
          <Text as="p" variant="small">
          <span className="font-w-small">Small — small text</span>
          <br />
          <span className="font-w-base">Base — main text</span>
          <br />
          <span className="font-w-mid">Mid — controls</span>
          <br />
          <span className="font-w-strong">Strong — headers</span>
          <br />
          <span className="font-w-bold">Bold — accent</span>
          </Text>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-base">
        <SectionTitle>Motion (GSAP)</SectionTitle>
        <div className="flex flex-col gap-base">
          <Text as="p" variant="xsmall" className="text-muted">
            Durations
          </Text>
          {MOTION_DURATION_CONTROLS.map(({ key, min, max, step, unit }) => (
            <ScaleControl
              key={key}
              label={MOTION_DURATION_LABELS[key]}
              value={state[key]}
              min={min}
              max={max}
              step={step}
              unit={unit}
              onChange={(v) => setMotionDuration(key, v)}
            />
          ))}
        </div>
        <Text as="p" variant="xsmall" className="mt-xsmall text-muted">
          Scales & opacity
        </Text>
        {MOTION_SCALE_CONTROLS.map(({ key, min, max, step, unit }) => (
          <ScaleControl
            key={key}
            label={MOTION_SCALE_LABELS[key]}
            value={state[key]}
            min={min}
            max={max}
            step={step}
            unit={unit}
            onChange={(v) => setMotionScale(key, v)}
          />
        ))}
        <Text as="p" variant="xsmall" className="mt-xsmall text-muted">
          Easing
        </Text>
        {MOTION_EASE_KEYS.map((key) => (
          <MotionEaseSelect
            key={key}
            label={MOTION_EASE_LABELS[key]}
            value={state[key]}
            options={GSAP_EASE_OPTIONS}
            onChange={(value) => setMotionEase(key, value)}
          />
        ))}
        <MotionEaseSelect
          label="Ripple CSS easing"
          value={state.rippleEaseCss}
          options={RIPPLE_EASE_CSS_OPTIONS}
          onChange={setRippleEaseCss}
        />
        
      </div>

      <Separator />

      <div className="flex flex-col gap-base">
        <SectionTitle>Shadows</SectionTitle>
        <ScaleControl
          label={SCALE_TOKEN_LABELS.shadowStrength}
          value={state.shadowStrength}
          min={0.5}
          max={1.75}
          step={0.05}
          unit="×"
          onChange={setShadowStrength}
        />
        <ScaleControl
          label={SCALE_TOKEN_LABELS.shadowSize}
          value={state.shadowSize}
          min={0.5}
          max={2}
          step={0.05}
          unit="×"
          onChange={setShadowSize}
        />
        <ScaleControl
          label={SCALE_TOKEN_LABELS.toastScrimSize}
          value={state.toastScrimSize}
          min={0.5}
          max={2}
          step={0.05}
          unit="×"
          onChange={setToastScrimSize}
        />
        <ScaleControl
          label={SCALE_TOKEN_LABELS.toastScrimDensity}
          value={state.toastScrimDensity}
          min={0}
          max={2}
          step={0.05}
          unit="×"
          onChange={setToastScrimDensity}
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-base">
        <SectionTitle>Animations</SectionTitle>
        <div className="flex flex-col gap-small rounded-base p-base gloss-panel">
          <Switch
            checked={state.enableAnimations}
            onChange={(e) => setAnimationFlag("enableAnimations", e.target.checked)}
            label="Enable all animations (master)"
          />
          <Separator className="my-xsmall opacity-50" />
          {ANIMATION_FLAG_KEYS.map((key) => (
            <Switch
              key={key}
              checked={state[key]}
              onChange={(e) => setAnimationFlag(key, e.target.checked)}
              label={ANIMATION_FLAG_LABELS[key]}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-small">
        <SectionTitle>Colors</SectionTitle>
        <div className="flex flex-col gap-small">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-small">
              <Text as="span" variant="small" className="text-muted">
                {group.label}
              </Text>
              {group.keys.map((key) =>
                TINT_COLOR_KEYS.has(key) ? (
                  <TintColorControl
                    key={key}
                    label={COLOR_LABELS[key]}
                    value={state.colors[key]}
                    defaultPercent={TINT_DEFAULT_PERCENT[key as "primaryTint" | "primaryTintStrong"]}
                    onChange={(value) => setColor(key, value)}
                  />
                ) : (
                  <ColorControl
                    key={key}
                    label={COLOR_LABELS[key]}
                    value={state.colors[key]}
                    onChange={(value) => setColor(key, value)}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-small">
        <SectionTitle>Status foreground</SectionTitle>
        <div className="flex flex-col gap-small">
          {STATUS_FOREGROUND_KEYS.map((key) => (
            <ColorControl
              key={key}
              label={STATUS_FOREGROUND_LABELS[key]}
              value={state.colors[key]}
              onChange={(value) => setStatusForeground(key, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
