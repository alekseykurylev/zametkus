import type { ComponentProps } from "react";
import { cx } from "../../lib/cva.ts";

export function Button({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cx(
        "rounded-full border border-neutral-600 bg-neutral-700/40 p-2 hover:not-disabled:bg-neutral-700/80 disabled:text-white/50",
        className,
      )}
      {...props}
    />
  );
}
