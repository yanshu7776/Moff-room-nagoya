"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ExternalLink } from "lucide-react"
import Link from "next/link"

type GoogleCalendarEmbedProps = {
  storeDetailsLink: string
}

export default function GoogleCalendarEmbed({ storeDetailsLink }: GoogleCalendarEmbedProps) {
  const calendarId = "0a423f137f27b9a2f4a40f984120e3fe5b921452cb3c6c816fa6ffd0ffc96c05@group.calendar.google.com"
  const calendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId,
  )}&ctz=Asia%2FTokyo&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`

  return (
    <div className="container max-w-5xl mx-auto px-4">
      <Card className="bg-custom-beige-dark shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-pink-50 to-rose-50 p-6">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-heading">
            空き状況の確認・ご予約
          </CardTitle>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            下のカレンダーで空き状況をご確認の上、予約サイトへお進みください。
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-2xl border-2 border-gray-200">
            <iframe
              src={calendarSrc}
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              title="予約カレンダー"
            ></iframe>
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg text-base sm:text-lg px-8 py-6"
            >
              <Link href={storeDetailsLink} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="w-5 h-5 mr-3" />
                予約サイトで日時を選択する
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-gray-500">※カレンダーが「予定あり」の時間帯はご予約いただけません。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
