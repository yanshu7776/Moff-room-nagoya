import type { Metadata } from "next"
import TermsOfSaleClient from "./terms-of-sale-client"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Moff room 名古屋店",
  description:
    "Moff room 名古屋店の特定商取引法に基づく表記です。販売事業者情報、お支払い方法、キャンセル・返金について詳しく記載しています。",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nagoya.moffroom.com/terms-of-sale",
  },
}

export default function TermsOfSalePage() {
  return <TermsOfSaleClient />
}
