"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import SiteHeader from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Lock,
  Train,
  Users,
  Baby,
  UtensilsCrossed,
  Trash2,
  CircleDollarSign,
  CalendarCheck,
  BookOpen,
  PencilLine,
  MapPin,
  Globe,
} from "lucide-react"
import ImageCarousel from "@/components/image-carousel"
import { featuresGalleryImages, type GalleryImage } from "@/lib/features-gallery-images"
import ReviewsCarousel from "@/components/reviews-carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SiteFooter from "@/components/footer"

// Define types for this page
type Review = {
  title: string
  comment: string
  age: string
  purpose: string
  rating: number
}

type Store = {
  id: string
  name: string
  description: string
  imageSrc: string
  detailsLink: string
  accentColorClass: string
  location: string
  fullAddress?: string
  region: "kanto" | "kansai" | "chubu" | string // Added "chubu" for Nagoya
}

export type StoreWithReviews = Store & {
  reviews: {
    averageRating: string
    totalReviews: number
    featured: Review[]
  }
}

const nagoyaStore: StoreWithReviews = {
  id: "nagoya",
  name: "名古屋店",
  description:
    "名古屋・矢場町駅から徒歩約6分。くま映え×自然光で写真が可愛い完全個室。ママ会・女子会・撮影に最適な温かい空間です。",
  imageSrc: "/images/hero-background.webp",
  detailsLink: "https://www.spacemarket.com/spaces/moffroom_nagoya/?room_uid=NC1sqTIzP-bV8bQ5",
  accentColorClass: "rgb(202,229,206)",
  location: "愛知県名古屋市",
  fullAddress: "愛知県名古屋市中区大須4-1-7 サンポートヤバビル703（7F）",
  region: "chubu", // Updated region
  reviews: {
    averageRating: "4.7",
    totalReviews: 76,
    featured: [
      // In production, replace with actual Nagoya store reviews
      {
        title: "ホストの対応が迅速で安心しました！",
        comment:
          "ママ友達と赤ちゃん連れで利用しました。 ギリギリまで人数が確定せず、メッセージでやり取りをしていたのですが、対応が丁寧かつ迅速だったためこちらも安心して利用することができました。 部屋の中もとても綺麗で可愛らしく、子供達の写真もたくさん撮ることが出来ました☺️ 赤ちゃん連れで安心して利用できるスペースは貴重だと思います！ また機会があれば利用させていただきます✨",
        age: "30代・女性",
        purpose: "パーティー利用",
        rating: 5,
      },
      {
        title: "とても綺麗なスペースでした！",
        comment:
          "ママ会・ハロウィン撮影で利用しました。小物を少しもっていくだけで、可愛いスペースができて、ハロウインで仮装したかわいい息子の写真が撮影できました！ おもちゃもたくさんあり、１歳の息子たちは楽しく遊べてとても良かったです。 ベビーカーを置くスペースもしっかりあり、エレベーターの入り口は狭いですが、中に入ると大満足です。 ぜひまたママ会で利用したいです！",
        age: "40代",
        purpose: "パーティー利用",
        rating: 5,
      },
      {
        title: "みんなが幸せになる素敵な空間",
        comment:
          "初めて利用しました。とっても素敵な空間で自然とみんなで幸せな時間を共有できました。場所も分かりやすくスタッフの方の対応もスムーズです！ 必ずまた利用します！",
        age: "40代",
        purpose: "勉強・読書利用",
        rating: 5,
      },
      {
        title: "子連れでも存分に楽しめる素敵な空間でした！",
        comment:
          "今回25名でご利用させてもらいました！ 子連れでも存分に楽しめるような素敵な空間でしたし、スタッフさんの対応がいつも早くてご丁寧に対応していただけて大変満足致しました！",
        age: "20代・グループ",
        purpose: "オフ会利用",
        rating: 5,
      },
      {
        title: "とても素敵なお部屋でした！",
        comment:
          "この度はありがとうございました。 やりとりの段階からとてもスムーズで安心できました。お部屋も広く綺麗で、おもちゃや備品も色々ありとても助かりました。 また機会がありましたらよろしくお願いします。",
        age: "30代・女性",
        purpose: "おしゃべり会",
        rating: 5,
      },
      {
        title: "赤ちゃん連れでも安心して利用できる配慮が◎",
        comment:
          "掲載の通り、赤ちゃん連れでも安心して利用できる配慮がなされていて、とても良かったです。 テーブルの角にクッション材がついたり、備品のなかに、子供服を無料で1枚、というサービスもあり、子供が服を汚してしまったりした時、とても有り難いと思いました。 近くに小さいですが食品スーパーがあり、途中の買い出しにも都合良かったです。 是非また利用したいです。",
        age: "30代・ファミリー",
        purpose: "ホームパーティー",
        rating: 5,
      },
      {
        title: "女子会や子連れのパーティーに最適",
        comment:
          "駅から迷わずいけました。複数駅・複数路線が使えるので、参加者の居住地がバラバラでも集まりやすい。矢場町駅から徒歩約6分で、道も分かりやすかったです。 ワンフロアワンルームのようで、エレベーターは1機ですが混み合うことはなさそうです。 ローテーブル、ハイテーブルがあり大人数でのパーティがしやすかったです。 オーナーさんは、レスポンスも早く、対応も丁寧で助かりました。 予約前の問い合わせの段階から安心ができるご対応をしていただけました。",
        age: "20代・女性グループ",
        purpose: "おしゃべり会",
        rating: 5,
      },
      {
        title: "とっても可愛い部屋で、ママ会にぴったりでした！",
        comment:
          "とっても可愛い部屋で、ママ会にぴったりでした！ 清掃手順も詳しく決まっていたので、とても綺麗でした。オーナーさんは、質問にも丁寧に答えて下さり、とても良かったです。また利用したいと思います。",
        age: "30代・ママ",
        purpose: "ママ会",
        rating: 5,
      },
      {
        title: "各年齢で遊べるおもちゃにパパママ感動！",
        comment:
          "０歳、２歳の赤ちゃんとこども3人含め、各年齢で遊べるおもちゃや、バウンサー・洋服等至れり尽くせりでパパママの参加者みんな感動してました！ また機会があれば利用させていただきます。 ありがとうございました😊",
        age: "30代・友人グループ",
        purpose: "おしゃべり会",
        rating: 4,
      },
    ],
  },
}

