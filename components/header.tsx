"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays, Menu, Send, X, Lock, Lightbulb, Instagram, Home, Star, HelpCircle, MapPin } from "lucide-react"
import { usePreloader } from "@/contexts/preloader-context"
import { useRouter } from "next/navigation"
import ContactFormModal from "./contact-form-modal"
import { motion, AnimatePresence } from "framer-motion"

// Custom TikTok Icon Component
const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12V4.5a4.5 4.5 0 0 1 4.5-4.5h0A4.5 4.5 0 0 1 21 4.5v3Z" />
    <path d="M16.5 16.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
  </svg>
)

// URL constants
const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/moff_room?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
const BOOKING_URL = "https://www.spacemarket.com/spaces/moff_room/?promotion_link=true"

// Fullscreen Menu Component
function FullscreenMenu({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { href: "#features", label: "スペースの特徴", icon: Home },
    { href: "#reviews", label: "お客様の声", icon: Star },
    { href: "#faq", label: "よくある質問", icon: HelpCircle },
    { href: "#access", label: "アクセス", icon: MapPin },
    { href: "/terms-of-sale", label: "特定商取引法", icon: Lock },
    { href: "/privacy-policy", label: "プライバシーポリシー", icon: Lightbulb },
  ]

  const socialLinks = [
    {
      href: "#",
      label: "公式 X",
      icon: <X className="h-6 w-6" />,
      className: "bg-black text-white hover:bg-gray-800",
    },
    {
      href: INSTAGRAM_PROFILE_URL,
      label: "公式 Instagram",
      icon: <Instagram className="h-6 w-6" />,
      className: "bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 text-white hover:opacity-90",
    },
    {
      href: "#",
      label: "公式 TikTok",
      icon: <TikTokIcon className="h-6 w-6" />,
      className: "bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:opacity-90",
    },
  ]

  const unifiedButtonStyle =
    "group w-full md:w-auto bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-full shadow-lg px-8 py-4 text-lg font-jkg font-bold transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 transform flex items-center justify-center"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-custom-beige-unified p-6 flex flex-col font-jkg overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with logo and close button */}
      <div className="flex justify-between items-center mb-8 flex-shrink-0">
        <Image
          src="/images/moff-room-logo-final.png"
          alt="Moff room ロゴ"
          width={160}
          height={50}
          className="h-12 w-auto"
          priority
        />
        <button onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-jkg">
          <X className="h-8 w-8" />
          <span className="text-sm font-medium font-jkg">close</span>
        </button>
      </div>

      <motion.div
        className="flex-grow flex flex-col justify-center items-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={containerVariants} className="w-full max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y border-gray-300 py-8 mb-10"
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex flex-col items-center gap-2 text-gray-700 hover:text-custom-beige-dark transition-colors font-jkg"
              >
                {React.createElement(item.icon, { className: "h-8 w-8" })}
                <span className="text-sm font-medium font-jkg">{item.label}</span>
              </Link>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10"
          >
            <Button asChild className={unifiedButtonStyle}>
              <Link href="/" onClick={onClose}>
                <Home className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:rotate-[-12deg]" />
                ホームページTOP
              </Link>
            </Button>
            <ContactFormModal>
              <Button className={unifiedButtonStyle}>
                <Send className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:rotate-[-12deg]" />
                お問い合わせはこちら
              </Button>
            </ContactFormModal>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                asChild
                className={`w-full md:w-auto rounded-lg shadow-md px-6 py-3 text-base font-semibold font-jkg ${link.className}`}
                onClick={onClose}
              >
                <Link
                  href={link.href}
                  className="flex items-center justify-center gap-3 font-jkg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { showPreloader } = usePreloader()
  const router = useRouter()

  const navLinks = [
    {
      href: "#features",
      label: "スペースの特徴",
      icon: <Home className="h-5 w-5 mr-2 text-gray-600" />,
      borderColor: "border-gray-300",
      textColor: "text-gray-700",
    },
    {
      href: "#reviews",
      label: "お客様の声",
      icon: <Star className="h-5 w-5 mr-2 text-red-500" />,
      borderColor: "border-red-300",
      textColor: "text-red-500",
    },
  ]

  const handleLogoClick = (e: any) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    showPreloader()

    if (window.location.pathname !== "/") {
      setTimeout(() => {
        router.push("/")
      }, 100)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-custom-beige-unified shadow-sm font-jkg">
        <div
          className="h-2.5 bg-gradient-to-r from-pink-300 via-yellow-300 via-green-300 via-blue-300 to-purple-300"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fecaca 0px, #fecaca 10px, #fed7aa 10px, #fed7aa 20px, #a7f3d0 20px, #a7f3d0 30px, #bfdbfe 30px, #bfdbfe 40px, #e9d5ff 40px, #e9d5ff 50px)",
          }}
        ></div>

        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <Image
              src="/images/moff-room-logo-final.png"
              alt="Moff room ロゴ"
              width={160}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex flex-col items-center text-sm font-medium ${link.textColor} hover:opacity-80 transition-opacity font-jkg`}
              >
                <div className={`w-full border-t-2 border-dotted ${link.borderColor} mb-1`}></div>
                <div className="flex items-center font-jkg">
                  {link.icon}
                  {link.label}
                </div>
                <div className={`w-full border-b-2 border-dotted ${link.borderColor} mt-1`}></div>
              </Link>
            ))}
            <Button
              asChild
              className="group bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow-lg px-5 py-2.5 font-jkg font-bold transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-orange-500 hover:shadow-xl hover:scale-105 transform"
            >
              <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                今すぐ予約する
              </Link>
            </Button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center text-gray-600 hover:text-gray-800 focus:outline-none ml-4 p-2 rounded hover:bg-gray-100 transition-colors font-jkg"
            >
              <Menu className="h-6 w-6" />
              <span className="text-xs mt-0.5 font-jkg">MENU</span>
              <span className="sr-only">メニューを開く</span>
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="group bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full shadow-lg font-bold transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-orange-500 hover:shadow-xl hover:scale-110 transform"
            >
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2"
              >
                <CalendarDays className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-xs font-semibold">予約</span>
              </Link>
            </Button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 focus:outline-none bg-white border-2 border-custom-beige-DEFAULT rounded-full h-10 w-10 shadow-sm"
              aria-label="メニューを開く"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{isMenuOpen && <FullscreenMenu onClose={() => setIsMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}
