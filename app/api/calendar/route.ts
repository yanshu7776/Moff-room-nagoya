import { NextResponse, type NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY

  if (!calendarId || !apiKey) {
    return NextResponse.json({ error: "Google Calendar IDまたはAPIキーが設定されていません。" }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const month = searchParams.get("month")
  const year = searchParams.get("year")

  const now = new Date()
  const currentYear = year ? Number.parseInt(year) : now.getFullYear()
  const currentMonth = month ? Number.parseInt(month) : now.getMonth()

  const timeMin = new Date(Date.UTC(currentYear, currentMonth, 1)).toISOString()
  const timeMax = new Date(Date.UTC(currentYear, currentMonth + 1, 1)).toISOString()

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // 10分間キャッシュ
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Google Calendar API Error:", errorData)
      return NextResponse.json(
        { error: "カレンダーの予定取得に失敗しました。", details: errorData.error.message },
        { status: response.status },
      )
    }

    const data = await response.json()
    const events = data.items.map((event: any) => ({
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      summary: event.summary,
      isAllDay: !!event.start.date, // start.date があれば終日イベント
    }))

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Error fetching calendar events:", error)
    return NextResponse.json({ error: "予期せぬエラーが発生しました。" }, { status: 500 })
  }
}
