"use client"

import Link from "next/link"
import { CalendarCheck, Home } from "lucide-react"
import { motion } from "framer-motion"

const BOOKING_URL = "https://kashispace.com/partner/DSUyiELReejakoIa"

export default function FloatingCTA() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 print:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
    >
      <div className="bg-custom-beige-dark px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto flex items-stretch md:items-center justify-start md:justify-center gap-2 md:gap-4">
          {/* Left Button: Moff Room HP */}
          <div className="flex-1 flex md:justify-center">
            <Link
              href="https://www.moffroom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:max-w-xs group flex"
              aria-label="Moff Room 総合サイトへ"
            >
              <div className="relative text-center w-full">
                <div className="inline-block bg-custom-beige-unified text-[10px] md:text-sm text-gray-600 font-semibold px-2 md:px-3 py-1 rounded-full shadow-sm mb-[-12px] relative z-10">
                  <span className="md:hidden">他の店舗も見る</span>
                  <span className="hidden md:inline">他の店舗も見てみる</span>
                </div>
                <div className="bg-custom-beige-unified border-2 border-blue-500 rounded-lg px-2 py-3 md:py-5 text-blue-600 font-jkg font-bold text-xs md:text-lg transition-all duration-300 btn-hover-lift flex items-center justify-center gap-1.5 md:gap-2">
                  <Home className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="truncate md:whitespace-normal">Moff room HP</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Button: Booking */}
          <div className="flex-1 flex md:justify-center">
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:max-w-xs group flex"
              aria-label="HP限定15%OFFで今すぐ予約する"
            >
              <div className="relative text-center w-full">
                <div className="inline-block bg-custom-beige-unified text-[10px] md:text-sm text-pink-500 font-semibold px-2 md:px-3 py-1 rounded-full shadow-sm mb-[-12px] relative z-10">
                  【HP限定10%OFF】
                </div>
                <div className="bg-green-500 border-2 border-green-500 rounded-lg px-2 py-3 md:py-5 text-white font-jkg font-bold text-xs md:text-lg transition-all duration-300 btn-hover-lift flex items-center justify-center gap-1.5 md:gap-2 animate-[gentlePulse_2s_ease-in-out_infinite]">
                  <CalendarCheck className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="truncate md:whitespace-normal">
                    <span className="md:hidden">今すぐ予約</span>
                    <span className="hidden md:inline">今すぐ予約する</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Spacer for Chatbot on mobile */}
          <div className="w-14 flex-shrink-0 md:hidden" />
        </div>
      </div>
    </motion.div>
  )
}
