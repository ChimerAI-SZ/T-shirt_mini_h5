import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(req.url) // req.url 为请求的完整 URL
    const imageUrl = searchParams.get("image_url") // 获取 image_url 参数
    console.log(imageUrl)

    // 确保获取到必要的参数
    if (!imageUrl) {
      return NextResponse.json({ error: "Missing required query parameters: image_url" }, { status: 400 })
    }

    // 拼接 API 请求的 URL，传递 image_url 参数
    const apiUrl = `http://fashion.xenotech.studio/api/searchImage/?image_url=${encodeURIComponent(imageUrl)}`

    // 发送 GET 请求到目标 API
    const response = await fetch(apiUrl, { method: "GET" })
    console.log("response", response)

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    // 直接返回目标 API 的响应数据
    const data = await response.json()
    const result = Array.isArray(data) ? data[1] : data // 如果是数组，取第一个元素
    console.log("Processed API response:", result)

    return NextResponse.json(result, { status: response.status })
  } catch (error: any) {
    console.error("Proxy error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
