"use client";

export function StickySampleBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "8px 12px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      You’re viewing a sample version of this plan
    </div>
  );
}
