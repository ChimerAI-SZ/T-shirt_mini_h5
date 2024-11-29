"use client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider } from "react-redux"
import store from "@store/index"
import { usePathname, useRouter } from "next/navigation"
import { Loading } from "@components/Loading"
import { useEffect, useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 预加载关键路由
  useEffect(() => {
    // 预加载常用路由
    router.prefetch("/login")
    router.prefetch("/album")
    router.prefetch("/profile")
    router.prefetch("/upload")
  }, [router])

  return (
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </Provider>
  )
}
