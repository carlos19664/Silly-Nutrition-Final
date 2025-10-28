import * as React from "react";

export default function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={["inline-flex items-center gap-2 font-extrabold text-xl", className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Silly Nutrition"
    >
      <span className="grid place-items-center h-6 w-6 rounded-full bg-orange-500 text-white text-xs">
        S
      </span>
      <span>
        Silly <span className="text-orange-500">Nutrition</span>
      </span>
    </span>
  );
}
