"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2, AlertCircle, CalendarDays, Clock } from "lucide-react"
import { format, isSameDay, parseISO, startOfDay } from "date-fns"
import { ja } from "date-fns/locale"

type Event = {
  start: string
  end: string
  summary: string
  isAllDay: boolean
}

export default function BookingCalendar({ storeDetailsLink }: { storeDetailsLink: string }) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(
          `/api/calendar?month=${currentMonth.getMonth()}&year=${currentMonth.getFullYear()}`,
        )
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch calendar data.")
        }
        const data = await response.json()
        setEvents(data.events)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [currentMonth])

  const bookedDates = useMemo(() => {
    return events.map((event) => startOfDay(parseISO(event.start)))
  }, [events])

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return []
    return events
      .filter((event) => isSameDay(parseISO(event.start), selectedDate))
      .sort((a, b) => {
        if (a.isAllDay) return -1
        if (b.isAllDay) return 1
        return new Date(a.start).getTime() - new Date(b.start).getTime()
      })
  }, [events, selectedDate])

  const hasAllDayEvent = useMemo(() => {
    return selectedDayEvents.some((event) => event.isAllDay)
  }, [selectedDayEvents])

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-xl bg-custom-beige-unified">
        <CardContent className="flex flex-col items-center justify-center text-red-500 bg-red-50 p-8 rounded-lg">
          <AlertCircle className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold">エラーが発生しました</h3>
          <p>カレンダーの読み込みに失敗しました。時間をおいて再度お試しください。</p>
          <p className="text-sm mt-2">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl bg-custom-beige-unified">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-heading">予約状況カレンダー</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          リアルタイムの空き状況をご確認いただけます。
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        <div className="flex-1 flex justify-center items-center relative">
          {loading && (
            <div className="absolute inset-0 bg-custom-beige-unified/70 flex flex-col items-center justify-center z-10">
              <Loader2 className="w-12 h-12 animate-spin text-pink-500" />
              <p className="mt-4 text-gray-600">読み込み中...</p>
            </div>
          )}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="p-0"
            locale={ja}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: "bg-pink-200 text-pink-800 rounded-full font-bold relative",
            }}
            disabled={(date) => date < startOfDay(new Date())}
            components={{
              DayContent: ({ date, ...props }) => {
                const isBooked = bookedDates.some((bookedDate) => isSameDay(date, bookedDate))
                return (
                  <div className="relative">
                    <span>{format(date, "d")}</span>
                    {isBooked && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></span>
                    )}
                  </div>
                )
              },
            }}
          />
        </div>
        <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
            {selectedDate ? format(selectedDate, "M月d日 (E)", { locale: ja }) : "日付を選択してください"}
          </h3>
          <div className="flex-grow">
            {selectedDate && (
              <>
                {hasAllDayEvent ? (
                  <div className="text-center p-4 bg-red-50 rounded-lg h-full flex flex-col justify-center">
                    <Badge variant="destructive" className="w-full justify-center py-2 text-base">
                      終日予約済み
                    </Badge>
                    <p className="text-sm text-gray-500 pt-2">この日はご予約で埋まっています。</p>
                  </div>
                ) : selectedDayEvents.length > 0 ? (
                  <div className="space-y-3">
                    <Badge variant="destructive" className="w-full justify-center py-2 text-base">
                      一部予約済み
                    </Badge>
                    <p className="text-sm text-gray-600 text-center">以下の時間帯はご利用いただけません。</p>
                    <div className="space-y-2 pt-2 max-h-48 overflow-y-auto rounded-lg bg-gray-50 p-2">
                      {selectedDayEvents.map((event, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-100 rounded-md">
                          <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="font-mono text-sm font-medium text-red-800">
                            {format(parseISO(event.start), "HH:mm")} - {format(parseISO(event.end), "HH:mm")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-green-700 font-semibold pt-2 text-center">
                      上記以外の時間帯はご予約可能です。
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-green-50 rounded-lg h-full flex flex-col justify-center">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-2 text-base bg-green-100 text-green-800"
                    >
                      予約可能です
                    </Badge>
                    <p className="text-sm text-gray-500 mt-2">
                      この日はまだ予約がありません。
                      <br />
                      ご希望の時間帯でご予約いただけます。
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <Button
            asChild
            size="lg"
            className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg"
          >
            <Link href={storeDetailsLink} target="_blank" rel="noopener noreferrer">
              <CalendarDays className="w-5 h-5 mr-2" />
              予約サイトへ進む
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
