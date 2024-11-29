import { useRef } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { createRoot } from "react-dom/client"
import { Show } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { AlertProps } from "@definitions/index"
import warnIcon from "@img/AlterWarningIcon.svg"

import "./index.css"

export const Alert = ({
  content, // 文字内容
  iconVisible = true, // 是否展示图标
  customIcon // 自定义图标地址
}: AlertProps) => {
  const ref = useRef(null)

  return (
    <AlertContainer ref={ref} className="public-alert-container">
      <Show when={iconVisible}>
        <StyledIcon>
          <img src={customIcon ?? warnIcon.src} alt="" />
        </StyledIcon>
      </Show>

      {content.split("\n").map(item => {
        const id = uuidv4()
        return <StyledContent key={id}>{item}</StyledContent>
      })}
    </AlertContainer>
  )
}

Alert.open = (parameter: AlertProps) => {
  let container = document.querySelector(".message")

  if (container === null) {
    container = document.createElement("div")
    container.className = "message"
    document.body.appendChild(container)
  }

  const Mes = () => {
    return <Alert {...parameter} />
  }
  const modal = createRoot(container)

  modal.render(<Mes />)

  setTimeout(() => {
    container.remove()
  }, parameter.duration ?? 2000)
}

const fadeAnime = keyframes`
0%{
    transform: translate(0,0);
    opacity: 0;
}
25%{
    transform: translate(0,15px);
    opacity: 1;
}
75%{
    transform: translate(0,15px);
    opacity: 1;
}
100%{
    transform: translate(0,0);
    opacity: 0;
}
`
const AlertContainer = styled.div`
  width: 70vw;

  padding: 12pt 16px;

  line-height: 22px;

  background: rgba(23, 23, 23, 0.8);
  border-radius: 8px;

  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;

  z-index: 8000;

  animation: ${fadeAnime} 2.8s;
`
const StyledIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4pt;

  & > img {
    width: 24pt;
    height: 24pt;
  }
`
const StyledContent = styled.p`
  font-size: 1rem;
  text-align: center;
`
