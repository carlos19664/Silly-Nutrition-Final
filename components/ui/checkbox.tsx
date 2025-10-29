// components/ui/checkbox.tsx
"use client";
import * as React from "react";

export function Checkbox({
  checked,
  onCheckedChange,
  className,
  id,
}: {
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  className?: string;
  id?: string;
}) {
  return (
    <input
      id={id}
      type="checkbox"
      className={className}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      style={{ width: 18, height: 18 }}
    />
  );
}
