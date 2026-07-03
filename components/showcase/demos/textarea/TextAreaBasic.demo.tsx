import { TextArea } from "burne-ui";

export function TextAreaBasicDemo() {
  return (
    <TextArea
      label="Comment"
      placeholder="Message text…"
      rows={3}
      hint="Up to 500 characters."
      className="w-64"
    />
  );
}
