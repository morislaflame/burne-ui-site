"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { Drawer } from "burne-ui";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { ShowcaseSidebar } from "@/components/showcase/showcase-sidebar";

type ShowcaseMobileNavContextValue = {
  isShowcaseRoute: boolean;
  isDocsRoute: boolean;
  isNavRoute: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ShowcaseMobileNavContext = createContext<ShowcaseMobileNavContextValue | null>(
  null,
);

export function ShowcaseMobileNavProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isShowcaseRoute = pathname.startsWith("/components");
  const isDocsRoute = pathname.startsWith("/docs");
  const isNavRoute = isShowcaseRoute || isDocsRoute;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <ShowcaseMobileNavContext.Provider
      value={{ isShowcaseRoute, isDocsRoute, isNavRoute, open, setOpen }}
    >
      {children}
      <Drawer open={open} onOpenChange={setOpen} placement="left">
        <Drawer.Panel extent="default">
          <Drawer.Header>
            <Drawer.HeadingBlock>
              <Drawer.Title>{isDocsRoute ? "Documentation" : "Components"}</Drawer.Title>
              <Drawer.Description>
                {isDocsRoute
                  ? "Guides and component catalog."
                  : "Select a component to view."}
              </Drawer.Description>
            </Drawer.HeadingBlock>
            <Drawer.Close />
          </Drawer.Header>
          <Drawer.Body className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
            {isDocsRoute ? (
              <DocsSidebar withHeader={false} onNavigate={() => setOpen(false)} />
            ) : (
              <ShowcaseSidebar withHeader={false} onNavigate={() => setOpen(false)} />
            )}
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
