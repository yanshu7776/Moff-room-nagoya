import type { Metadata } from "next"
import TermsOfSaleClient from "./terms-of-sale-client"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Moff room 御徒町本店",
  description:
    "Moff room 御徒町本店の特定商取引法に基づく表記です。販売事業者情報、お支払い方法、キャンセル・返金について詳しく記載しています。",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://moffroom-okachimachi.com/terms-of-sale",
  },
}

export default function TermsOfSalePage() {
  return <TermsOfSaleClient />
}
