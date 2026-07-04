"use client";

import { useState, type ReactNode } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";

import { Button, cn, Drawer } from "burne-ui";

import { ShowcaseSidebar } from "@/components/showcase/showcase-sidebar";
import { ThemeControls } from "@/components/theme/ThemeControls";
import { useThemeTokens } from "@/components/theme/useThemeTokens";

function DesktopThemePanel() {
  const tokens = useThemeTokens();

  return (
    <aside className="hidden md:flex h-full min-h-0 w-96 shrink-0 flex-col overflow-hidden border-l-token bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-mid">
        <ThemeControls tokens={tokens} />
      </div>
    </aside>
  );
}

function MobileThemeDrawer({
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
          className={cn(
            "flex items-center justify-center rounded-full shadow-token-large",
          )}
          onClick={() => onOpenChange(true)}
        >
          <IoColorPaletteOutline className="size-6" />
        </Button>
      </div>

      <Drawer.Panel size="default" className="h-[90dvh] max-h-[90dvh]">
        <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>Theme settings</Drawer.Title>
            <Drawer.Description>Set up theme tokens for Burne UI.</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body className="flex min-h-0 flex-1 flex-col overflow-y-auto p-mid">
          <ThemeControls tokens={tokens} />
        </Drawer.Body>
      </Drawer.Panel>
    </Drawer>
  );
}

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden showcase-shell">
      <aside className="hidden lg:flex h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r-token bg-surface">
        <ShowcaseSidebar />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="mx-auto w-full max-w-4xl px-mid py-xlarge">{children}</div>
        </main>
      </div>

      <DesktopThemePanel />
      <MobileThemeDrawer open={themeDrawerOpen} onOpenChange={setThemeDrawerOpen} />
    </div>
  );
}
