import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch("https://api.ideogram.ai/upscale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.NEXT_PUBLIC_IDEOGRAM_API_KEY || ""
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to upscale image" }, { status: 500 })
  }
}
