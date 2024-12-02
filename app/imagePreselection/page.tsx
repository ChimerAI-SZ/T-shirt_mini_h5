"use client"

import { useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"

import { Flex, Image, Box, For } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

const imgUrlList = [
  "https://ideogram.ai/api/images/ephemeral/uNPI0hifTz-vJ9Qj4qPSCQ.png?exp=1733155749&sig=65c06b2d225478ecdfeedbbeb55475eac43d389f98c49302a1fcfa3ab7944b4e",
  "https://ideogram.ai/api/images/ephemeral/6lZhV6XZSEWmXw7JiTX99w.png?exp=1733155992&sig=1b0a3a53611132847442736cc858237e11deed4c7a6dbbeb74cee8ba3226db2a",
  "https://ideogram.ai/api/images/ephemeral/pIWCOWLUTUafaR1Eph5xzA.png?exp=1733156064&sig=e87d0f0c3f1d8fd5953ba7f60219ded0fae4779528ca78bbbf5efe38b4a7a5a3",
  "https://ideogram.ai/api/images/ephemeral/Yah_9H5QSgaFAcBVC16FqA.png?exp=1733156183&sig=3f0321af83d3a397ae30aaa06f8593fdc539d8e74b733f8d25de5491e7d6111b"
]

const ImagePreselection = () => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)

  const router = useRouter()

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
              onClick={() => {}}
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
              onClick={() => {
                router.push("/clothPreview")
              }}
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
