import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Calendar } from "burne-ui";

export function CalendarCustomNavIconsDemo() {
  return (
    <Calendar
      mode="single"
      navPrevIcon={<IoArrowBack aria-hidden className="icon-xsmall text-primary" />}
      navNextIcon={<IoArrowForward aria-hidden className="icon-xsmall text-primary" />}
    />
  );
}
