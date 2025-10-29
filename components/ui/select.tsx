// components/ui/select.tsx
"use client";
import * as React from "react";

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  return <div data-select>{children}</div>;
}

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px", minWidth: 160 }}
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder ?? "Select…"}</span>;
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: 8, marginTop: 6 }}>
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
  onSelect,
  className,
}: {
  value: string;
  children: React.ReactNode;
  onSelect?: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(value)}
      className={className}
      style={{ padding: "6px 8px", borderRadius: 4 }}
    >
      {children}
    </div>
  );
}
