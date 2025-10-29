import type { ComponentProps } from "react";
import { cva, type VariantProps } from "cva";

const button = cva({
  base: "hover:not-disabled:bg-accent/50 inline-flex shrink-0 rounded-md p-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    disabled: {
      false: null,
      true: "disabled:text-white/30",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export function Button({
  className,
  disabled,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof button>) {
  return (
    <button
      type="button"
      className={button({ disabled, className })}
      disabled={disabled || undefined}
      {...props}
    />
  );
}
