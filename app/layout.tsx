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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Moff room 名古屋店",
              description: "ママ会・推し活に最適な完全個室レンタルスペース",
              url: "https://nagoya.moffroom.com/",
              telephone: "+81-90-4286-2443",
              image: "/images/e5-90-8d-e5-8f-a4-e5-b1-8b.webp",
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
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
              priceRange: "¥425-¥5890",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "7",
                bestRating: "5",
                worstRating: "4",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-11-06",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "子供の1歳の誕生日のお祝いに両祖父母と集まるためにお借りしました。一升餅や選びとりカードなど、少しだけ机を動かせば十分なスペースでした。",
                  name: "みんなでお祝いできました！",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-27",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "ハロウィンパーティーの下見を兼ねてパーティー会場を利用させていただきました。広さ、雰囲気とも大変気に入りました。",
                  name: "ハロウィン",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-26",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "お部屋の中はクマいっぱいでとてもかわいいお部屋でした！プロジェクターもあり音楽を流したりすることもできとても楽し時間を過ごせました！",
                  name: "かわいいくまのお部屋",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-26",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "とても綺麗で使いやすいです✨大人6人、子ども10人で利用しました。プロジェクターや可愛いくまさんのぬいぐるみがあり、とてもインスタ映えしました。",
                  name: "おすすめのレンスペです♡",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-12",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "4",
                    bestRating: "5",
                  },
                  reviewBody:
                    "3組6人で使用しました。おもちゃはいろんな種類があって、2歳の娘は喜んでいました。カトラリーも子供用のお皿が3皿あるなど充実していました。",
                  name: "子連れでハロウィンママ会",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-09",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "名古屋矢場町からすぐ立地の良さ！室内はたくさんのクマさんがお出迎えしてくれました♪ベビーからキッズまで遊べるおもちゃがたくさんあり、おむつ替えスペースも綺麗でした！",
                  name: "ベビーハロウィン会で利用しました！",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "お客様",
                  },
                  datePublished: "2025-10-06",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "お友達の家に行ったような感覚で、子どももママも始終リラックスして過ごせました！おもちゃも性別問わず遊べるものばかりで助かりました◎",
                  name: "清潔感がありおもちゃが充実しており、子どもたちがとても楽しそうでした！",
                },
              ],
              sameAs: [
                "https://kashispace.com/room/detail?id=6208",
                "https://www.spacemarket.com/spaces/moffroom_nagoya/",
                "https://www.instabase.jp/space/1597050978",
                "https://www.instagram.com/moff_room",
              ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "何人まで使えますか？広さは？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "最大18名／29㎡です。4〜10名のママ会にちょうど良いサイズ。※11名以上は人数追加オプション￥1,100/名（未就学児は人数カウント不要）",
                  },
                },
                {
                  "@type": "Question",
                  name: "子連れ向け設備とベビーカーは？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "授乳室、オムツ台完備！クッションフロア／ベビーサークル／おもちゃ多数／バンボ×2／バウンサー／撮影用バースデー帽子を用意。ベビーカーは廊下に駐輪。建物はEV有、ただし入口からEVまで約10段の階段があります。",
                  },
                },
                {
                  "@type": "Question",
                  name: "飲食やキッチン利用はできますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "可能です（持ち込みOK・飲酒OK）。冷蔵庫／電子レンジ／電気ケトル／IH／鍋セット／たこ焼き器／ホットプレート／人数分の食器・カトラリーあり。※調味料は置いていません。",
                  },
                },
                {
                  "@type": "Question",
                  name: "料金と予約単位の目安は？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "早朝プラン￥425〜/時間（1時間〜）、通常プラン￥1,472〜/時間（3時間〜・維持管理費￥2,500）。日程により最大￥5,890/時間。即時予約OKです。",
                  },
                },
                {
                  "@type": "Question",
                  name: "ゴミは捨てられますか？片付けは？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "有料オプション￥1,100/袋でお風呂場のゴミ捨て場に廃棄可（可燃・缶・ビン・PETの分別必須）。未分別は別途￥20,000。ご利用後は清掃・原状回復をお願いします。",
                  },
                },
                {
                  "@type": "Question",
                  name: "アクセスと駐車場は？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "名城線「矢場町駅」徒歩約6分（住所：名古屋市中区大須4-1-7 サンポートヤバビル703）。上前津・大須観音・栄も徒歩圏。専用駐車場はありませんが、近隣にコインパーキング多数あります。",
                  },
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "ホーム",
                  item: "https://nagoya.moffroom.com/",
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Moff Room",
              url: "https://www.moffroom.com/",
              logo: "https://nagoya.moffroom.com/images/moff-room-logo-preloader.png",
              sameAs: ["https://www.instagram.com/moff_room"],
              description: "ママ会・推し活に最適な完全個室レンタルスペース",
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
