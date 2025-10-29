import { cx } from "../../lib/cva.ts";
import type { ComponentProps } from "react";

export function Item({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cx("rounded-md bg-transparent p-4 text-left", className)}
      {...props}
    />
  );
}
