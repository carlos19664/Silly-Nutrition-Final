// components/site-logo.tsx
import Image from "next/image";

type Props = { size?: number };

export default function SiteLogo({ size = 48 }: Props) {
  // If you have a logo file in /public (e.g. /logo.svg, /logo.png), set it here:
  const src = "/logo.svg"; // change to your actual file name in /public

  // If you don't have a logo image yet, this will show text instead.
  const hasImage = true; // set to false temporarily if no image exists

  if (!hasImage) {
    return (
      <span className="font-extrabold text-lg">
        Silly <span className="text-orange-500">Nutrition</span>
      </span>
    );
  }

  return <Image src={src} alt="Silly Nutrition" width={size} height={size} priority />;
}
