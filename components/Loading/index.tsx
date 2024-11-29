"use client"
import ReactLoading from "react-loading"
import { Box } from "@chakra-ui/react"

export const Loading = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(255, 255, 255, 0.8)"
      zIndex={9999}
    >
      <ReactLoading type="spinningBubbles" color="#747474" height="3.38rem" width="3.38rem" />
    </Box>
  )
}
