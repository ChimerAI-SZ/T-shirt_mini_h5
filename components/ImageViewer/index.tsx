import { useEffect } from "react"
import styled from "@emotion/styled"

import { LeftOutlined } from "@ant-design/icons"
import { Portal, Image } from "@chakra-ui/react"

interface ImageViewerProps {
  close: () => void
  imgUrl: string
  footer: React.ReactNode
  maskClosable?: boolean
}

const ImageViewer: React.FC<ImageViewerProps> = ({ close, imgUrl, footer, maskClosable = false }) => {
  const getWindowConfig = () => {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    if (typeof windowWidth !== "number") {
      if (document.compatMode === "CSS1Compat") {
        windowWidth = document.documentElement.clientWidth
        windowHeight = document.documentElement.clientHeight
      } else {
        windowWidth = document.body.clientWidth
        windowHeight = document.body.clientHeight
      }
    }
    return {
      windowWidth: windowWidth,
      windowHeight: windowHeight
    }
  }
  useEffect(() => {
    console.log(getWindowConfig())
  }, [])

  return (
    <Portal>
      <Container>
        <Wrapper>
          <Content>
            <BackIcon onClick={close}>
              {/* <Image src={"/assets/images/backIcon_white.svg"} alt="back-icon" /> */}
              <LeftOutlined style={{ fontSize: "1.22rem", color: "#fff" }} />
            </BackIcon>
            <Bg
              onClick={e => {
                e.stopPropagation()

                if (maskClosable) {
                  close && close()
                }
              }}
            />
            <StyledImg src={imgUrl} />
            <Footer>{footer}</Footer>
          </Content>
        </Wrapper>
      </Container>
    </Portal>
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

  background: transparent;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  bottom: 0;
  top: 0;

  width: 100%;

  background: transparent;
`
const BackIcon = styled.div`
  z-index: 1;
  position: absolute;
  width: 1.22rem;
  top: 0.61rem;
  left: 0.86rem;
`

const Bg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
`
const StyledImg = styled(Image)`
  max-width: 90vw;
  z-index: 1;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0rem 0.11rem 0.89rem 0rem rgba(0, 0, 0, 0.07);
  border-radius: 0.57rem;
  border: 0.03rem solid rgba(182, 182, 182, 0.5);
`
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 0.56rem 0 1.56rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0rem -0.06rem 0.28rem 0rem rgba(214, 214, 214, 0.5);
  border-radius: 0.67rem 0.67rem 0rem 0rem;
`

export default ImageViewer
