"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Send } from "lucide-react"

interface ContactFormModalProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ContactFormModal({ children, open, onOpenChange }: ContactFormModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const actualOpen = open !== undefined ? open : isOpen
  const actualOnOpenChange = onOpenChange || setIsOpen

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      const response = await fetch("https://formspree.io/f/mkgqjjln", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form after successful submission
        ;(e.target as HTMLFormElement).reset()
        // Close modal after 2 seconds
        setTimeout(() => {
          actualOnOpenChange(false)
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={actualOpen} onOpenChange={actualOnOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto font-jkg">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold text-center text-gray-900 pr-8">お問い合わせフォーム</DialogTitle>
          <button
            onClick={() => actualOnOpenChange(false)}
            className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-lg font-semibold mb-2">お問い合わせありがとうございます！</div>
            <p className="text-gray-600">内容を確認次第、ご連絡させていただきます。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  お名前（姓）<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="山田"
                  required
                  className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  お名前（名）<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="太郎"
                  required
                  className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                メールアドレス<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                電話番号
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="090-1234-5678"
                className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store" className="text-sm font-medium text-gray-700">
                ご希望の店舗
              </Label>
              <Select name="store" defaultValue="nagoya">
                <SelectTrigger className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT">
                  <SelectValue placeholder="店舗を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nagoya">名古屋店</SelectItem>
                  <SelectItem value="akihabara">秋葉原店</SelectItem>
                  <SelectItem value="ikebukuro">池袋店</SelectItem>
                  <SelectItem value="shimokitazawa">下北沢店</SelectItem>
                  <SelectItem value="tenjinbashi">天神橋筋六丁目店</SelectItem>
                  <SelectItem value="sannomiya">三宮店</SelectItem>
                  <SelectItem value="other">その他・未定</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiryType" className="text-sm font-medium text-gray-700">
                お問い合わせ種別<span className="text-red-500">*</span>
              </Label>
              <Select name="inquiryType" required>
                <SelectTrigger className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT">
                  <SelectValue placeholder="お問い合わせ内容を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reservation">ご予約について</SelectItem>
                  <SelectItem value="pricing">料金について</SelectItem>
                  <SelectItem value="facilities">設備・サービスについて</SelectItem>
                  <SelectItem value="event">イベント・パーティーについて</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                お問い合わせ内容<span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="お問い合わせ内容をご記入ください"
                required
                rows={5}
                className="border-gray-300 focus:border-custom-beige-DEFAULT focus:ring-custom-beige-DEFAULT resize-none"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                name="privacy"
                required
                className="mt-1 border-gray-300 data-[state=checked]:bg-custom-beige-DEFAULT data-[state=checked]:border-custom-beige-DEFAULT"
              />
              <Label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
                <span className="text-red-500">*</span>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-custom-beige-DEFAULT hover:underline"
                  rel="noreferrer"
                >
                  プライバシーポリシー
                </a>
                に同意します
              </Label>
            </div>

            {submitStatus === "error" && (
              <div className="text-red-600 text-sm text-center">送信に失敗しました。もう一度お試しください。</div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-custom-beige-DEFAULT hover:bg-custom-beige-dark text-white font-medium py-3 px-6 rounded-lg transition-colors font-jkg disabled:opacity-50"
            >
              {isSubmitting ? (
                "送信中..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  この内容で送信する
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
