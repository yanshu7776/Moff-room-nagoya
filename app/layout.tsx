import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"
import { PreloaderProvider } from "@/contexts/preloader-context"
import Preloader from "@/components/preloader"
import { ChatBot } from "@/components/chat-bot"
import FloatingCTA from "@/components/floating-cta"
import { JsonLdScripts } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Moff room 名古屋店 | ママ会・推し活に最適な完全個室レンタルスペース",
  description:
    "矢場町駅徒歩約6分！1フロア1室の完全個室でママ会や推し活が楽しめるレンタルスペース。ベビー用品完備、駅近アクセス良好。29㎡・最大18名で、4〜10名のママ会に最適。",
  keywords:
    "ママ会,レンタルスペース,名古屋,矢場町,栄,大須,完全個室,ベビー用品,推し活,女子会,パーティー,子連れ歓迎,くま映え",
  authors: [{ name: "Moff room 名古屋店" }],
  creator: "Moff room 名古屋店",
  publisher: "Moff room 名古屋店",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://nagoya.moffroom.com/",
    title: "Moff room 名古屋店 | ママ会・推し活に最適な完全個室レンタルスペース",
    description:
      "矢場町駅徒歩約6分！1フロア1室の完全個室でママ会や推し活が楽しめるレンタルスペース。ベビー用品完備、駅近アクセス良好。",
    siteName: "Moff room 名古屋店",
    images: [
      {
        url: "/images/e5-90-8d-e5-8f-a4-e5-b1-8b.webp",
        width: 1200,
        height: 630,
        alt: "Moff room 名古屋店の内観",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moff room 名古屋店 | ママ会・推し活に最適な完全個室レンタルスペース",
    description: "矢場町駅徒歩約6分！1フロア1室の完全個室でママ会や推し活が楽しめるレンタルスペース。",
    images: ["/images/e5-90-8d-e5-8f-a4-e5-b1-8b.webp"],
  },
  alternates: {
    canonical: "https://nagoya.moffroom.com/",
  },
  generator: "v0.dev",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/JKG-M_3.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <JsonLdScripts />
      </head>
      <body className={cn("min-h-screen bg-white font-jkg text-gray-800 antialiased")}>
        <Script id="vh-setup" strategy="afterInteractive">
          {`
            const setVh = () => {
              if (window.visualViewport) {
                document.documentElement.style.setProperty('--vh', window.visualViewport.height * 0.01 + 'px');
              }
            };
            if (window.visualViewport) {
              window.visualViewport.addEventListener('resize', setVh);
              setVh();
            }
          `}
        </Script>
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="shVj0X6Yvet2OH3w/YcuCw"
          strategy="afterInteractive"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4KJB5CNMRE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4KJB5CNMRE', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        <PreloaderProvider>
          <Preloader logoUrl="/images/moff-room-logo-preloader.png" />
          {children}
        </PreloaderProvider>
        <FloatingCTA />
        <ChatBot />
      </body>
    </html>
  )
}
