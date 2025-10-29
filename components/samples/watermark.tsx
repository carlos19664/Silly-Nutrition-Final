"use client";

export function Watermark() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        opacity: 0.1,
        fontSize: "12px",
      }}
    >
      SillyNutrition ©
    </div>
  );
}
