// components/ui/dialog.tsx
import * as React from "react";

type BaseProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };

export function Dialog(props: BaseProps) {
  return <div role="dialog" {...props} />;
}
export function DialogTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}
export function DialogContent(props: BaseProps) {
  return <div {...props} />;
}
export function DialogHeader(props: BaseProps) {
  return <div {...props} />;
}
export function DialogTitle(props: BaseProps) {
  return <h3 {...props} />;
}
export function DialogDescription(props: BaseProps) {
  return <p {...props} />;
}
export function DialogFooter(props: BaseProps) {
  return <div {...props} />;
}
export function DialogClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}

// default export for `import { ... } from "@/components/ui/dialog"`
export default {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