const BOOKING_URL = nagoyaStore.detailsLink || "https://example.com/booking" // Replace with actual booking URL if different

const benefits = [
  { icon: CircleDollarSign, text: "早朝¥425〜／通常¥1,472〜でコスパ良好" },
  { icon: Lock, text: "1フロア1室の完全個室（泣いてもOK）" },
  { icon: MapPin, text: "名古屋・矢場町のレンタルスペース（駅約6分）" },
  { icon: Users, text: "29㎡・最大18名、4〜10名のママ会に最適" },
  { icon: Star, text: "🧸くま映え×自然光で写真が可愛い" },
  { icon: Baby, text: "ベビーグッズ充実（サークル／おもちゃ 等）" },
  { icon: UtensilsCrossed, text: "キッチン完備・飲食／飲酒OK" },
  { icon: Globe, text: "Wi-Fi（光）＋プロジェクターで鑑賞会◎" },
  { icon: Trash2, text: "建物内ゴミ捨て可（有料・分別必須）" },
  { icon: Train, text: "ベビーカー置き場・EV有（入口前に10段）" },
  { icon: PencilLine, text: "商用撮影OK（YouTube／コスプレ可）" },
  { icon: CalendarCheck, text: "即時予約OK＆トップホストが迅速対応" },
]

const faqs = [
  {
    q: "何人まで使えますか？広さは？",
    a: "最大18名／29㎡です。4〜10名のママ会にちょうどいいサイズ。※11名以上は人数追加オプション￥1,100/名（未就学児は人数カウント不要）",
  },
  {
    q: "子連れ向け設備とベビーカーは？",
    a: "クッションフロア／ベビーサークル／おもちゃ多数／バンボ×2／バウンサー／撮影用バースデー帽子を用意。ベビーカーは廊下に駐輪。建物はEV有、ただし入口からEVまで約10段の階段があります。",
  },
  {
    q: "飲食やキッチン利用はできますか？",
    a: "可能です（持ち込みOK・飲酒OK）。冷蔵庫／電子レンジ／電気ケトル／IH／鍋セット／たこ焼き器／ホットプレート／人数分の食器・カトラリーあり。※調味料は置いていません。",
  },
  {
    q: "料金と予約単位の目安は？",
    a: "早朝プラン￥425〜/時間（1時間〜）、通常プラン￥1,472〜/時間（3時間〜・維持管理費￥2,500）。日程により最大￥5,890/時間。即時予約OKです。",
  },
  {
    q: "ゴミは捨てられますか？片付けは？",
    a: "有料オプション￥1,100/袋で館内廃棄可（可燃・缶・ビン・PETの分別必須）。未分別は別途￥20,000。ご利用後は清掃・原状回復をお願いします。",
  },
  {
    q: "アクセスと駐車場は？",
    a: "名城線「矢場町駅」徒歩約6分（住所：名古屋市中区大須4-1-7 サンポートヤバビル703）。上前津・大須観音・栄も徒歩圏。専用駐車場はありませんが、近隣にコインパーキング多数あります。",
  },
]

