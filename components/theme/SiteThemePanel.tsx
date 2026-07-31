"use client";

import { IoColorPaletteOutline } from "react-icons/io5";

import { Button, cn, Drawer } from "burne-ui";

import { ThemeControls } from "@/components/theme/ThemeControls";
import { useThemeTokens } from "@/components/theme/useThemeTokens";

/** Theme editor body — shell Surface / sizing owned by SiteAppShell. */
export function SiteThemeDesktopPanel() {
  const tokens = useThemeTokens();
  return <ThemeControls tokens={tokens} />;
}

export function SiteThemeMobileDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const tokens = useThemeTokens();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} placement="bottom">
      <div className="fixed bottom-6 right-6 z-30 md:hidden">
        <Button
          type="button"
          variant="gloss"
          aria-label="Theme settings"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn("flex items-center justify-center rounded-full shadow-token-large")}
          onClick={() => onOpenChange(true)}
        >
          <IoColorPaletteOutline className="size-6" />
        </Button>
      </div>

      <Drawer.Panel extent="default" className="h-[90dvh] max-h-[90dvh]">
        <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>Theme settings</Drawer.Title>
            <Drawer.Description>Set up theme tokens for Burne UI.</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
          <ThemeControls tokens={tokens} />
        </Drawer.Body>
      </Drawer.Panel>
    </Drawer>
  );
}
