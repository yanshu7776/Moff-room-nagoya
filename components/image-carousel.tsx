"use client"

import { useEffect, useRef, useCallback } from "react"
import Image from "next/image"

type ImageCarouselProps = {
  images: string[]
  scrollSpeed?: number
  resumeDelay?: number
  placeholder?: "blur" | "empty"
  sizes?: string
}

const IMAGE_WIDTH_PX = 280
const IMAGE_HEIGHT_PX = 180
const IMAGE_GAP_PX = 16 // Corresponds to gap-4

export default function ImageCarousel({
  images,
  scrollSpeed = 1.5,
  resumeDelay = 2000,
  placeholder = "empty",
  sizes = "280px",
}: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInteractingRef = useRef(false)
  const isJumpingRef = useRef(false)

  // We triple the images to create a buffer on each side for seamless looping
  const extendedImages = images.length > 0 ? [...images, ...images, ...images] : []

  const singleSetWidth = (IMAGE_WIDTH_PX + IMAGE_GAP_PX) * images.length

  // Set initial scroll position to the start of the middle set
  useEffect(() => {
    if (containerRef.current && images.length > 0) {
      containerRef.current.scrollLeft = singleSetWidth
    }
  }, [images.length, singleSetWidth])

  const stopAutoScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const startAutoScroll = useCallback(() => {
    if (!containerRef.current || isInteractingRef.current) return
    stopAutoScroll() // Ensure no multiple animations are running

    const animate = () => {
      if (containerRef.current && !isInteractingRef.current) {
        containerRef.current.scrollLeft += scrollSpeed
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [scrollSpeed, stopAutoScroll])

  const handleInteractionStart = useCallback(() => {
    isInteractingRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    stopAutoScroll()
  }, [stopAutoScroll])

  const handleInteractionEnd = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
      startAutoScroll()
    }, resumeDelay)
  }, [resumeDelay, startAutoScroll])

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isJumpingRef.current) return

    const { scrollLeft } = containerRef.current

    // When scrolled to the start of the third set, jump back to the start of the second set
    if (scrollLeft >= singleSetWidth * 2) {
      isJumpingRef.current = true
      containerRef.current.scrollLeft = scrollLeft - singleSetWidth
    }
    // When scrolled to the end of the first set, jump forward to the end of the second set
    else if (scrollLeft <= 0) {
      isJumpingRef.current = true
      containerRef.current.scrollLeft = scrollLeft + singleSetWidth
    }

    // Reset the jump flag after the browser has had a chance to render the jump
    if (isJumpingRef.current) {
      requestAnimationFrame(() => {
        isJumpingRef.current = false
      })
    }
  }, [singleSetWidth])

  useEffect(() => {
    const container = containerRef.current
    if (!container || images.length === 0) return

    startAutoScroll()

    const events: (keyof HTMLElementEventMap)[] = ["mousedown", "touchstart", "wheel"]
    events.forEach((event) => container.addEventListener(event, handleInteractionStart, { passive: true }))

    const endEvents: (keyof HTMLElementEventMap)[] = ["mouseup", "mouseleave", "touchend"]
    endEvents.forEach((event) => container.addEventListener(event, handleInteractionEnd))

    container.addEventListener("scroll", handleScroll)

    return () => {
      stopAutoScroll()
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      events.forEach((event) => container.removeEventListener(event, handleInteractionStart))
      endEvents.forEach((event) => container.removeEventListener(event, handleInteractionEnd))
      container.removeEventListener("scroll", handleScroll)
    }
  }, [images.length, startAutoScroll, stopAutoScroll, handleInteractionStart, handleInteractionEnd, handleScroll])

  if (images.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-nowrap gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing carousel-container"
      style={{ scrollbarWidth: "none" }} // Hide scrollbar for a cleaner look
    >
      <style jsx>{`
      .carousel-container::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Webkit browsers */
      }
    `}</style>
      {extendedImages.map((src, index) => (
        <div
          key={index}
          className="flex-none rounded-lg overflow-hidden shadow-md"
          style={{
            width: `${IMAGE_WIDTH_PX}px`,
            height: `${IMAGE_HEIGHT_PX}px`,
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Gallery image ${(index % images.length) + 1}`}
            width={IMAGE_WIDTH_PX}
            height={IMAGE_HEIGHT_PX}
            className="object-cover w-full h-full pointer-events-none"
            priority={index < 5}
            loading={index < 5 ? "eager" : "lazy"}
            placeholder={placeholder}
            blurDataURL={src} // Next.js automatically handles blur for static local images
            sizes={sizes}
          />
        </div>
      ))}
    </div>
  )
}
