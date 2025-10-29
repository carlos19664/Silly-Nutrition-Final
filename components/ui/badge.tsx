// components/ui/badge.tsx
import * as React from "react";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: "#ff6a00", color: "#fff", border: "1px solid #ff6a00" },
    secondary: { background: "#f1f5f9", color: "#0f172a", border: "1px solid #e2e8f0" },
    outline: { background: "transparent", color: "#0f172a", border: "1px solid #e2e8f0" },
  };
  return (
    <span
      className={className}
      style={{ padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 600, ...styles[variant] }}
    >
      {children}
    </span>
  );
}
