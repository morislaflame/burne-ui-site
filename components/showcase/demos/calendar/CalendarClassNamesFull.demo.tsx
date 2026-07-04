import { Calendar } from "burne-ui";

export function CalendarClassNamesFullDemo() {
  return (
    <Calendar
      mode="single"
      classNames={{
        root: "rounded-large border-token bg-surface p-mid shadow-token-base",
        header: "gap-small",
        headerTitle: "font-semibold text-primary",
        navPrev: "text-primary",
        navNext: "text-primary",
        weekdayCell: "text-primary/70",
        dayCell: "rounded-full",
        cellFill: "rounded-full bg-primary",
        cellTodayDot: "bg-primary",
        footer: "border-primary/30",
        footerToday: "text-primary",
      }}
    >
      <Calendar.Header />
      <Calendar.Grid />
      <Calendar.Footer />
    </Calendar>
  );
}