const features = [
  {
    number: "01",
    title: '泣いてもOK、周りに気をつかわない"完全個室"',
    description:
      "1フロア1室のプライベート空間。矢場町駅から徒歩約6分、29㎡・最大18名で、4〜10名のママ会にちょうどいいサイズ。赤ちゃんがぐずっても気兼ねなく過ごせます。",
    imageSrc: "/images/features/moms-gathering-space-2.webp",
    imageAlt: "完全個室のプライベート空間",
  },
  {
    number: "02",
    title: '"くま映え"×自然光で、とびきり可愛い写真に',
    description:
      "大きなクマ🧸と明るい内装でSNS映え。撮影用バースデー帽子もご用意。名古屋・矢場町のレンタルスペースで、集合写真やバースデーフォトがきれいに残せます—**女子会・誕生日・撮影にも◎**。",
    imageSrc: "/images/features/tableware.webp",
    imageAlt: "くま映えする可愛い空間",
  },
  {
    number: "03",
    title: "子連れ安心の装備が最初からそろう",
    description:
      "クッションフロア／ベビーサークル／おもちゃ多数／バンボ×2／バウンサーなど、月齢に合わせて使えるベビーグッズを完備。ベビーカー置き場あり（※室内ではなく廊下に駐輪）。",
    imageSrc: "/images/features/child-rocking-horse.webp",
    imageAlt: "充実したベビーグッズ",
  },
  {
    number: "04",
    title: "手ぶらで楽しめて片付けもラク（キッチン＆プロジェクター）",
    description:
      "冷蔵庫・電子レンジ・電気ケトル・IH・鍋セット・たこ焼き器・ホットプレート、人数分の食器も完備。Wi-Fi（光）＆プロジェクター・HDMIで映画鑑賞・スポーツ観戦・推し活・YouTube収録も快適。**飲食・飲酒可**、建物内ゴミ捨てOK（有料・分別必須）。料金は**早朝¥425〜／通常¥1,472〜**（日程により最大¥5,890/時）、**お得意様割15%**も利用可。",
    imageSrc: "/images/features/spacious-37m2-room.webp",
    imageAlt: "充実したキッチン設備",
  },
]

