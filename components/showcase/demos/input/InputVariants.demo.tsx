import { Input } from "burne-ui";

const VARIANTS = ["default", "outline", "secondary", "gloss"] as const;

export function InputVariantsDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-xlarge sm:grid-cols-2">
      {VARIANTS.map((variant) => (
        <Input
          key={variant}
          label={variant}
          variant={variant}
          placeholder={`variant="${variant}"`}
          hint={`variant="${variant}"`}
          className="w-full"
        />
      ))}
    </div>
  );
}
