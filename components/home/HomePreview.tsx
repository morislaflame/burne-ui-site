"use client";

import Link from "next/link";
import { IoAdd, IoArrowForward } from "react-icons/io5";

import { Badge, Button, Checkbox, CheckboxGroup, Text, cn } from "burne-ui";

import { AccordionCheckoutFaqDemo } from "@/components/showcase/demos/accordion/AccordionCheckoutFaq.demo";
import { AlertCompactStackDemo } from "@/components/showcase/demos/alert/AlertCompactStack.demo";
import { AlertCompoundBannerDemo } from "@/components/showcase/demos/alert/AlertCompoundBanner.demo";
import { AvatarPresenceRowDemo } from "@/components/showcase/demos/avatar/AvatarPresenceRow.demo";
import { BadgeTagCloudDemo } from "@/components/showcase/demos/badge/BadgeTagCloud.demo";
import { ButtonCtaCardDemo } from "@/components/showcase/demos/button/ButtonCtaCard.demo";
import { CalendarInlineWidgetDemo } from "@/components/showcase/demos/calendar/CalendarInlineWidget.demo";
import { CardPricingGridDemo } from "@/components/showcase/demos/card/CardPricingGrid.demo";
import { MeterQuotaBannerDemo } from "@/components/showcase/demos/meter/MeterQuotaBanner.demo";
import { TabsSettingsPanelDemo } from "@/components/showcase/demos/tabs/TabsSettingsPanel.demo";
import { ToastDeployPanelDemo } from "@/components/showcase/demos/toast/ToastDeployPanel.demo";
import {
  showcasePagePath,
} from "@/lib/showcase/registry";
import { ToggleButtonGlossDemo } from "../showcase/demos/toggle-button/ToggleButtonGloss.demo";
import { CardGlossDemo } from "../showcase/demos/card/CardGloss.demo";
import { ButtonGroupGlossDemo } from "../showcase/demos/button-group/ButtonGroupGloss.demo";
import { RadioGroupPlanCardsDemo } from "../showcase/demos/radioGroup/RadioGroupPlanCards.demo";
import { CardAuthPanelDemo } from "../showcase/demos/card/CardAuthPanel.demo";
import { DisclosureOutlineFaqDemo } from "../showcase/demos/disclosure/DisclosureOutlineFaq.demo";
import { ProgressVerticalDemo } from "../showcase/demos/progress-bar/ProgressVertical.demo";
import { ButtonVariantsDemo } from "../showcase/demos/button/ButtonVariants.demo";

type PreviewTileProps = {
  label: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

function PreviewTile({
  label,
  href,
  children,
  className,
  bodyClassName,
}: PreviewTileProps) {
  return (
    <div
      data-home-reveal
      className={cn(
        "group flex min-h-0 flex-col rounded-large border-token bg-background/40 p-mid gap-mid shadow-token-sm ",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-mid px-mid py-small">
        <Badge size="mid" variant="secondary" className="rounded-full">
          {label}
        </Badge>
      </div>
      <div
        className={cn(
          "flex min-h-52 flex-1 items-center justify-center overflow-auto rounded-large bg-surface p-2xlarge",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function HomePreview() {

  return (
    <section className="relative py-2xlarge sm:py-[6rem]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-xlarge">
        <div
          data-home-reveal
          className="flex flex-col gap-large sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex max-w-2xl flex-col gap-mid">
            <Badge size="small" variant="outline" className="w-fit rounded-full">
              Live previews
            </Badge>
            <Text as="h2" variant="header-2" className="text-balance text-foreground">
              Components in context
            </Text>
            <Text as="p" variant="base" className="max-w-xl text-muted">
            All components are built with accessibility standards in mind. It includes a ready-made design system and animations, with full customization capabilities.
            </Text>
          </div>
          <Button
            asChild
            variant="outline"
            size="mid"
            ripple
            icon={<IoArrowForward aria-hidden />}
            iconPosition="end"
            className="w-fit shrink-0"
          >
            <Link href={showcasePagePath("button")}>Browse all</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-large md:grid-cols-12">
          <PreviewTile
            label="Create unique designs and apply them to components"
            href={showcasePagePath("alert")}
            className="md:col-span-12"
            bodyClassName="min-h-0 items-stretch justify-stretch"
          >
            <div className="w-full flex flex-col gap-large items-center justify-center">
              <div className="flex gap-large">
                <ButtonGroupGlossDemo/>
                <ToggleButtonGlossDemo/>
              </div>
              <div className="flex gap-large">
                <AlertCompoundBannerDemo />
                <CardGlossDemo/>
              </div>
              
            </div>
          </PreviewTile>

          <PreviewTile
            label="Pick your own design"
            href={showcasePagePath("calendar")}
            className="md:col-span-5 md:row-span-2"
            bodyClassName="min-h-72"
          >
            <div className="w-full flex flex-col gap-large items-center justify-center">
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
              <Button icon={<IoAdd aria-hidden />}>With icon</Button>
              <Button ripple variant="outline">
                With ripple
              </Button> 
            </div>
          </PreviewTile>

          <PreviewTile
            label="Mix and match components in your layout"
            href={showcasePagePath("tabs")}
            className="md:col-span-7"
            bodyClassName="items-stretch justify-stretch"
          >
            <div className="w-full flex gap-large items-center justify-center">
              <DisclosureOutlineFaqDemo/>
              
            </div>
          </PreviewTile>

          <div className="grid grid-cols-1 gap-large sm:grid-cols-2 md:col-span-7">
            <PreviewTile
              label="Groups"
              href={showcasePagePath("avatar")}
              bodyClassName="items-start justify-start"
            >
              
              <CalendarInlineWidgetDemo />
            </PreviewTile>

            <PreviewTile
              label="Overlays"
              href={showcasePagePath("badge")}
              bodyClassName="items-center justify-center"
            >
               <ToastDeployPanelDemo />
            </PreviewTile>
          </div>

          <PreviewTile
            label="Composite components"
            href={showcasePagePath("accordion")}
            className="md:col-span-6"
            bodyClassName="items-stretch justify-stretch"
          >
            <div className="w-full">
              <RadioGroupPlanCardsDemo />
            </div>
          </PreviewTile>

          <PreviewTile
            label="Ready-made solutions"
            href={showcasePagePath("meter")}
            className="md:col-span-6"
            bodyClassName="items-stretch justify-stretch"
          >
            <div className="w-full flex items-center justify-center">
              <MeterQuotaBannerDemo />
            </div>
          </PreviewTile>

          <PreviewTile
            label="Configure your app flow many times faster"
            href={showcasePagePath("card")}
            className="md:col-span-12"
            bodyClassName="items-stretch justify-stretch"
          >
            <div className="w-full flex gap-large">
              <CardAuthPanelDemo/>
              <CardPricingGridDemo/>
            </div>
          </PreviewTile>
        </div>
      </div>
    </section>
  );
}
