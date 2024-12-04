import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 })
  }

  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
      "Access-Control-Allow-Origin": "*"
    }
  })
}
