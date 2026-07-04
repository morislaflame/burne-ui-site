import { Slider } from "burne-ui";

export function SliderClassNamesFullDemo() {
  return (
    <Slider
      defaultValue={62}
      min={0}
      max={100}
      gloss
      classNames={{
        root: "max-w-md rounded-mid border-token bg-surface p-mid max-w-component-small",
        value: "text-primary font-semibold",
        rail: "bg-primary/10",
        fill: "bg-primary",
        thumbShell: "ring-primary/30",
        hint: "text-muted/80",
      }}
    >
      <Slider.Header>
        <Slider.Label>Brightness</Slider.Label>
        <Slider.Value />
      </Slider.Header>
      <Slider.Track />
      <Slider.Hint>Setting up slots via classNames on root.</Slider.Hint>
    </Slider>
  );
}
