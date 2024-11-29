"use client"

import { Box, Container } from "@chakra-ui/react"
import ImageGeneratorInput from "@/components/ImageGeneratorInput"

function Dashboard() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box display="flex" flexDirection="column" gap={8}>
        <Box>
          <ImageGeneratorInput />
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard
