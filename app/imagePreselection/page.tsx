"use client"

import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useRouter, useSearchParams } from "next/navigation"

import { Flex, Image, Box, For } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

const ImagePreselection = () => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [imgUrlList, setImgUrlList] = useState<string[]>([])

  const searchParams = useSearchParams()
  const router = useRouter()

  // 上身展示
  const handleConfirm = () => {
    const timestamp = Date.now()
    const url = imgUrlList[selectedImgIndex]

    localStorage.setItem(`selectedImg_${timestamp}`, url)

    router.push(`/clothPreview?timestamp=${timestamp}`)
  }

  useEffect(() => {
    const timestamp = searchParams.get("timestamp")
    const urlList = JSON.parse(localStorage.getItem(`generatedImgList_${timestamp}`) ?? "[]")

    setImgUrlList(urlList)
  }, [])

  return (
    <Container>
      <Wrapper>
        <Flex flexDirection="column" w={"100%"}>
          <Box>
            <Image src={imgUrlList[selectedImgIndex]} alt="" />
          </Box>
          <ImgSelctor>
            <For each={imgUrlList}>
              {(url: string, index: number) => {
                return (
                  <Image
                    w={selectedImgIndex === index ? "2.5rem" : "2rem"}
                    border={selectedImgIndex === index ? "0.09rem solid #EE3939" : "unset"}
                    borderRadius={"0.25rem"}
                    onClick={() => {
                      setSelectedImgIndex(index)
                    }}
                    src={url}
                    alt=""
                  />
                )
              }}
            </For>
          </ImgSelctor>
          <Footer>
            <Button
              w={"6.75rem"}
              bgColor={"#fff"}
              borderRadius={"1.25rem"}
              border={"0.06rem solid #E5E5E5"}
              color={"#171717"}
              fontWeight={"400"}
              fontSize={"0.94rem"}
              mr={"0.75rem"}
              onClick={() => {
                router.back()
              }}
            >
              重新生成
            </Button>
            <Button
              w={"6.75rem"}
              bgColor={"#EE3939"}
              borderRadius={"1.25rem"}
              border={"0.06rem solid #EE3939"}
              color={"#fff"}
              fontWeight={"400"}
              fontSize={"0.94rem"}
              onClick={handleConfirm}
            >
              上身展示
            </Button>
          </Footer>
        </Flex>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;

  background: transparent;

  z-index: 1000;
`
const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;

  height: 100%;
  width: 100%;

  background: #f5f5f5;
`

const ImgSelctor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;

  & > img {
    margin-right: 0.5rem;
  }
`
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 0.63rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0rem -0.06rem 0.28rem 0rem rgba(214, 214, 214, 0.5);
  border-radius: 0.67rem 0.67rem 0rem 0rem;
`

export default ImagePreselection
