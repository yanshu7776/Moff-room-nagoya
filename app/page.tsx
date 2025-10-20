"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import SiteHeader from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Star,
  ExternalLink,
  Lock,
  Train,
  Users,
  Baby,
  UtensilsCrossed,
  Trash2,
  CircleDollarSign,
  CalendarCheck,
  CreditCard,
  BookOpen,
  ShieldCheck,
  PencilLine,
  CheckCircle2,
  HelpCircle,
  CalendarDays,
  MapPin,
  Clock,
  Navigation,
  Globe,
  ArrowDown,
  ShoppingBag,
  Building2,
} from "lucide-react"
import ImageCarousel from "@/components/image-carousel"
import { featuresGalleryImages, type GalleryImage } from "@/lib/features-gallery-images"
import ReviewsCarousel from "@/components/reviews-carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SiteFooter from "@/components/footer"
import GoogleCalendarEmbed from "@/components/google-calendar-embed"
import FloatingCTA from "@/components/floating-cta"
import ContactFormModal from "@/components/contact-form-modal"
import Planner5DEmbed from "@/components/planner-5d-embed"

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
  region: "kanto" | "kansai" | string
}

export type StoreWithReviews = Store & {
  reviews: {
    averageRating: string
    totalReviews: number
    featured: Review[]
  }
}

