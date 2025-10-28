import type { ComponentProps } from "react";
import { cva, type VariantProps } from "cva";

const button = cva({
  base: "rounded-4xl bg-neutral-700/40 p-2 ring ring-white/20 backdrop-blur-sm hover:not-disabled:bg-neutral-700/80",
  variants: {
    disabled: {
      false: null,
      true: "disabled:bg-neutral-700/20 disabled:text-white/30",
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
