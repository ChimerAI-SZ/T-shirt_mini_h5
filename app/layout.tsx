import { Providers } from "./providers"
import { Suspense } from "react"
import "./global.css"
import loginBg from "@img/login/bg.png"
import { headers } from "next/headers"
import { Loading } from "@/components/Loading/index"
import type { Viewport, Metadata } from "next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/"

  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        style={{
          overflow: "auto"
        }}
      >
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
      <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    </html>
  )
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false
}
export const metadata: Metadata = {
  title: "CHIMERAI X SIDA",
  description:
    "Introducing CREAMODA, an unprecedented clothing generative engine. At CREAMODA, we offer an intelligent fashion platform designed to bring your creative ambitions to life. With our state-of-the-art generative clothing engine, CREAMODA transforms your vision into top-selling fashion, seamlessly and efficiently. Whether you’re shaping trends or creating unique designs, CREAMODA empowers you to bring your ideas to market with ease.",
  keywords: [
    "AI",
    "fashion",
    "creation",
    "Generative",
    "clothing",
    "engine",
    "AI-driven",
    "fashion",
    "platform",
    "Fashion",
    "design",
    "automation",
    "Seamless",
    "fashion",
    "design",
    "Top-selling",
    "fashion",
    "designs",
    "AI",
    "fashion",
    "technology",
    "Intelligent",
    "fashion",
    "design",
    "Creative",
    "fashion",
    "platform",
    "Automated",
    "garment",
    "creation"
  ]
}
