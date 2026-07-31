"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button, Text } from "burne-ui";

import { ProgressiveBlur } from "@/components/effects/ProgressiveBlur";
import { HomePreview } from "@/components/home/HomePreview";
import { DOCS_INDEX_PATH } from "@/lib/docs/registry";
import {
  DEFAULT_SHOWCASE_PAGE_ID,
  showcasePagePath,
} from "@/lib/showcase/registry";

gsap.registerPlugin(ScrollTrigger);

export function HomeLanding() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const componentsHref = showcasePagePath(DEFAULT_SHOWCASE_PAGE_ID);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const scroller = root.closest(".site-panel-scroll") ?? undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-home-hero]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.to("[data-home-orb]", {
        y: "+=16",
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            scroller: scroller || undefined,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex min-h-full flex-col">
      

      <section className="relative flex min-h-[calc(100dvh-var(--site-chrome-height))] flex-col items-center justify-center py-2xlarge">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-xlarge items-center">

          <div className="flex flex-col gap-large text-center">
            <div data-home-hero >
              <Text
                as="h1"
                variant="accent-header"
                className="text-balance text-foreground sm:text-[clamp(3rem,8vw,5.5rem)] sm:leading-[0.95] sm:tracking-[-0.03em] text-[4rem] font-w-strong"
              >
                Burne UI
              </Text>
            </div>
            <div data-home-hero>
              <Text
                as="p"
                variant="large"
                className="max-w-xl text-pretty text-muted sm:text-[1.2rem] sm:leading-relaxed"
              >
                A modern React design system with token-driven themes, GSAP motion,
                and components built for light and dark from day one.
              </Text>
            </div>
          </div>

          <div data-home-hero className="flex flex-wrap items-center gap-small">
            <Button
              asChild
              variant="primary"
              size="large"
              ripple
              icon={<IoArrowForward aria-hidden />}
              iconPosition="end"
              className="rounded-full px-xlarge"
            >
              <Link
                href={DOCS_INDEX_PATH}
                onMouseEnter={() => router.prefetch(DOCS_INDEX_PATH)}
              >
                Documentation
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="large"
              ripple
              className="rounded-full px-xlarge"
            >
              <Link
                href={componentsHref}
                onMouseEnter={() => router.prefetch(componentsHref)}
              >
                Components
              </Link>
            </Button>
          </div>
        </div>
      </section>

      

      <div className="relative">
        <HomePreview />

        <ProgressiveBlur
          direction="bottom"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[18rem]"
          blurIntensity={0.5}
          tintIntensity={90}
        />

        <div
          data-home-reveal
          className="relative z-20 flex justify-center px-large pb-2xlarge pt-2xlarge sm:pb-[5rem]"
        >
          <Button
            asChild
            variant="primary"
            size="mid"
            ripple
            icon={<IoArrowForward aria-hidden />}
            iconPosition="end"
            className="rounded-full px-xlarge"
          >
            <Link
              href={DOCS_INDEX_PATH}
              onMouseEnter={() => router.prefetch(DOCS_INDEX_PATH)}
            >
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
