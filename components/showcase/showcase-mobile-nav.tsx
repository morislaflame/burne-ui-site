"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button, Drawer, Text } from "burne-ui";

import {
  SHOWCASE_GROUPS,
  showcasePagePath,
  type ShowcaseGroup,
} from "@/lib/showcase/registry";

type ShowcaseMobileNavContextValue = {
  isShowcaseRoute: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ShowcaseMobileNavContext = createContext<ShowcaseMobileNavContextValue | null>(null);

function ShowcaseMobileNavList({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-mid overflow-y-auto overscroll-y-contain p-mid">
      {SHOWCASE_GROUPS.map((group: ShowcaseGroup) => (
        <div key={group.id} className="flex flex-col gap-xsmall">
          <Text
            as="span"
            variant="tools"
            className="mb-small px-small font-semibold uppercase tracking-wider underline underline-offset-4"
          >
            {group.label}
          </Text>
          {group.pages.map((page) => (
            <Button
              key={page.id}
              type="button"
              variant="ghost"
              className="h-9 w-full justify-start px-base text-left font-normal text-muted hover:text-foreground"
              onClick={() => {
                router.push(showcasePagePath(page.id));
                onNavigate();
              }}
            >
              {page.label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ShowcaseMobileNavProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isShowcaseRoute = pathname.startsWith("/components");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <ShowcaseMobileNavContext.Provider value={{ isShowcaseRoute, open, setOpen }}>
      {children}
      <Drawer open={open} onOpenChange={setOpen} placement="left">
        <Drawer.Panel size="default">
          <Drawer.Header>
            <Drawer.HeadingBlock>
              <Drawer.Title>Components</Drawer.Title>
              <Drawer.Description>Select a component to view.</Drawer.Description>
            </Drawer.HeadingBlock>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body className="flex min-h-0 flex-col p-0">
            <ShowcaseMobileNavList onNavigate={() => setOpen(false)} />
          </Drawer.Body>
        </Drawer.Panel>
      </Drawer>
    </ShowcaseMobileNavContext.Provider>
  );
}

export function useShowcaseMobileNav(): ShowcaseMobileNavContextValue {
  const ctx = useContext(ShowcaseMobileNavContext);
  if (!ctx) {
    throw new Error("useShowcaseMobileNav must be used within ShowcaseMobileNavProvider.");
  }
  return ctx;
}
