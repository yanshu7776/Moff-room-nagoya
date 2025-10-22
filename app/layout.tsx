import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"
import { PreloaderProvider } from "@/contexts/preloader-context"
import Preloader from "@/components/preloader"
import { ChatBot } from "@/components/chat-bot"
import FloatingCTA from "@/components/floating-cta"

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
        url: "/images/hero-background.webp",
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
    images: ["/images/hero-background.webp"],
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Moff room 名古屋店",
              description: "ママ会・推し活に最適な完全個室レンタルスペース",
              url: "https://nagoya.moffroom.com/",
              telephone: "+81-52-XXXX-XXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "大須4-1-7 サンポートヤバビル703",
                addressLocality: "中区",
                addressRegion: "愛知県",
                postalCode: "460-0011",
                addressCountry: "JP",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 35.1617145,
                longitude: 136.9069915,
              },
              openingHours: "Mo-Su 00:00-24:00",
              priceRange: "¥425-¥5890",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "完全個室",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "ベビー用品完備",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "キッチン完備",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "駅近アクセス",
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
             const setVh = () => {
               document.documentElement.style.setProperty('--vh', window.visualViewport.height * 0.01 + 'px');
             };
             window.visualViewport.addEventListener('resize', setVh);
             setVh();
           `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-white font-jkg text-gray-800 antialiased")}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4KJB5CNMRE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4KJB5CNMRE');
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
