// JSON-LD structured data for SEO
// This component renders JSON-LD scripts for search engine optimization

const localBusinessSchema = {
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
  sameAs: [
    "https://kashispace.com/room/detail?id=6208",
    "https://www.spacemarket.com/spaces/moffroom_nagoya/",
    "https://www.instabase.jp/space/1597050978",
    "https://www.instagram.com/moff_room",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "完全個室" },
    { "@type": "LocationFeatureSpecification", name: "ベビー用品完備" },
    { "@type": "LocationFeatureSpecification", name: "キッチン完備" },
    { "@type": "LocationFeatureSpecification", name: "駅近アクセス" },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "何人まで使えますか？広さは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "最大18名／29㎡です。4〜10名のママ会にちょうど良いサイズ。",
      },
    },
    {
      "@type": "Question",
      name: "子連れ向け設備とベビーカーは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "授乳室、オムツ台完備！クッションフロア／ベビーサークル／おもちゃ多数／バンボ×2／バウンサー／撮影用バースデー帽子を用意。",
      },
    },
    {
      "@type": "Question",
      name: "飲食やキッチン利用はできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可能です（持ち込みOK・飲酒OK）。冷蔵庫／電子レンジ／電気ケトル／IH／鍋セット／たこ焼き器／ホットプレート／人数分の食器・カトラリーあり。",
      },
    },
  ],
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Moff Room",
  url: "https://www.moffroom.com/",
  logo: "https://nagoya.moffroom.com/images/moff-room-logo-preloader.png",
  sameAs: ["https://www.instagram.com/moff_room"],
  description: "ママ会・推し活に最適な完全個室レンタルスペース",
}

export function JsonLdScripts() {
  // Return null in browser environment to avoid hydration warnings
  if (typeof window !== 'undefined') {
    return null
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
