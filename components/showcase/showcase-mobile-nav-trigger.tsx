"use client";

import { IoMenuOutline } from "react-icons/io5";

import { Button, Separator, cn } from "burne-ui";

import { useShowcaseMobileNav } from "@/components/showcase/showcase-mobile-nav";

export function ShowcaseMobileNavTrigger() {
  const { isShowcaseRoute, open, setOpen } = useShowcaseMobileNav();

  if (!isShowcaseRoute) {
    return null;
  }

  return (
    <>
      <Separator orientation="vertical" className="lg:hidden" />
      <Button
        type="button"
        variant="outline"
        size="small"
        iconOnly
        animated
        ripple
        aria-label="Components"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn("lg:hidden shrink-0")}
        onClick={() => setOpen(true)}
      >
        <IoMenuOutline aria-hidden />
      </Button>
    </>
  );
}