const specs = [
  { label: "広さ／定員", value: "約29㎡／最大18名（4〜10名のママ会に最適）" },
  {
    label: "キッチン設備",
    value:
      "IHコンロ／冷蔵庫／電子レンジ／電気ケトル／鍋セット／トング類／たこ焼き器／ホットプレート／食器類：大皿×20／小皿×20／グラス×20／マグ×10／カトラリー（お子様用あり）※調味料の設置はありません",
  },
  {
    label: "エンタメ・AV／ネットワーク",
    value:
      "プロジェクター・スクリーン／HDMIケーブル／Wi-Fi（光回線）／各種ゲーム（大人気ゲーム機 ※作品持込OK）／映画鑑賞・スポーツ観戦・推し活上映に",
  },
  {
    label: "ベビー用品（子連れ向け）",
    value:
      "クッションフロア（転んでも安心）／ベビーサークル／おもちゃ多数／バンボ×2／バウンサー／撮影用バースデー帽子／ベビーカー置き場あり（※室内ではなく廊下に駐輪）",
  },
  {
    label: "家具・室内",
    value:
      "ローテーブル×2／ソファ／ダイニングテーブル×2／収納ベンチ×4／椅子・テーブル／エアコン（冷暖房）／電源タップ・延長コード",
  },
  {
    label: "撮影関連",
    value: "自然光／三脚／商用撮影可（YouTube等の配信目的も可）",
  },
  {
    label: "そのほか",
    value:
      "飲食・飲酒可／有料ゴミ捨て可（ベランダ・分別必須／未分別は別途費用）／エレベーター／防犯カメラ（入退室・トラブル時のみ確認）／禁煙",
  },
]

export type PageProps = {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  onInquiryClick: () => void
}

