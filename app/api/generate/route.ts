import { NextResponse } from "next/server"
import fetch from "node-fetch"
import https from "https"

const agent = new https.Agent({
  rejectUnauthorized: false, // 在生产环境中应该设置为 true
  timeout: 30000 // 30 seconds
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Request body:", body)

    const response = await fetch("https://api.ideogram.ai/generate", {
      method: "POST",
      headers: {
        "Api-Key": "HfLhpuCNokbaXICyyS_YG2xgi0lHjInnFZrxHxqlnWPh75gXiA_j2x4m8uIB0NzCFkfkM74-lkd1QLuU_BKZIg",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_request: {
          prompt: body.image_request.prompt,
          aspect_ratio: body.image_request.aspect_ratio || "ASPECT_1_1",
          model: body.image_request.model || "V_2",
          magic_prompt_option: body.image_request.magic_prompt_option || "AUTO",
          style_type: body.image_request.style_type,
          negative_prompt: body.image_request.negative_prompt,
          seed: body.image_request.seed,
          resolution: body.image_request.resolution
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: errorText
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("API Success:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Generate error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
