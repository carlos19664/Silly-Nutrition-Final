// components/ui/progress.tsx
import * as React from "react";

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={className} style={{ background: "#f1f5f9", borderRadius: 999, height: 8, width: "100%" }}>
      <div
        style={{
          width: `${clamped}%`,
          height: "100%",
          background: "#ff6a00",
          borderRadius: 999,
          transition: "width 0.2s",
        }}
      />
    </div>
  );
}
