"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { Loading } from "burne-ui";

import { ShowcasePagePlaceholder } from "@/components/showcase/showcase-page-placeholder";

export type ShowcasePageComponent = ComponentType;

/**
 * Full main-column height: cancel shell `py-2xlarge` with negative margin so
 * `100dvh - header` matches the scrollport and does not leave extra scroll.
 */
function ShowcasePageLoading() {
  return (
    <div className="-my-2xlarge flex min-h-[calc(100dvh-var(--site-header-height,4.5rem))] w-full items-center justify-center">
      <Loading type="dots" size="mid" color="primary" label="Loading showcase" />
    </div>
  );
}

function showcaseDynamic(
  loader: () => Promise<{ default: ShowcasePageComponent }>,
) {
  return dynamic(loader, { ssr: false, loading: ShowcasePageLoading });
}

const TextShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TextShowcase").then((m) => ({ default: m.TextShowcase })),
);
const KbdShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/KbdShowcase").then((m) => ({ default: m.KbdShowcase })),
);
const ButtonShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ButtonShowcase").then((m) => ({ default: m.ButtonShowcase })),
);
const CloseButtonShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/CloseButtonShowcase").then((m) => ({
    default: m.CloseButtonShowcase,
  })),
);
const ToggleButtonShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ToggleButtonShowcase").then((m) => ({
    default: m.ToggleButtonShowcase,
  })),
);
const ToggleButtonGroupShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ToggleButtonGroupShowcase").then((m) => ({
    default: m.ToggleButtonGroupShowcase,
  })),
);
const ButtonGroupShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ButtonGroupShowcase").then((m) => ({
    default: m.ButtonGroupShowcase,
  })),
);
const BadgeShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/BadgeShowcase").then((m) => ({ default: m.BadgeShowcase })),
);
const AlertShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/AlertShowcase").then((m) => ({ default: m.AlertShowcase })),
);
const ToastShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ToastShowcase").then((m) => ({ default: m.ToastShowcase })),
);
const LoadingShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/LoadingShowcase").then((m) => ({ default: m.LoadingShowcase })),
);
const ProgressBarShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ProgressBarShowcase").then((m) => ({
    default: m.ProgressBarShowcase,
  })),
);
const MeterShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/MeterShowcase").then((m) => ({ default: m.MeterShowcase })),
);
const FormShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/FormShowcase").then((m) => ({ default: m.FormShowcase })),
);
const FieldShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/FieldShowcase").then((m) => ({ default: m.FieldShowcase })),
);
const InputShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/InputShowcase").then((m) => ({ default: m.InputShowcase })),
);
const TextAreaShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TextAreaShowcase").then((m) => ({ default: m.TextAreaShowcase })),
);
const ComboBoxShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ComboBoxShowcase").then((m) => ({ default: m.ComboBoxShowcase })),
);
const SelectShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SelectShowcase").then((m) => ({ default: m.SelectShowcase })),
);
const SliderShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SliderShowcase").then((m) => ({ default: m.SliderShowcase })),
);
const TimeFieldShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TimeFieldShowcase").then((m) => ({ default: m.TimeFieldShowcase })),
);
const CheckboxShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/CheckboxShowcase").then((m) => ({ default: m.CheckboxShowcase })),
);
const SwitchShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SwitchShowcase").then((m) => ({ default: m.SwitchShowcase })),
);
const RadioGroupShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/RadioGroupShowcase").then((m) => ({
    default: m.RadioGroupShowcase,
  })),
);
const ColorPickerShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ColorPickerShowcase").then((m) => ({
    default: m.ColorPickerShowcase,
  })),
);
const SelectionIndicatorShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SelectionIndicatorShowcase").then((m) => ({
    default: m.SelectionIndicatorShowcase,
  })),
);
const CalendarShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/CalendarShowcase").then((m) => ({ default: m.CalendarShowcase })),
);
const BreadcrumbsShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/BreadcrumbsShowcase").then((m) => ({
    default: m.BreadcrumbsShowcase,
  })),
);
const LinkShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/LinkShowcase").then((m) => ({ default: m.LinkShowcase })),
);
const PaginationShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/PaginationShowcase").then((m) => ({
    default: m.PaginationShowcase,
  })),
);
const TabsShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TabsShowcase").then((m) => ({ default: m.TabsShowcase })),
);
const TooltipShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TooltipShowcase").then((m) => ({ default: m.TooltipShowcase })),
);
const PopoverShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/PopoverShowcase").then((m) => ({ default: m.PopoverShowcase })),
);
const DropdownShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/DropdownShowcase").then((m) => ({ default: m.DropdownShowcase })),
);
const DialogShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/DialogShowcase").then((m) => ({ default: m.DialogShowcase })),
);
const DrawerShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/DrawerShowcase").then((m) => ({ default: m.DrawerShowcase })),
);
const AlertDialogShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/AlertDialogShowcase").then((m) => ({
    default: m.AlertDialogShowcase,
  })),
);
const ListBoxShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ListBoxShowcase").then((m) => ({ default: m.ListBoxShowcase })),
);
const CardShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/CardShowcase").then((m) => ({ default: m.CardShowcase })),
);
const TableShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/TableShowcase").then((m) => ({ default: m.TableShowcase })),
);
const SurfaceShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SurfaceShowcase").then((m) => ({ default: m.SurfaceShowcase })),
);
const AvatarShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/AvatarShowcase").then((m) => ({ default: m.AvatarShowcase })),
);
const SkeletonShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/SkeletonShowcase").then((m) => ({ default: m.SkeletonShowcase })),
);
const ExpandableShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/ExpandableShowcase").then((m) => ({
    default: m.ExpandableShowcase,
  })),
);
const DisclosureShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/DisclosureShowcase").then((m) => ({
    default: m.DisclosureShowcase,
  })),
);
const AccordionShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/AccordionShowcase").then((m) => ({
    default: m.AccordionShowcase,
  })),
);
const GlossShowcase = showcaseDynamic(() =>
  import("@/components/showcase/pages/GlossShowcase").then((m) => ({ default: m.GlossShowcase })),
);

