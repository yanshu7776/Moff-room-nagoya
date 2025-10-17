"use client"

import { useRouter } from "next/navigation"
import { FileText, X, ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/header"
import SiteFooter from "@/components/footer"

const termsData = [
  {
    label: "販売事業者名（会社名）",
    value: "Moff room",
  },
  {
    label: "代表者名",
    value: "山口有紀",
  },
  {
    label: "所在地",
    value: "東京都大田区南馬込6-11-15 502",
  },
  {
    label: "お問い合わせ",
    value: "moffroom@gmail.com",
  },
  {
    label: "販売価格",
    value: "各ページに記載しております。消費税は内税として表示しております。",
  },
  {
    label: "お支払い方法",
    value: "カード、銀行振込、PayPayなど",
  },
  {
    label: "商品代金以外の必要料金",
    value: "消費税",
  },
  {
    label: "お申し込み方法",
    value: "予約サイトより",
  },
  {
    label: "キャンセル・返金について",
    value: "予約確定後のキャンセルは各店舗の規定に従ってキャンセル料が発生します",
  },
  {
    label: "屋号又はサービス名",
    value: "Moff room",
  },
  {
    label: "ホームページアドレス",
    value: "https://moff-room.vercel.app/",
  },
]

export default function TermsOfSaleClient() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-custom-beige-unified font-jkg">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-custom-beige-unified">
          <div className="container max-w-4xl mx-auto px-4 relative">
            <button
              onClick={() => router.back()}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors z-10"
              aria-label="閉じる"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Pink striped header */}
            <div
              className="h-4 mb-8"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, #ff69b4 0px, #ff69b4 8px, transparent 8px, transparent 16px)",
              }}
            ></div>

            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <FileText className="w-12 h-12 text-gray-600 mr-3" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 italic font-jkg">Terms-of-Sale</h1>
                  <p className="text-lg text-gray-600 mt-1 font-jkg">（特定商取引法）</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {termsData.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row">
                  <div className="bg-gray-700 text-white font-medium px-6 py-4 flex items-center justify-center md:justify-start md:w-80 flex-shrink-0 rounded-l-2xl md:rounded-r-none rounded-r-2xl font-jkg">
                    {item.label}
                  </div>
                  <div className="bg-white text-gray-800 px-6 py-4 rounded-r-2xl md:rounded-l-none rounded-l-2xl border border-gray-200 flex-grow flex items-center shadow-sm">
                    <div className="w-full font-jkg">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pink striped footer */}
            <div
              className="h-4 mt-8"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, #ff69b4 0px, #ff69b4 8px, transparent 8px, transparent 16px)",
              }}
            ></div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                戻る
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
