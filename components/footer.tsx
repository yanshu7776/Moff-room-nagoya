"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Instagram } from "lucide-react"
import { useState } from "react"
import ContactFormModal from "@/components/contact-form-modal"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <footer className="bg-custom-beige-accent text-gray-800 py-12 md:py-16 pb-24 md:pb-28 border-t border-custom-beige-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* ロゴとお問い合わせセクション */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/moff-room-logo-transparent.png"
                alt="Moff Room Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Moff room 名古屋店は、ママと子どもが安心して楽しめる完全個室のレンタルスペースです。
            </p>
            <Button
              onClick={() => setModalOpen(true)}
              variant="outline"
              className="w-full sm:w-auto border-custom-beige-border text-gray-800 hover:bg-gray-800 hover:text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              お問い合わせ
            </Button>
          </div>

          {/* リンクセクション */}
          <div>
            <h3 className="font-bold text-lg mb-4">リンク</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="hover:text-gray-600 transition-colors">
                  特徴
                </Link>
              </li>
              <li>
                <Link href="/#access" className="hover:text-gray-600 transition-colors">
                  アクセス
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-gray-600 transition-colors">
                  お客様の声
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-gray-600 transition-colors">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>

          {/* 法的情報セクション */}
          <div>
            <h3 className="font-bold text-lg mb-4">法的情報</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms-of-sale" className="hover:text-gray-600 transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.instagram.com/moff_room/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-custom-beige-border text-center text-sm">
          <p className="text-gray-700 mt-[-48px]">&copy; {new Date().getFullYear()} Moff room. All Rights Reserved.</p>
        </div>
      </div>
      <ContactFormModal open={modalOpen} onOpenChange={setModalOpen} />
    </footer>
  )
}
