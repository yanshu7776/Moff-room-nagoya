"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

type Review = {
  title: string
  comment: string
  age: string
  purpose: string
  rating: number
}

interface ReviewsCarouselProps {
  reviews: Review[]
  googleRating: string
  googleReviewsCount: number
}

export default function ReviewsCarousel({ reviews, googleRating, googleReviewsCount }: ReviewsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const numericRating = Number.parseFloat(googleRating)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-heading mb-6">
          当社へ寄せられた
          <br className="md:hidden" />
          口コミ
        </h2>
        <div className="inline-flex items-center gap-4 bg-white border border-gray-200 shadow-lg rounded-full py-2 px-6">
          <Image
            src="/images/moff-room-logo-transparent.png"
            alt="Moff room logo"
            width={60}
            height={45}
            className="h-auto"
          />
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p className="text-xs text-gray-500 font-semibold text-left">インスタベースでの総合評価</p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-gray-800">{googleRating}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(numericRating) ? "fill-yellow-400" : "fill-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">({googleReviewsCount}件のレビュー)</span>
            </div>
          </div>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ loop: true }} className="relative px-10">
        <CarouselContent className="-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="p-6 bg-white border border-gray-200 shadow-lg h-full flex flex-col rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{review.title}</h3>
                  <blockquote className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {review.comment}
                  </blockquote>
                  <p className="text-right text-sm font-medium text-gray-500">
                    {review.age}・{review.purpose}
                  </p>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow-md border border-gray-200">
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow-md border border-gray-200">
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${current === index ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