// Data for Akihabara Store
const akihabaraStore: StoreWithReviews = {
  id: "akihabara",
  name: "秋葉原店",
  description:
    "秋葉原、御徒町、上野、浅草橋など主要駅から徒歩圏内。明るいヘリンボーン床と充実おもちゃで親子で楽しめる温かい空間です。",
  imageSrc: "/images/hero-background.webp",
  detailsLink: "https://www.spacemarket.com/spaces/moffroom_nagoya/?room_uid=NC1sqTIzP-bV8bQ5",
  accentColorClass: "rgb(202,229,206)",
  location: "東京都台東区",
  fullAddress: "東京都台東区台東2-18-9 ２階",
  region: "kanto",
  reviews: {
    averageRating: "4.7",
    totalReviews: 76,
    featured: [
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
          "この度はありがとうございました。 やりとりの段階からとてもスムーズで安心できました。お部屋も広く綺麗で、おもちゃや備品も色々ありとても助かりました。 また機会がありましたたらよろしくお願いします。",
        age: "30代・女性",
        purpose: "おしゃべり会",
        rating: 5,
      },
      {
        title: "赤ちゃん連れでも安心して利用できる配慮が◎",
        comment:
          "掲載の通り、赤ちゃん連れでも安心して利用できる配慮がなされていて、とても良かったです。 テーブルの角にクッション材がついていたり、備品のなかに、子供服を無料で1枚、というサービスもあり、子供が服を汚してしまったりした時、とても有り難いと思いました。 近くに小さいですが食品スーパーがあり、途中の買い出しにも都合良かったです。 是非また利用したいです。",
        age: "30代・ファミリー",
        purpose: "ホームパーティー",
        rating: 5,
      },
      {
        title: "女子会や子連れのパーティーに最適",
        comment:
          "駅から迷わずいけました。複数駅・複数路線が使えるので、参加者の居住地がバラバラでも集まりやすい。新御徒町駅を使いましたが、道もわかりやすかったです。 ワンフロアワンルームのようで、エレベーターは1機ですが混み合うことはなさそうです。お部屋は2階なので階段も使えます。 ローテーブル、ハイテーブルがあり大人数でのパーティがしやすかったです。 オーナーさんは、レスポンスも早く、対応も丁寧で助かりました。 予約前の問い合わせの段階から安心ができるご対応をしていただけました。",
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

const benefits = [
  { icon: Lock, text: "1フロア1室貸切の完全プライベート空間" },
  { icon: Train, text: "8路線が徒歩圏内！駅近＆アクセス良好" },
  { icon: Users, text: "約37㎡(24畳)の広々快適スペース" },
  { icon: Baby, text: "子連れ歓迎！豊富なベビーグッズ＆おもちゃ" },
  { icon: UtensilsCrossed, text: "飲食＆調理OK！キッチン完備" },
  { icon: Trash2, text: "後片付けも楽々！清掃おまかせオプション有" },
  { icon: CircleDollarSign, text: "1時間550円～の良心的な価格設定" },
  { icon: CalendarCheck, text: "面倒な手続きなし！即時予約に対応" },
  { icon: CreditCard, text: "多彩な支払い方法 (Amazon Pay, PayPay等)" },
  { icon: Star, text: "平均評価★4.7/5.0！高評価＆リピーター続出" },
  { icon: BookOpen, text: "Amazonランキング1位の書籍で紹介" },
  { icon: ShieldCheck, text: "万全の安全・サポート体制" },
]

const faqs = [
  {
    q: "人気の利用用途はなんですか？",
    a: "一番多いのはママ会でのご利用です。そのほか、おしゃべり会（女子会）やホームパーティー、推し活の集まりなど幅広く利用されています。",
  },
  {
    q: "何人で利用されやすいですか？",
    a: "最もよく利用される人数帯は5〜10名です。次いで11〜15名程度のグループや、1〜2名での少人数利用も見られます。",
  },
  {
    q: "何日前までに予約すればいいですか？",
    a: "最短ではご利用直前まで予約可能です！（空きがあれば当日予約OKです。）日程がお決まりでしたら、お早めにご予約いただくことをおすすめします。",
  },
  {
    q: "どれくらいの広さですか？",
    a: "広さは約37㎡（24畳程度）です。大きめのリビングルームほどの空間をイメージしてください。",
  },
  {
    q: "子どもの服が汚れてしまったらどうすればいいですか？",
    a: "スペース内に50〜95cmサイズの子供用古着をご用意しており、1着まで無料でお持ち帰りいただけます。急な着替えが必要になっても安心です。",
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
  { label: "広さ", value: "約37㎡（最大25名様まで収容可能）" },
  { label: "キッチン設備", value: "IHコンロ、冷蔵庫、電子レンジ、電気ケトル、調理器具、食器類" },
  {
    label: "エンタメ設備",
    value: "120インチ大型スクリーン、プロジェクター、Blu-ray/DVDプレーヤー、Amazon Fire TV Stick",
  },
  { label: "音響設備", value: "Bluetooth対応スピーカー" },
  { label: "ベビー用品", value: "バンボ、バウンサー、授乳クッション、ベビーサークル、おもちゃ各種" },
  { label: "家具", value: "ローテーブル、ソファ、クッション、子供用椅子" },
  { label: "その他", value: "エアコン、エレベーター、室内トイレ、ゴミ捨て可（有料オプション）" },
]

export default function AkihabaraPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const problems = [
    {
      src: "/images/problems/problem-work-while-watching-kids.png",
      alt: "子どもを遊ばせながら仕事や勉強もできたら良いのにという悩み",
    },
    {
      src: "/images/problems/problem-rainy-stroller.png",
      alt: "雨の日にベビーカーを押しながら傘をさすのは大変だという悩み",
    },
    {
      src: "/images/problems/problem-child-anxiety-new-place.png",
      alt: "初めての場所で子どもが泣いたり騒いだりしないか不安という悩み",
    },
    {
      src: "/images/problems/problem-cafe-vs-playground-new.png",
      alt: "カフェだと子どもは退屈、遊び場だとママは休めないという悩み",
    },
    {
      src: "/images/problems/problem-with-luggage.png",
      alt: "子連れだと荷物が多くてどこへ行くにも大移動という悩み",
    },
  ]

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
                <Link href={akihabaraStore.detailsLink} target="_blank" rel="noopener noreferrer">
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
                    sizes="(max-width: 640px) 280px, 320px"
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-heading">
                  私たちの想い
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                  実は、私たち自身も子育て中に同じ悩みを抱えていました。カフェはママが楽しくても子どもは退屈、遊び場は子どもが楽しくてもママは話しづらい——。
                </p>
                <div className="my-4 p-4 bg-white border-l-4 border-pink-500 rounded-r-lg shadow-md">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 leading-snug">
                    「ママも子どもも、どっちも主役になれる場所を。」
                  </p>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                  その想いから、秋葉原店に続き、名古屋・矢場町の完全個室レンタルスペース「Moff room
                  名古屋」をオープン。駅徒歩約6分・子連れ設備充実で、ママ会・女子会・撮影の"ちょうどいい"時間をお届けします。
                </p>

                {/* 新しい可愛いボタンデザイン */}
                <div className="text-center lg:text-left mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center">
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
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                        href={akihabaraStore.detailsLink}
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
                    名古屋・矢場町のレンタルスペースで
                    <span className="text-pink-500">ママ会</span>
                    を安心して楽しめる理由
                    <br />
                    <span className="text-base sm:text-lg text-gray-600">（女子会・誕生日・撮影にも）</span>
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
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading">
                            泣いてもOK、周りに気を
つかわない"完全個室"
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          1フロア1室のプライベート空間。矢場町駅から徒歩約6分、
29㎡・最大18名で、4〜10名のママ会にちょうどいいサイズ。
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
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading">
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
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading">
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
                      <div className="md:col-span-7 md:order-2">
                        <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
                          <span className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-pink-500 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-5">
                            04
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 font-heading">
                            手ぶらで楽しめて片付けもラク（キッチン＆プロジェクター）
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          冷蔵庫・電子レンジ・電気ケトル・IH・鍋セット・たこ焼き器・ホットプレート、人数分の食器も完備。Wi-Fi（光）＆プロジェクター・HDMIで映画鑑賞・スポーツ観戦・推し活・YouTube収録も快適。**飲食・飲酒可**、建物内ゴミ捨てOK（有料・分別必須）。料金は**早朝¥425〜／通常¥1,472〜**（日程により最大¥5,890/時）、**お得意様割15%**も利用可。
                        </p>
                      </div>
                      <div className="md:col-span-5 md:order-1">
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

                <div className="mt-16 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 sm:p-8">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">— 安心のご案内 —</h4>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                      <span className="text-yellow-600 mr-3 flex-shrink-0">•</span>
                      <p className="text-sm sm:text-base">
                        エレベーターはありますが、ご利用前に<strong>10段ほど階段</strong>があります。
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-yellow-600 mr-3 flex-shrink-0">•</span>
                      <p className="text-sm sm:text-base">
                        <strong>ベビーカーは廊下に駐輪</strong>してください。
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="gallery" className="mt-12">
                <Dialog onOpenChange={(open) => !open && setSelectedImage(null)}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {featuresGalleryImages.map((image, index) => (
                      <DialogTrigger key={index} asChild onClick={() => setSelectedImage(image)}>
                        <div className="group cursor-pointer text-center">
                          <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.description}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={image.src}
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                          <p className="mt-3 text-xs sm:text-sm font-medium text-gray-800">{image.description}</p>
                        </div>
                      </DialogTrigger>
                    ))}
                  </div>
                  {selectedImage && (
                    <DialogContent className="max-w-4xl p-4">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={selectedImage.src || "/placeholder.svg"}
                          alt={selectedImage.description}
                          fill
                          className="object-contain rounded-md"
                          sizes="100vw"
                        />
                      </div>
                      <p className="pt-2 text-center text-base sm:text-lg font-medium text-gray-900">
                        {selectedImage.description}
                      </p>
                    </DialogContent>
                  )}
                </Dialog>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        {/* Studio Specs Section */}
        <motion.section
          id="specs"
          className="py-20 md:py-24 bg-custom-beige-accent w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
                スタジオ設備スペック
              </h2>
            </div>
            <div className="max-w-2xl mx-auto mb-12">
              <Image
                src="/images/floor-plan.webp"
                alt="Moff Roomフロアマップ"
                width={800}
                height={450}
                className="rounded-lg shadow-md w-full h-auto"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/floor-plan.webp"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <p className="text-center mt-4 text-sm sm:text-base text-gray-600">
                Moff
                roomのフロアマップです。広々とした空間と充実した設備をご確認いただけます。エレベーターでベビーカーごと入室でき、室内にはキッチン、トイレも完備しています。
              </p>
            </div>

            <Planner5DEmbed />

            <div className="border border-custom-beige-border rounded-lg overflow-hidden shadow-sm">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="py-4 px-4 sm:px-6 font-semibold text-gray-700 col-span-1 border-b sm:border-b-0 sm:border-r border-custom-beige-border">
                    {spec.label}
                  </div>
                  <div className="py-4 px-4 sm:px-6 text-gray-600 col-span-1 sm:col-span-2 md:col-span-3 text-sm sm:text-base">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-16 md:py-24 bg-white relative overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-100/20 blur-3xl rounded-full -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-yellow-100/20 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-6">
                  <span className="pb-2 border-b-4 border-blue-800">人気ぶりと早期予約のお願い</span>
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                  <p>
                    おかげさまでSNSでも話題となり、
                    <strong>「予約が取れないママ会スペース」</strong>
                    と言われるほどの人気ぶりです✨ 2023年12月には
                    <strong>50組以上</strong>のご利用をいただきました。
                  </p>
                  <p>
                    特に週末はすぐ予約で埋まってしまいますので、「この日みんなで集まりたい！」という日時がお決まりでしたらぜひ
                    <Link
                      href={akihabaraStore.detailsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 font-bold hover:underline"
                    >
                      お早めのご予約
                    </Link>
                    をおすすめします。
                  </p>
                  <p>
                    ホームページから予約で15%OFFや、Instagramでお得なキャンペーンも実施中ですので、この機会にぜひご利用ください！
                  </p>
                  <p className="font-semibold">
                    悩めるママたちにとって、本当にホッとできる場所がここにあります。あなたもぜひ一度体験してみませんか？
                  </p>
                  <div className="pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg"
                    >
                      <Link href={akihabaraStore.detailsLink} target="_blank" rel="noopener noreferrer">
                        下の「今すぐ予約する」ボタンから、理想のママ会を実現しましょう✨
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center items-center">
                <Image
                  src="/images/design-mode/S__48193562_0_0718052808.png"
                  alt="お辞儀するクマのイラスト"
                  width={256}
                  height={256}
                  className="object-contain rounded-full border-4 border-[rgb(202,229,206)] w-full max-w-[200px] sm:max-w-[256px] h-auto aspect-square"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  sizes="(max-width: 640px) 200px, 256px"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits & USP Section */}
        <motion.section
          className="py-16 md:py-20 bg-white w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container px-4">
            <h2 className="section-title">Moff room秋葉原店が選ばれる理由</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm flex items-center"
                >
                  <benefit.icon className="w-5 sm:w-6 h-5 sm:h-6 mr-3 text-custom-beige-DEFAULT flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-6 px-4">
              ※なお、スペース利用時は
              <strong>完全禁煙・近隣迷惑NG</strong>
              など利用規約順守をお願いしております。安心・安全にお楽しみいただくためにご協力ください。
            </p>
          </div>
        </motion.section>

        {/* Reviews & Founder Section */}
        <motion.section
          id="reviews"
          className="py-16 md:py-24 bg-white w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <ReviewsCarousel
              reviews={akihabaraStore.reviews.featured}
              googleRating={akihabaraStore.reviews.averageRating}
              googleReviewsCount={akihabaraStore.reviews.totalReviews}
            />
          </div>
          <div className="container max-w-7xl mx-auto mt-24 px-4">
            <div className="bg-custom-beige-accent border border-gray-200 p-6 md:p-8 rounded-xl shadow-xl mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-custom-beige-unified mb-4 font-heading text-center">
                創業者の想い・背景
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-3/4">
                  <p className="mb-4 text-sm sm:text-base">
                    初めまして、Moff room秋葉原店 代表の
                    <strong>山口 有紀</strong>
                    と申します。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    私は普通の30代主婦でしたが、自身の育児経験から「ママと子どもが心から楽しめる居場所が欲しい！」と強く感じました。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    その想いから、このレンタルスペースをママ友と一緒に立ち上げました。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    オープンまでには様々な試行錯誤がありました。その体験は『
                    <strong>普通の30代主婦がママ友とレンタルスペース作ってみた</strong>
                    』という電子書籍にまとめています。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    幸いにもAmazonでビジネス書ランキング1位を獲得することができました。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    このスペースには、私たち自身の「こんな場所があったらいいな」という願いがたくさん詰まっています。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    ご利用くださるママさんとお子さんの笑顔を見るたびに、この仕事をやって良かったと心から思います。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    これからも
                    <strong>「ママと子どもの笑顔をもっと増やしたい」</strong>
                    という想いを胸に、安全で楽しい空間づくりに励んでまいります。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    Moff room秋葉原店が、皆様のかけがえのない思い出の舞台となりますように。
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    心を込めて運営していますので、どうぞ安心してご利用ください💕
                  </p>
                </div>
                <div className="md:w-1/4 text-center flex items-center justify-center">
                  <Image
                    src="/images/founder-story.png"
                    alt="ジュースを飲む子供たち"
                    width={280}
                    height={280}
                    className="mx-auto rounded-full object-cover aspect-square w-full max-w-[200px] sm:max-w-[280px] h-auto"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/images/founder-story.png"
                    sizes="(max-width: 640px) 200px, 280px"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-custom-beige-unified mb-4 font-heading text-center">
                スタッフ紹介
              </h3>
              <Card className="p-6 bg-white border border-custom-beige-border shadow-lg">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Image
                    src="/images/staff-profile.png"
                    alt="山口 有紀"
                    width={160}
                    height={160}
                    className="rounded-full object-cover aspect-square w-full max-w-[120px] sm:max-w-[160px] h-auto"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/images/staff-profile.png"
                    sizes="(max-width: 640px) 120px, 160px"
                  />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">山口 有紀（Moff room代表）</h4>
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm sm:text-base">
                        おしゃれなカフェ巡りと家具屋巡りが趣味の<strong className="text-pink-600">30代ママ</strong>。
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        自身の悩みから<strong>「自分たちが本当に行きたい場所を作ろう！」</strong>
                        と決意し、ママ友と当スペースを創業しました。
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        <span className="bg-yellow-100 px-2 py-1 rounded">
                          育児中の「欲しい！」を形にした空間づくり
                        </span>
                        がモットー。
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        著書『<strong>普通の30代主婦がママ友とレンタルスペース作ってみた</strong>
                        』では開業までのエピソードを綴っています。
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        <strong className="text-pink-500">「ママも子どもも笑顔になれる場を増やしたい」</strong>
                        という想いで日々奮闘中です。
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        <strong className="text-pink-500">「ママも子どもも笑顔になれる場を増やしたい」</strong>
                        という想いで日々奮闘中です。
                      </p>
                      <div className="mt-4 pt-3 border-t border-custom-beige-border">
                        <Link
                          href="https://www.instagram.com/moff_room/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Instagramで最新情報を発信中♪
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Access and Surroundings Section */}
        <motion.section
          id="access"
          className="py-16 md:py-20 bg-custom-beige-accent w-full overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <Image
                src="/images/heading-access-final.png"
                alt="アクセス"
                width={400}
                height={100}
                className="mx-auto mb-8 w-full max-w-[300px] sm:max-w-[400px] h-auto"
                priority
                sizes="(max-width: 640px) 300px, 400px"
              />
              <p className="text-base sm:text-lg text-gray-600 mb-12">新御徒町駅徒歩5分の好立地！</p>
              <Image
                src="/images/access-map-v3-final.png"
                alt="Moff Room周辺のアクセスマップ"
                width={900}
                height={600}
                className="rounded-2xl mx-auto shadow-xl w-full max-w-[900px] h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>

            <div className="text-center mb-16">
              <div className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed space-y-4">
                <p>新御徒町駅から徒歩5分、JR御徒町駅や秋葉原駅からも徒歩圏内とアクセスは抜群です。</p>
                <p>駅前から続く佐竹商店街のアーケードを通れば、雨の日もほとんど傘を差さずに来られます。</p>
                <p>
                  周辺には商店街のほかコンビニ・スーパー・ドラッグストア・ピザ屋さん🍕もあり、集まりの途中での買い出しにも便利です。
                </p>
                <p>建物にはエレベーターがあり、ベビーカーでもそのまま2階のスペースまで上がれます。</p>
              </div>
            </div>

            {/* アクセス情報カード */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* 交通手段 */}
              <div className="bg-white border border-custom-beige-border rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Train className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">交通手段</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      都営大江戸線・つくばエクスプレス「新御徒町駅」から徒歩5分
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      JR山手線・京浜東北線「御徒町駅」から徒歩8分
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      JR山手線・京浜東北線「秋葉原駅」から徒歩10分
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      JR山手線・京浜東北線「上野駅」から徒歩12分
                    </span>
                  </div>
                </div>
              </div>

              {/* 営業時間 */}
              <div className="bg-white border border-custom-beige-border rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">営業時間</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">7:00 ~ 24:00</div>
                    <div className="text-gray-600">年中無休</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 mt-4">
                    <p className="text-xs sm:text-sm text-green-700 text-center">
                      深夜・早朝のご利用も可能です！
                      <br />
                      ママ会だけでなく、お仕事での利用もお気軽にどうぞ。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 主要駅からのアクセス */}
            <div className="bg-white border border-custom-beige-border rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-8">主要駅からのアクセス</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">5分</span>
                  </div>
                  <h4 className="font-bold text-blue-600 mb-2 text-sm sm:text-base">新御徒町駅</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    徒歩5分
                    <br />
                    （最寄り駅・アクセス抜群）
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-green-600">8分</span>
                  </div>
                  <h4 className="font-bold text-green-600 mb-2 text-sm sm:text-base">御徒町駅</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    徒歩8分
                    <br />
                    （JR利用者におすすめ）
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-orange-600">10分</span>
                  </div>
                  <h4 className="font-bold text-orange-600 mb-2 text-sm sm:text-base">秋葉原駅</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    徒歩10分
                    <br />
                    （複数路線利用可能）
                  </p>
                </div>
              </div>
            </div>

            {/* 道案内のポイント - Mobile */}
            <div className="md:hidden">
              <div className="bg-white border border-custom-beige-border rounded-3xl p-6 shadow-xl">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
                    <Navigation className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">道案内のポイント</h3>
                  <p className="text-gray-600 text-sm">迷わずお越しいただけるよう、詳しい道順をご案内します</p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-blue-200"></div>

                  {/* Step 1 */}
                  <div className="relative mb-8">
                    <div className="absolute -left-10 top-0 w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg">
                      1
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">新御徒町駅A2出口を出て西へ進む</h4>
                    <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
                      <div className="flex items-center">
                        <Baby className="w-4 h-4 mr-2 flex-shrink-0" />
                        <p>ベビーカーご利用の方はA3出口のエレベーターをご利用ください。</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative mb-8">
                    <div className="absolute -left-10 top-0 w-9 h-9 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg">
                      2
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">佐竹商店街のアーケードを通って直進</h4>
                    <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700">
                      <div className="flex items-center">
                        <ShoppingBag className="w-4 h-4 mr-2 flex-shrink-0" />
                        <p>アーケードがあるので、雨の日もほとんど濡れずにお越しいただけます。</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative mb-8 last:mb-0">
                    <div className="absolute -left-10 top-0 w-9 h-9 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg">
                      3
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">長島エレガンス第五ビルの２階</h4>
                    <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <p>エレベーター完備のビルです。ベビーカーでそのまま2階まで上がれます。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 道案内のポイント - Desktop */}
            <div className="hidden md:block bg-white border border-custom-beige-border rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg">
                  <Navigation className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">道案内のポイント</h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  迷わずお越しいただけるよう、詳しい道順をご案内いたします
                </p>
              </div>

              <div className="grid gap-6 sm:gap-8 max-w-4xl mx-auto">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex items-start bg-gray-50 border border-custom-beige-border rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                    <div className="flex-shrink-0 mr-4 sm:mr-6">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl sm:text-2xl font-bold text-white">1</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                        新御徒町駅A2出口を出て西へ進む
                      </h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center text-blue-700">
                          <Baby className="w-4 sm:w-5 h-4 sm:w-5 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">ベビーカーご利用の方へ</span>
                        </div>
                        <p className="text-blue-600 mt-2 text-sm sm:text-base">
                          A3出口にエレベーターがございますので、そちらをご利用ください
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="flex items-start bg-gray-50 border border-custom-beige-border rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                    <div className="flex-shrink-0 mr-4 sm:mr-6">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl sm:text-2xl font-bold text-white">2</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                        佐竹商店街のアーケードを通って直進
                      </h4>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center text-green-700">
                          <ShoppingBag className="w-4 sm:w-5 h-4 sm:w-5 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">雨の日も安心</span>
                        </div>
                        <p className="text-green-600 mt-2 text-sm sm:text-base">
                          アーケードがあるので、雨の日もほとんど濡れずにお越しいただけます
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex items-start bg-gray-50 border border-custom-beige-border rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                    <div className="flex-shrink-0 mr-4 sm:mr-6">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl sm:text-2xl font-bold text-white">3</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">長島エレガンス第五ビルの２階</h4>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center text-purple-700">
                          <Building2 className="w-4 sm:w-5 h-4 sm:w-5 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">建物の特徴</span>
                        </div>
                        <p className="text-purple-600 mt-2 text-sm sm:text-base">
                          エレベーター完備の2階建てビル。ベビーカーでそのまま2階まで上がれます
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="mt-12 text-center">
                <div className="bg-yellow-50 rounded-2xl p-6 sm:p-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">詳しい場所はこちら</h4>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    正確な位置と周辺情報をGoogleマップでご確認いただけます
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="inline-block w-full sm:w-auto"
                  >
                    <Link
                      href="https://www.google.com/maps/search/?api=1&query=東京都台東区台東2-18-9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <MapPin className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                      Googleマップで見る
                      <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 ml-3" />
                    </Link>
                  </motion.div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-4">住所：東京都台東区台東2-18-9 ２階</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Booking Flow Section */}
        <motion.section
          id="booking-flow"
          className="py-16 md:py-20 bg-white w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-4xl mx-auto text-center px-4">
            <Image
              src="/images/heading-booking-flow.png"
              alt="ご予約から当日利用までの流れ"
              width={400}
              height={150}
              className="mx-auto mb-12 w-full max-w-[300px] sm:max-w-[400px] h-auto"
            />
            {/* Mobile Booking Flow */}
            <div className="md:hidden space-y-4 max-w-sm mx-auto">
              <div className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-500 rounded-full mb-4">
                  <CalendarDays className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">STEP 1</h3>
                <p className="text-pink-600 font-semibold text-xl">日時を選ぶ</p>
                <p className="text-gray-600 text-sm mt-2 text-center">カレンダーからご希望の日時を選択してください。</p>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-500 rounded-full mb-4">
                  <PencilLine className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">STEP 2</h3>
                <p className="text-pink-600 font-semibold text-xl">必要事項を入力</p>
                <p className="text-gray-600 text-sm mt-2 text-center">
                  人数やお支払い方法など、必要な情報を入力します。
                </p>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-500 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">STEP 3</h3>
                <p className="text-pink-600 font-semibold text-xl">予約を確定</p>
                <p className="text-gray-600 text-sm mt-2 text-center">
                  内容を確認し予約を確定！入室方法をメールでお知らせします。
                </p>
              </div>
            </div>

            {/* Desktop Booking Flow */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-pink-500 text-white rounded-full mb-4">
                  <CalendarDays className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">STEP 1</h3>
                <p className="text-gray-700 text-sm sm:text-base">日時を選ぶ</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-pink-500 text-white rounded-full mb-4">
                  <PencilLine className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">STEP 2</h3>
                <p className="text-gray-700 text-sm sm:text-base">必要事項を入力</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-pink-500 text-white rounded-full mb-4">
                  <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">STEP 3</h3>
                <p className="text-gray-700 text-sm sm:text-base">予約を確定</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              クレジットカード、Amazon Pay, PayPay, コンビニ払い、銀行振込など多彩な支払い方法に対応。
            </p>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              予約確定後、メールで入室方法をご案内します。当日はメールに従ってご入室ください。
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block w-full sm:w-auto"
            >
              <Link
                href={akihabaraStore.detailsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl overflow-hidden transition-all duration-500 ease-in-out hover:shadow-pink-500/50 w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/30 to-white/10 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <CalendarCheck className="w-5 sm:w-6 h-5 sm:h-6 mr-3 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                <span className="relative">今すぐ空き状況を確認する</span>
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-gray-500">
              <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-600" />
              安全な決済システムを利用しています。ご予約は最短3分で完了します。
            </p>
          </div>
        </motion.section>

        {/* Booking Calendar Section */}
        <motion.section
          id="booking-calendar"
          className="py-16 md:py-20 bg-white w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <GoogleCalendarEmbed storeDetailsLink={akihabaraStore.detailsLink} />
        </motion.section>

        {/* Notice / FAQ Section */}
        <motion.section
          id="faq"
          className="py-16 md:py-20 bg-custom-beige-accent w-full overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <Image
                src="/images/heading-notice.png"
                alt="お知らせ"
                width={400}
                height={150}
                className="mx-auto w-full max-w-[300px] sm:max-w-[400px] h-auto"
              />
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-custom-beige-border rounded-lg shadow-sm border-b-0"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 px-4 sm:px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <HelpCircle className="w-5 sm:w-6 h-5 sm:h-6 text-pink-500 mr-3 sm:mr-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{faq.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button variant="link" onClick={() => setModalOpen(true)} className="text-pink-500 hover:underline">
                その他のご質問はこちら
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Portal Site Section */}
        <motion.section
          className="py-20 md:py-24 bg-white relative overflow-hidden w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container px-4">
            <div className="bg-custom-beige-accent border border-custom-beige-border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="relative w-full h-64 lg:h-full min-h-[300px]">
                {/* レスポンシブ画像の実装 */}
                <div className="block lg:hidden">
                  <Image
                    src="/images/design-mode/%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E7%89%88%E3%80%805%E3%81%A4%E3%81%AE%E5%BA%97%E8%88%97%E3%81%AE%E5%86%99%E7%9C%9F.jpg.jpeg"
                    alt="関東・関西に広がるMoff roomの店舗（モバイル版）"
                    fill
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    sizes="100vw"
                  />
                </div>
                <div className="hidden lg:block">
                  <Image
                    src="/images/design-mode/WEB%E7%89%88%E3%80%805%E3%81%A4%E3%81%AE%E5%BA%97%E8%88%97%E3%81%AE%E5%86%99%E7%9C%9F.jpg.jpeg"
                    alt="関東・関西に広がるMoff roomの店舗（WEB版）"
                    fill
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    sizes="50vw"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8 md:p-12 lg:p-16 text-center lg:text-left">
                <Image
                  src="/images/moff-room-logo-color.png"
                  alt="Moff Room ロゴ"
                  width={150}
                  height={75}
                  className="mx-auto lg:mx-0 mb-6 object-contain h-auto w-full max-w-[120px] sm:max-w-[150px]"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading">
                  あなたの街の
                  <br />
                  Moff roomを見つけよう
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
                  Moff
                  roomは秋葉原店のほかにも、関東・関西エリアに複数の店舗を展開中！お近くの店舗の空き状況の確認やご予約は、総合HPからどうぞ。
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block w-full sm:w-auto"
                >
                  <Link
                    href="https://moffroom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <Globe className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                    <span>Moff Room 総合サイトへ</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
      <ContactFormModal open={modalOpen} onOpenChange={setModalOpen} />
      <FloatingCTA onInquiryClick={() => setModalOpen(true)} />
    </div>
  )
}
