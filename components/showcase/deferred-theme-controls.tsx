"use client";

import { ThemeControls } from "@/components/theme/ThemeControls";
import type { ThemeTokensApi } from "@/components/theme/useThemeTokens";

export function DeferredThemeControls({
  open,
  tokens,
}: {
  open: boolean;
  tokens: ThemeTokensApi;
}) {
  if (!open) return null;
  return <ThemeControls tokens={tokens} />;
}
