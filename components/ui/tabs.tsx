// components/ui/tabs.tsx
"use client";
import * as React from "react";

type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
};

// Very simple tabs (non-animated). If you pass controlled `value`, it works; otherwise uses internal state.
export function Tabs({ defaultValue, value, onValueChange, className, children }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const val = value ?? internal;
  const ctx = React.useMemo(
    () => ({
      value: val,
      setValue: (v: string) => {
        onValueChange ? onValueChange(v) : setInternal(v);
      },
    }),
    [val, onValueChange]
  );
  return <TabsContext.Provider value={ctx}><div className={className}>{children}</div></TabsContext.Provider>;
}

const TabsContext = React.createContext<{ value: string; setValue: (v: string) => void } | null>(null);

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className} style={{ display: "inline-flex", gap: 8 }}>{children}</div>;
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={className}
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: active ? "#ffede3" : "white",
        fontWeight: active ? 700 : 500,
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
