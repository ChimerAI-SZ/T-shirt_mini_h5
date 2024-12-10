"use client"

import { useState, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useRouter, useSearchParams } from "next/navigation"

import { Flex, Image, Box, For } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

const ImagePreselection = () => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const [imgUrlList, setImgUrlList] = useState<string[]>([])

  const [footerHeight, setFooterHeight] = useState(80) // footer 区块高度

  const footerRef = useRef<null | HTMLDivElement>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  // 上身展示
  const handleConfirm = () => {
    const timestamp = Date.now()
    const url = imgUrlList[selectedImgIndex]

    localStorage.setItem(`selectedImg_${timestamp}`, url)

    router.push(`/printed-top?timestamp=${timestamp}`)
  }

  useEffect(() => {
    // 获取底部按钮区的高度，用于占位块
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight + 16)
    }
  }, [footerRef.current])

  useEffect(() => {
    const timestamp = searchParams.get("timestamp")
    const urlList = JSON.parse(localStorage.getItem(`generatedImgList_${timestamp}`) ?? "[]")

    setImgUrlList(urlList)
  }, [])

  return (
    <Container>
      <Wrapper>
        <Flex flexDirection="column" w={"100%"}>
          <Flex
            // 2 / 4.5 分别是小图预览区的高度和 margin-top
            h={`calc(100% - 2rem - 4.5rem - ${footerHeight}px)`}
            flexGrow={"1"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image objectFit={"contain"} w={"100%"} h={"100%"} src={imgUrlList[selectedImgIndex]} alt="" />
          </Flex>
          <ImgSelctor footerHeight={footerHeight}>
            <For each={imgUrlList}>
              {(url: string, index: number) => {
                return (
                  <Image
                    key={url}
                    w={selectedImgIndex === index ? "3rem" : "2.5rem"}
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
          <Footer ref={footerRef}>
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

interface ImgSelctorProps {
  footerHeight: number
}

const ImgSelctor = styled.div<ImgSelctorProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 6rem;

  margin-top: 2rem;
  margin-bottom: ${props => props.footerHeight}px;

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
  padding: 0.56rem 1rem 1.56rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0rem -0.06rem 0.28rem 0rem rgba(214, 214, 214, 0.5);
  border-radius: 0.67rem 0.67rem 0rem 0rem;
`

export default ImagePreselection
