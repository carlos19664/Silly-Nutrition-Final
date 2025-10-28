import Image from "next/image"

interface SiteLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SiteLogo({ size = "md", className = "" }: SiteLogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 192,
  }

  const dimension = sizes[size]

  return (
    <div
      className={`relative flex-shrink-0 bg-white rounded-full ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src="/logo.png"
        alt="Silly Nutrition Logo"
        width={dimension}
        height={dimension}
        className="object-contain rounded-full"
        priority
      />
    </div>
  )
}
