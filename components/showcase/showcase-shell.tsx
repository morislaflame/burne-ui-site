"use client";

import { useState, type ReactNode } from "react";
import { IoColorPaletteOutline, IoMenuOutline } from "react-icons/io5";

import { Button, cn, Drawer, Text } from "burne-ui";

import { DeferredThemeControls } from "@/components/showcase/deferred-theme-controls";
import { getActiveShowcaseLabel, ShowcaseSidebar } from "@/components/showcase/showcase-sidebar";
import { ThemeControls } from "@/components/theme/ThemeControls";
import { useThemeTokens } from "@/components/theme/useThemeTokens";
import { usePathname } from "next/navigation";

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
        <Drawer.Trigger asChild>
          <Button
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full p-0 shadow-token-large",
              "bg-primary text-primary-foreground hover:bg-primary-hover",
            )}
            aria-label="Theme settings"
          >
            <IoColorPaletteOutline className="size-6" />
          </Button>
        </Drawer.Trigger>
      </div>

      <Drawer.Panel size="default">
        <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>Theme settings</Drawer.Title>
            <Drawer.Description>Set up theme tokens for Burne UI.</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body className="p-mid">
          <DeferredThemeControls open={open} tokens={tokens} />
        </Drawer.Body>
      </Drawer.Panel>
    </Drawer>
  );
}

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  const activeLabel = getActiveShowcaseLabel(pathname);

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden showcase-shell">
      <aside className="hidden lg:flex h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r-token bg-surface">
        <ShowcaseSidebar />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-token bg-surface/90 px-mid py-xsmall backdrop-blur-md lg:hidden">
          <Text as="span" variant="base" className="font-semibold text-foreground">
            {activeLabel ?? "Components"}
          </Text>
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} placement="left">
            <Drawer.Trigger asChild>
              <Button
                size="small"
                variant="outline"
                leftIcon={<IoMenuOutline className="size-4" />}
              >
                Components
              </Button>
            </Drawer.Trigger>

            <Drawer.Panel size="default">
              <Drawer.Header>
                <Drawer.HeadingBlock>
                  <Drawer.Title>Components</Drawer.Title>
                  <Drawer.Description>Select a component to view.</Drawer.Description>
                </Drawer.HeadingBlock>
                <Drawer.Close />
              </Drawer.Header>
              <Drawer.Body className="p-0">
                <ShowcaseSidebar onNavigate={() => setMobileMenuOpen(false)} />
              </Drawer.Body>
            </Drawer.Panel>
          </Drawer>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="mx-auto w-full max-w-4xl px-mid py-xlarge">{children}</div>
        </main>
      </div>

      <DesktopThemePanel />
      <MobileThemeDrawer open={themeDrawerOpen} onOpenChange={setThemeDrawerOpen} />
    </div>
  );
}
