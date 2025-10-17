"use client"

import Script from "next/script"

export function ChatBot() {
  return (
    <>
      {/* 
        ご指定のカスタムHTML要素をReactで安全にレンダリングします。
        @ts-ignore は、TypeScriptが標準ではない <chat-bot> タグを認識しないために必要です。
      */}
      {/* @ts-ignore */}
      <chat-bot
        platform_id="a961eeae-83cb-4eb5-92c9-555f68be13e4"
        user_id="f38dfd51-1895-4c12-8b9d-de2023fc0ca3"
        chatbot_id="8ebe8184-ad9e-4d25-bac6-bfc2dd16e540"
      >
        <a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">chatsimple</a>
      </chat-bot>

      {/* 
        Next.jsのScriptコンポーネントを使用して、チャットボットのローダーを効率的に読み込みます。
        'afterInteractive' 戦略により、ページの主要なコンテンツが読み込まれた後にスクリプトが実行され、
        ページの表示速度への影響を最小限に抑えます。
      */}
      <Script
        id="chatsimple-loader"
        src="https://cdn.chatsimple.ai/chat-bot-loader.js"
        strategy="afterInteractive"
        defer
      />
    </>
  )
}
