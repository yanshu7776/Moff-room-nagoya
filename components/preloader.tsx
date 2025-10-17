"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { usePreloader } from "@/contexts/preloader-context"

interface PreloaderProps {
  logoUrl: string
}

export default function Preloader({ logoUrl }: PreloaderProps) {
  const { isPreloading, hidePreloader } = usePreloader()
  const preloaderRef = useRef<HTMLDivElement>(null)
  const rainbowBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloaderNode = preloaderRef.current
    const rainbowBarNode = rainbowBarRef.current

    if (preloaderNode && rainbowBarNode) {
      if (isPreloading) {
        // Reset styles and classes to ensure animation restarts if re-triggered
        preloaderNode.style.opacity = "1"
        preloaderNode.style.visibility = "visible"
        preloaderNode.classList.remove("preloader-fade-out-animation")
        rainbowBarNode.classList.remove("rainbow-bar-slide-up-animation")

        // Force reflow to restart animation
        void preloaderNode.offsetWidth

        // Add animation classes
        preloaderNode.classList.add("preloader-fade-out-animation")
        rainbowBarNode.classList.add("rainbow-bar-slide-up-animation")

        const handleAnimationEnd = (event: AnimationEvent) => {
          // Listen for the fadeOut animation on the preloader container itself
          if (event.animationName === "preloaderFadeOut" && event.target === preloaderNode) {
            hidePreloader()
          }
        }
        preloaderNode.addEventListener("animationend", handleAnimationEnd)
        return () => {
          preloaderNode.removeEventListener("animationend", handleAnimationEnd)
        }
      } else {
        // If not preloading, ensure it's hidden (e.g., on initial fast load or context change)
        preloaderNode.style.opacity = "0"
        preloaderNode.style.visibility = "hidden"
      }
    }
  }, [isPreloading, hidePreloader])

  // Render nothing if not preloading and the element is not supposed to be visible
  // This prevents a flash of unstyled content if hidePreloader is called very quickly
  if (!isPreloading && (!preloaderRef.current || preloaderRef.current.style.opacity === "0")) {
    return null
  }

  return (
    <div
      ref={preloaderRef}
      className="preloader-container" // Base styles, animation class added by useEffect
    >
      <div ref={rainbowBarRef} className="rainbow-bar"></div> {/* Animation class added by useEffect */}
      <Image
        src={logoUrl || "/images/moff-room-new-logo.png"}
        alt="Moff room Loading..."
        width={200} // Max width
        height={100} // Placeholder height, actual height will be auto based on aspect ratio
        style={{ maxWidth: "200px", height: "auto", zIndex: 1 }} // Ensure logo is above rainbow bar
        priority
      />
    </div>
  )
}
