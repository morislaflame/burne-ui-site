import { TextArea } from "burne-ui";

export function TextAreaVariantsDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-mid">
      <TextArea
        label="Comment"
        placeholder="Message text…"
        rows={3}
        hint="Default shell — bg-surface."
        className="w-64"
      />
      <TextArea
        label="Outline"
        variant="outline"
        placeholder="variant outline"
        rows={3}
        hint="Transparent background with outline."
        className="w-64"
      />
      <TextArea
        label="Secondary"
        variant="secondary"
        placeholder="variant secondary"
        rows={3}
        hint="Secondary surface — like Button secondary."
        className="w-64"
      />
    </div>
  );
}