export const SHOWCASE_PAGE_COMPONENTS: Partial<Record<string, ShowcasePageComponent>> = {
  text: TextShowcase,
  kbd: KbdShowcase,
  button: ButtonShowcase,
  "close-button": CloseButtonShowcase,
  "toggle-button": ToggleButtonShowcase,
  "toggle-button-group": ToggleButtonGroupShowcase,
  "button-group": ButtonGroupShowcase,
  badge: BadgeShowcase,
  alert: AlertShowcase,
  toast: ToastShowcase,
  loading: LoadingShowcase,
  "progress-bar": ProgressBarShowcase,
  meter: MeterShowcase,
  form: FormShowcase,
  field: FieldShowcase,
  input: InputShowcase,
  textarea: TextAreaShowcase,
  combobox: ComboBoxShowcase,
  select: SelectShowcase,
  slider: SliderShowcase,
  "time-field": TimeFieldShowcase,
  checkbox: CheckboxShowcase,
  switch: SwitchShowcase,
  "radio-group": RadioGroupShowcase,
  "color-picker": ColorPickerShowcase,
  "selection-indicator": SelectionIndicatorShowcase,
  calendar: CalendarShowcase,
  breadcrumbs: BreadcrumbsShowcase,
  link: LinkShowcase,
  pagination: PaginationShowcase,
  tabs: TabsShowcase,
  tooltip: TooltipShowcase,
  popover: PopoverShowcase,
  dropdown: DropdownShowcase,
  dialog: DialogShowcase,
  drawer: DrawerShowcase,
  "alert-dialog": AlertDialogShowcase,
  listbox: ListBoxShowcase,
  card: CardShowcase,
  table: TableShowcase,
  surface: SurfaceShowcase,
  avatar: AvatarShowcase,
  skeleton: SkeletonShowcase,
  expandable: ExpandableShowcase,
  disclosure: DisclosureShowcase,
  accordion: AccordionShowcase,
  gloss: GlossShowcase,
};

export function ShowcasePageView({
  pageId,
  label,
}: {
  pageId: string;
  label: string;
}) {
  const Page = SHOWCASE_PAGE_COMPONENTS[pageId];
  if (!Page) {
    return <ShowcasePagePlaceholder pageId={pageId} label={label} />;
  }
  return <Page />;
}
