import type { Metadata } from "next"
import { AlertTriangle } from "lucide-react"
import SiteHeader from "@/components/header"
import SiteFooter from "@/components/footer"

export const metadata: Metadata = {
  title: "ゲスト規約 | Moff room 御徒町本店",
  description:
    "Moff room 御徒町本店のゲスト規約です。ご利用前に必ずお読みください。安全で快適なご利用のためのルールを定めています。",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://moffroom-okachimachi.com/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  const companyName = "Moff room"

  return (
    <div className="flex flex-col min-h-screen bg-custom-beige-lighter">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-custom-beige-lighter py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
            <header className="text-center mb-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-orange-500" aria-hidden="true" />
              <h1 className="text-3xl font-bold text-gray-800">
                ゲスト規約{" "}
                <span className="text-lg text-gray-500 font-medium block sm:inline mt-1 sm:mt-0">
                  [Guest Terms & Conditions]
                </span>
              </h1>
              <div className="h-1 w-24 bg-orange-500 opacity-50 mx-auto my-6"></div>
            </header>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
              <p className="text-red-700 font-semibold text-center">※必ず最後までお読みください</p>
              <div className="mt-3 space-y-1 text-red-600 text-sm">
                <p>・利用規約を守らない場合は、厳密に対応させていただきます。</p>
                <p>・ご予約後は、すべての利用規約に同意したことになります。</p>
                <p>・当スペースは防犯上のため、監視カメラを設置しております。</p>
              </div>
            </div>

            <article className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6">
                <span className="bg-red-200 px-2 py-1 rounded-sm">【禁止事項】</span>
              </h2>
              <ul className="list-disc list-inside text-base text-gray-700 leading-relaxed space-y-2 pl-4">
                <li>タバコの喫煙</li>
                <li>異臭・強い匂い</li>
                <li>騒音・大きな音</li>
              </ul>
            </article>

            <article className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6">
                <span className="bg-yellow-200 px-2 py-1 rounded-sm">【注意事項】</span>
              </h2>
              <ul className="list-disc list-inside text-base text-gray-700 leading-relaxed space-y-2 pl-4">
                <li>近所の迷惑なので、騒音はNGです。</li>
                <li>楽器の使用は禁止です。</li>
                <li>ペットの持ち込みは禁止しています。</li>
                <li>使用後は清掃をお願いします。必ず現状復帰で退出してください。</li>
                <li>キッチンの備品を使用している場合は、必ず元に戻してください。</li>
                <li>室内は完全禁煙です</li>
                <li>レイアウトを変更する理由は、退室後に必ず元に戻してください。</li>
                <li>お客様がお持ち込みいただいたものは、全てお客様でお持ち帰りください。</li>
                <li>各種設備は、盗難・不具合により利用困難となった場合、保証や返金はいたしかねます。</li>
              </ul>
            </article>

            <article className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6">
                <span className="bg-blue-200 px-2 py-1 rounded-sm">【自然災害やコロナウイルス等のキャンセル料】</span>
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                当スペースでは、自然災害(台風・地震・大雨等)や新型コロナウイルス感染等の理由によるキャンセルは、キャンセルポリシーに基づき、キャンセル料金がかかることをご了承くださいませ。
              </p>
            </article>

            <article className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6">
                <span className="bg-red-300 px-2 py-1 rounded-sm">【違約金について】</span>
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                お客様が利用規約を守れなかった場合は、以下の通りに違約金を請求させていただきます。
              </p>
              <div className="space-y-3">
                {[
                  {
                    num: "①",
                    violation: "室内・廊下・建物前での喫煙・吸い殻放置(電子タバコ・ベイプ等水蒸気が発するもの全て)",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "②",
                    violation: "近隣からの苦情や騒音につながる迷惑行為",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "③",
                    violation: "ゴミの不始末: 室内に放置、ベランダ、共用部に捨てる行為・近隣に捨てる行為",
                    penalty: "違約金30,000円+清掃にかかる実費",
                  },
                  {
                    num: "④",
                    violation: "防犯カメラを動かす/隠す/コンセントを抜くなどの妨害行為",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "⑤",
                    violation: "スペース/共用部の建物・設備・備品などの破損、汚損行為",
                    penalty: "違約金50,000円+清掃にかかる実費",
                  },
                  {
                    num: "⑥",
                    violation: "利用用途と大きく異なる定員オーバー",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "⑦",
                    violation: "臭いの強い食品や調理により、臭いが取れなくなった場合",
                    penalty: "違約金50,000円+清掃にかかる実費",
                  },
                  {
                    num: "⑧",
                    violation: "スペースの未施錠(ドア、窓、キーボックス等)による盗難や破損の被害",
                    penalty: "違約金50,000円+警察通報",
                  },
                  {
                    num: "⑨",
                    violation: "セルフクリーニングが不十分で清掃員の派遣が必要な場合",
                    penalty: "違約金30,000円+清掃にかかる実費",
                  },
                  {
                    num: "⑩",
                    violation: "無断での遅延、利用開始前の入室行為",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "⑪",
                    violation: "次に利用される方とトラブル（損害）になった場合",
                    penalty: "違約金30,000円",
                  },
                  {
                    num: "⑫",
                    violation: "その他、スペースの運営に支障をきたす行為、禁止事項に当たる行為",
                    penalty: "違約金30,000円+実費",
                  },
                  {
                    num: "⑬",
                    violation: "お客様の過失により施設運営が継続できない場合",
                    penalty: "違約金300万円+損害賠償請求の民事訴訟を提起します",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-400">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold text-red-600">{item.num}</span> {item.violation}
                    </p>
                    <p className="text-sm font-semibold text-red-700 mt-1">{item.penalty}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6">
                <span className="bg-orange-200 px-2 py-1 rounded-sm">【追加事項】</span>
              </h2>
              <ul className="list-disc list-inside text-base text-gray-700 leading-relaxed space-y-2 pl-4">
                <li>違約金をお支払いいただけない場合は、お連れ様・ご家族・職場・学校等へご相談させていただきます。</li>
                <li>トラブルの際は、防犯カメラで状況を確認していただき、警察に提出する</li>
                <li>汚損や破損は、保険適応される場合がございますのでご報告ください。</li>
              </ul>
            </article>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
              <p className="text-green-800 font-semibold mb-2">
                皆様に快適にご利用いただくために、上記の利用規約を設けております。
              </p>
              <p className="text-green-700 font-medium">同意をお願いいたします</p>
            </div>

            <footer className="border-t border-gray-200 pt-6 mt-10 text-sm text-gray-600">
              <p>最終更新日: 2025年6月23日</p>
            </footer>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
