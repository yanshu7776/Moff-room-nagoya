"use client"

import { useState } from "react"
import Link from "next/link" // Linkコンポーネントをインポート
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube } from "lucide-react"
// useIsMobileフックはここでは使用しませんが、必要に応じて残しておいても構いません。
// import { useIsMobile } from "@/hooks/use-mobile"

export default function Planner5DEmbed() {
  const [show3D, setShow3D] = useState(false)
  // const isMobile = useIsMobile() // モバイル判定フックはここでは使用しません

  const plannerUrl = "https://planner5d.com/view/?key=fbda36fff8bd56f941b6c931586430be"

  return (
    <div className="my-12">
      {!show3D ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 min-h-[400px] text-center border-2 border-dashed border-gray-200">
          <Cube className="w-16 h-16 text-pink-300 mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 font-heading">
            インタラクティブな3Dフロアプラン
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
            下のボタンをクリックすると、お部屋の様子を3Dで自由に見て回ることができます。
          </p>
          <Button
            onClick={() => setShow3D(true)}
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg text-base sm:text-lg px-8 py-6"
          >
            3Dフロアプランを表示する
          </Button>
          <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
            ※ モバイル版（スマホ）では、3Dの表示に数分かかる場合や、端末の性能により表示されない場合がございます。
            <br />
            表示されない場合は、
            <Link href={plannerUrl} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
              こちらから別タブで開く
            </Link>
            ことをお勧めします。
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">3Dフロアプランで室内を体験</h3>
          <div className="relative w-full h-0 pb-[56.25%] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`${plannerUrl}&embed=1`}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              title="Moff Room 3D Floor Plan"
            />
          </div>
          <p className="text-center mt-4 text-sm text-gray-600">
            3Dビューをドラッグして、お部屋の隅々までご覧いただけます。スクロールで拡大・縮小も可能です。
          </p>
        </div>
      )}
    </div>
  )
}
