"use client"
import { useState } from "react"
import { Container, Flex, Link, IconButton, Text, Image, Show } from "@chakra-ui/react"
import ArrowLeft from "@img/login/back.svg"
import SelectMore from "@img/generate-result/select-more.svg"
import Active from "@img/generate-result/active.svg"
import { useRouter } from "next/navigation"
function Page({ show, noTitle, cb }: { show?: boolean; noTitle?: boolean; cb?: (e: boolean) => void }) {
  const [active, setActive] = useState(false)
  const router = useRouter()
  return (
    <Flex alignItems="center" justifyContent="center" mb={4} width="full" position="relative">
      <IconButton
        onClick={() => {
          router.push("/")
        }}
        variant="ghost"
        aria-label="Back"
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
      >
        <Image src={ArrowLeft.src} w={"1.38rem"} h={"1.38rem"} />
      </IconButton>

      <Show
        when={!noTitle}
        fallback={
          <Text
            fontSize="1.1rem"
            fontWeight="bold"
            letterSpacing="0rem"
            textAlign="center"
            color={noTitle ? "transparent" : "#171717"}
          >
            CREAMODA
          </Text>
        }
      >
        <Image w={"6.8rem"} src={"/assets/images/aiAvatar_black.png"} alt="creamoda-logo" />
      </Show>

      {show && (
        <IconButton
          variant="ghost"
          aria-label="Back"
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          onClick={() => {
            cb && cb(!active)
            setActive(!active)
          }}
        >
          <Image src={active ? Active.src : SelectMore.src} boxSize="1.9rem" />
        </IconButton>
      )}
    </Flex>
  )
}

export default Page
