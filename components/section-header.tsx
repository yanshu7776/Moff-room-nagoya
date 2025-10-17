import Image from "next/image"

type SectionHeaderProps = {
  type: "access" | "area" | "space-list"
  className?: string
}

const headerImages = {
  access: "/images/headers/access-header.png",
  area: "/images/headers/area-header.png",
  "space-list": "/images/headers/space-list-header.png",
}

export default function SectionHeader({ type, className = "" }: SectionHeaderProps) {
  const imageSrc = headerImages[type]

  if (!imageSrc) return null

  return (
    <div className={`flex justify-center py-2 md:py-3 ${className}`}>
      <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`${type} section header illustration`}
          width={320}
          height={320}
          className="w-full h-auto object-contain"
          priority={type === "space-list"}
          sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
        />
      </div>
    </div>
  )
}
