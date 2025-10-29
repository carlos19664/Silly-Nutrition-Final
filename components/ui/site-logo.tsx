import * as React from "react";
import Image from "next/image";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logo.svg"
        alt="Silly Nutrition"
        width={40}
        height={40}
        priority
      />
    </div>
  );
}

export default SiteLogo;