export default function NagoyaPage({ modalOpen, setModalOpen, onInquiryClick }: PageProps) {
  const problems = [
    {
      src: "/images/problems/problem-cafe-vs-playground-new.png",
      alt: "カフェだと子どもは退屈、遊び場だとママは休めないという悩み",
    },
    {
      src: "/images/problems/problem-child-anxiety-new-place.png",
      alt: "初めての場所で子どもが泣いたり騒いだりしないか不安という悩み",
    },
    {
      src: "/images/problems/problem-with-luggage.png",
      alt: "子連れだと荷物が多くてどこへ行くにも大移動という悩み",
    },
    {
      src: "/images/problems/problem-rainy-stroller.png",
      alt: "雨の日にベビーカーを押しながら傘をさすのは大変だという悩み",
    },
    {
      src: "/images/problems/problem-work-while-watching-kids.png",
      alt: "子どもを遊ばせながら仕事や勉強もできたら良いのにという悩み",
    },
  ]

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-custom-beige-unified overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 w-full pt-[88px]">
        {/* Hero Section */}
        <section className="relative w-full h-[90vh] md:h-screen text-white overflow-hidden">
          <Image
            src="/images/hero-background.webp"
            alt="Moff Roomの暖かく居心地の良い室内"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto"
            >
              <div className="md:hidden">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight text-shadow-md">
                  <span className="block mb-2 text-pink-400 font-bold text-4xl mt-[-108px]">＼NEW OPEN／</span>
                  <span className="block mb-2">レンタルスペース 名古屋・矢場町</span>
                  <span className="block text-lg mb-2">（駅約6分）</span>
                  <span className="block text-pink-400 text-xl mb-2">🧸映え×子連れ安心🧸 ｜最大18名｜¥425〜</span>
                </h1>
              </div>

              <div className="hidden md:block">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-shadow-md">
                  <span className="block mb-3 text-pink-400 font-bold leading-[7.75rem] tracking-normal text-8xl mt-[-182px]">
                    ＼NEW OPEN／
                  </span>
                  <span className="block mb-3 font-black">
                    レンタルスペース 名古屋・矢場町駅
                    <br />
                    徒歩約6分
                  </span>
                  <span className="block text-pink-400 text-2xl lg:text-3xl xl:text-4xl mb-4">
                    🧸くま映えの完全個室🧸
                  </span>
                  <span className="block text-xl lg:text-2xl xl:text-3xl mb-3">ママ会・誕生日・推し活・撮影に。</span>
                  <span className="block text-lg lg:text-xl xl:text-2xl text-gray-200">
                    最大18名・29㎡／子連れOK・ベビーグッズ多数／
                    <br />
                    キッチン・Wi-Fi・プロジェクター。
                  </span>
                </h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-8 w-full max-w-sm mx-auto px-4"
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg animate-bounce text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
              >
                <Link href={nagoyaStore.detailsLink} target="_blank" rel="noopener noreferrer">
                  今すぐ予約する▶︎
                </Link>
              </Button>
              <p className="mt-3 sm:text-base font-semibold text-yellow-300 text-shadow text-xs">
                【ここから予約すると15%OFF！！実施中！】
              </p>
            </motion.div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="bg-white py-12 md:py-16 w-full overflow-hidden">
          <ImageCarousel
            images={featuresGalleryImages.map((image) => image.src)}
            placeholder="blur"
            sizes="(max-width: 768px) 280px, 280px"
          />
        </section>

        {/* Problems Section */}
        <motion.section
          id="problems"
          className="py-12 md:py-20 bg-white w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-6xl mx-auto text-gray-800 px-4">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-heading relative inline-block">
                <span className="relative px-2">
                  こんなお悩みありませんか？
                  <span className="absolute bottom-[-4px] left-0 w-full h-1.5 bg-yellow-300"></span>
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
              {problems.map((problem, index) => (
                <div key={index} className="w-full max-w-[280px] sm:max-w-[320px]">
                  <Image
                    src={problem.src || "/placeholder.svg"}
                    alt={problem.alt}
                    width={320}
                    height={320}
                    className="w-full h-auto"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={problem.src}
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 340px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Thoughts Section */}
        <motion.section
          id="our-thoughts"
          className="bg-custom-beige-accent py-12 md:py-16 w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-3 flex justify-center items-center">
                <Image
                  src="/images/our-thoughts-owner.png"
                  alt="Moff room代表と子供"
                  width={340}
                  height={340}
                  className="rounded-full object-cover w-full max-w-[280px] sm:max-w-[340px] h-auto aspect-square"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/our-thoughts-owner.png"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 340px"
                />
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-heading text-red-400">
                  私たちの想い
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                  実は、私たち自身も子育て中に
                  <br className="md:hidden" />
                  同じ悩みを抱えていました。
                  <br className="md:hidden" />
                  カフェはママが楽しくても子どもは退屈、
                  <br className="md:hidden" />
                  遊び場は子どもが楽しくても
                  <br className="md:hidden" />
                  ママは話しづらい——。
                </p>
                <div className="my-4 p-4 bg-white border-l-4 border-pink-500 rounded-r-lg shadow-md">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 leading-snug">
                    「ママも子どもも、どっちも
                    <br className="md:hidden" />
                    主役になれる場所を。」
                  </p>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                  その想いから、秋葉原店に続く、
                  <br className="md:hidden" />
                  名古屋・矢場町の個室レンタルスペース
                  <br className="md:hidden" />
                  「Moff room 名古屋」をオープン。
                  <br className="md:hidden" />
                  駅徒歩約6分・子連れ設備充実で、
                  <br className="md:hidden" />
                  ママ会・女子会・撮影の"ちょうどいい"
                  <br className="md:hidden" />
                  時間をお届けします。
                </p>

                {/* 新しい可愛いボタンデザイン */}
                <div className="text-center lg:text-left mt-8">
                  <div className="flex sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center flex-col my-[-35px] mt-[-61px]">
                    {/* 創業者の想い・背景を見るボタン */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-full sm:w-auto"
                    >
                      <Link href="#reviews" className="group block">
                        <div className="relative bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 border-2 border-orange-200 hover:border-orange-300 rounded-3xl px-6 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] sm:min-w-[240px]">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="bg-orange-200 group-hover:bg-orange-300 rounded-full p-2 transition-colors duration-300">
                              <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600" />
                            </div>
                            <span className="text-orange-700 font-semibold text-sm sm:text-base group-hover:text-orange-800 transition-colors duration-300">
                              創業者の想い・背景を見る
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-[-73px]"></div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* 今すぐ予約するボタン */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-full sm:w-auto"
                    >
                      <Link
                        href={nagoyaStore.detailsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="relative bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-3xl px-6 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[180px] sm:min-w-[200px]">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="bg-white/20 group-hover:bg-white/30 rounded-full p-2 transition-colors duration-300">
                              <CalendarCheck className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-base group-hover:text-green-50 transition-colors duration-300">
                              今すぐ予約する
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* キラキラ効果 */}
                          <div className="absolute top-2 right-3 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                          <div className="absolute bottom-3 left-4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300"></div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="py-20 md:py-24 bg-white overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
                当スペースの特徴
              </h2>
            </div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="gallery">写真ギャラリー</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-12">
                <div className="text-center mb-12">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
                    名古屋・矢場町の
                    <br className="md:hidden" />
                    レンタルスペースでママ会を
                    <br className="md:hidden" />
                    安心して楽しめる理由
                    <br className="md:hidden" />
                    （女子会・誕生日・撮影にも）
                    <br className="md:hidden" />
                    <br className="md:hidden" />
                  </h3>
                </div>

                <div className="space-y-20">
                  {/* Feature 01 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-custom-beige-border grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
                      <div className="md:col-span-7 md:order-1">
                        <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
                          <span className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-5">
                            01
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading text-center">
                            泣いてもOK、周りに気をつかわない"完全個室"
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          1フロア1室のプライベート空間。
                          <br className="md:hidden" />
                          矢場町駅から徒歩約6分、 <br className="md:hidden" />
                          29㎡・最大18名で、4〜10名のママ会に
                          <br className="md:hidden" />
                          ちょうどいいサイズ。 <br className="md:hidden" />
                          赤ちゃんがぐずっても気兼ねなく過ごせます。
                        </p>
                      </div>
                      <div className="md:col-span-5 md:order-2">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/features/moms-gathering-space-2.webp"
                            alt="完全個室のプライベート空間"
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Feature 02 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-custom-beige-border grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
                      <div className="md:col-span-7 md:order-2">
                        <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
                          <span className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-5">
                            02
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading text-center">
                            "くま映え"×自然光で、とびきり可愛い写真に
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          大きなクマ🧸と明るい内装でSNS映え。撮影用バースデー帽子もご用意。名古屋・矢場町のレンタルスペースで、集合写真やバースデーフォトがきれいに残せます—**女子会・誕生日・撮影にも◎**。
                        </p>
                      </div>
                      <div className="md:col-span-5 md:order-1">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/features/tableware.webp"
                            alt="くま映えする可愛い空間"
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Feature 03 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-custom-beige-border grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
                      <div className="md:col-span-7 md:order-1">
                        <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
                          <span className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-5">
                            03
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading text-center">
                            子連れ安心の装備が最初からそろう
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          クッションフロア／ベビーサークル／おもちゃ多数／バンボ×2／バウンサーなど、月齢に合わせて使えるベビーグッズを完備。ベビーカー置き場あり（※室内ではなく廊下に駐輪）。
                        </p>
                      </div>
                      <div className="md:col-span-5 md:order-2">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/features/child-rocking-horse.webp"
                            alt="充実したベビーグッズ"
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Feature 04 */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-custom-beige-border grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
                      <div className="md:col-span-7 md:order-1">
                        <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
                          <span className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-5">
                            04
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading text-center">
                            手ぶらで楽しめて片付けもラク（キッチン＆プロジェクター）
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          冷蔵庫・電子レンジ・電気ケトル・IH・鍋セット・たこ焼き器・ホットプレート、人数分の食器も完備。Wi-Fi（光）＆プロジェクター・HDMIで映画鑑賞・スポーツ観戦・推し活・YouTube収録も快適。**飲食・飲酒可**、建物内ゴミ捨てOK（有料・分別必須）。料金は**早朝¥425〜／通常¥1,472〜**（日程により最大¥5,890/時）、**お得意様割15%**も利用可。
                        </p>
                      </div>
                      <div className="md:col-span-5 md:order-2">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/features/spacious-37m2-room.webp"
                            alt="充実したキッチン設備"
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="gallery" className="mt-12">
                {/* Gallery Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuresGalleryImages.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          id="reviews"
          className="py-20 md:py-24 bg-white overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
                当_spacesのレビュー
              </h2>
            </div>
            <ReviewsCarousel reviews={nagoyaStore.reviews.featured} />
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          id="faq"
          className="py-20 md:py-24 bg-white overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">FAQ</h2>
            </div>
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* Specs Section */}
        <motion.section
          id="specs"
          className="py-20 md:py-24 bg-white overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">スペック</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-custom-beige-border"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 font-heading">
                    {spec.label}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  )
}
