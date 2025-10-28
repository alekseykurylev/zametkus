import type { ComponentProps } from "react";
import { cx } from "../../lib/cva";

function AppShellRoot({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell"
      className={cx(
        "m-3 flex h-[calc(100vh-(--spacing(6)))] overflow-hidden rounded-2xl",
        className,
      )}
      {...props}
    />
  );
}
AppShellRoot.displayName = "AppShell.Root";

function AppShellHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-header"
      className={cx("pb-4", className)}
      {...props}
    />
  );
}
AppShellHeader.displayName = "AppShell.Header";

function AppShellSideBar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-sidebar"
      className={cx(
        "flex w-64 shrink-0 flex-col rounded-2xl bg-neutral-950 p-4",
        className,
      )}
      {...props}
    />
  );
}
AppShellSideBar.displayName = "AppShell.SideBar";

function AppShellList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-list"
      className={cx("grow overflow-y-auto", className)}
      {...props}
    />
  );
}
AppShellList.displayName = "AppShell.List";

function AppShellFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-footer"
      className={cx("pt-4", className)}
      {...props}
    />
  );
}
AppShellFooter.displayName = "AppShell.Footer";

function AppShellNote({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-note"
      className={cx("w-full rounded-2xl bg-neutral-900", className)}
      {...props}
    />
  );
}
AppShellNote.displayName = "AppShell.Note";

export {
  AppShellRoot as Root,
  AppShellSideBar as SideBar,
  AppShellHeader as Header,
  AppShellList as List,
  AppShellFooter as Footer,
  AppShellNote as Note,
};
