"use client"

import { Box, Button, Container, Image } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"

declare global {
  interface Window {
    wx?: {
      miniProgram: {
        navigateTo: (options: { url: string }) => void
      }
    }
  }
}

export default function UpperDisplay() {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get("imageUrl") || "/placeholder-image.jpg"

  const handleAddToCart = () => {
    // 检查 wx.miniProgram 是否存在
    wx.miniProgram.navigateTo({
      url: "/pages/cart/cart"
    })
    if (typeof window !== "undefined" && window.wx?.miniProgram) {
      window.wx.miniProgram.navigateTo({
        url: "/pages/cart/cart"
      })
    }
  }

  return (
    <Container p={0} position="relative" height="100vh" backgroundColor="#f5f5f7">
      {/* 图片展示区域 */}
      <Box margin="0 auto">
        <Image src={imageUrl} alt="Upper display" width="100%" height="auto" objectFit="cover" />
      </Box>

      {/* 固定在底部的按钮 */}
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        padding="1rem"
        background="#FFFFFF"
        boxShadow="0rem 0rem 0.75rem 0rem rgba(0,0,0,0.06)"
      >
        <Box width="16.69rem" margin="0 auto">
          <Button
            width="100%"
            height="2.5rem"
            backgroundColor="#EE3939"
            borderRadius="1.25rem"
            _hover={{ backgroundColor: "#D63232" }}
            fontFamily="PingFangSC, PingFang SC"
            fontWeight={400}
            fontSize="0.94rem"
            color="#FFFFFF"
            lineHeight="1.44rem"
            fontStyle="normal"
            onClick={handleAddToCart}
          >
            加入购物车
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
