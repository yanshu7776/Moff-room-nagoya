import type { Metadata } from "next"
import PrivacyPolicyClient from "./privacy-policy-client"

export const metadata: Metadata = {
  title: "ゲスト規約 | Moff room 名古屋店",
  description:
    "Moff room 名古屋店のゲスト規約です。ご利用前に必ずお読みください。安全で快適なご利用のためのルールを定めています。",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nagoya.moffroom.com/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
