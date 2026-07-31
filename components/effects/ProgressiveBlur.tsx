"use client";

import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import gsap from "gsap";
import { cn } from "burne-ui";

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
  /** Surface tint strength on the shared substrate, in percent (0–100). Default 90. */
  tintIntensity?: number;
} & HTMLAttributes<HTMLDivElement>;

type BlurLayerStyle = Pick<
  CSSProperties,
  "maskImage" | "WebkitMaskImage" | "backdropFilter" | "WebkitBackdropFilter"
>;

function buildBlurLayerStyles(
  layers: number,
  angle: number,
  blurIntensity: number,
): BlurLayerStyle[] {
  const segmentSize = 1 / (layers + 1);
  const blurAt = gsap.utils.mapRange(0, layers - 1, 0, (layers - 1) * blurIntensity);

  return Array.from({ length: layers }, (_, index) => {
    const gradientStops = [
      index * segmentSize,
      (index + 1) * segmentSize,
      (index + 2) * segmentSize,
      (index + 3) * segmentSize,
    ].map(
      (pos, posIndex) =>
        `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
    );

    const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`;
    const blurPx = blurAt(index);

    return {
      maskImage: gradient,
      WebkitMaskImage: gradient,
      backdropFilter: `blur(${blurPx}px)`,
      WebkitBackdropFilter: `blur(${blurPx}px)`,
    };
  });
}

function buildTintStyle(angle: number, tintIntensity: number): CSSProperties | null {
  if (tintIntensity <= 0) return null;

  const tint = `color-mix(in oklab, var(--color-surface) ${tintIntensity.toFixed(2)}%, transparent)`;
  const gradient = `linear-gradient(${angle}deg, transparent 0%, ${tint} 100%)`;

  return {
    backgroundImage: gradient,
  };
}

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  tintIntensity = 90,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const angle = GRADIENT_ANGLES[direction];

  const blurLayerStyles = useMemo(
    () => buildBlurLayerStyles(layers, angle, blurIntensity),
    [angle, blurIntensity, layers],
  );

  const tintStyle = useMemo(
    () => buildTintStyle(angle, tintIntensity),
    [angle, tintIntensity],
  );

  return (
    <div className={cn("relative", className)} {...props}>
      {blurLayerStyles.map((style, index) => (
        <div
          key={index}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={style}
        />
      ))}
      {tintStyle ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={tintStyle}
        />
      ) : null}
    </div>
  );
}
