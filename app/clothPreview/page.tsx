"use client"

import { useState } from "react"
import styled from "@emotion/styled"

import { Flex, Grid, Image, Tabs, For } from "@chakra-ui/react"
const { Root } = Tabs
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const imgUrl =
  "https://ideogram.ai/api/images/ephemeral/uNPI0hifTz-vJ9Qj4qPSCQ.png?exp=1733155749&sig=65c06b2d225478ecdfeedbbeb55475eac43d389f98c49302a1fcfa3ab7944b4e"

const shapeList = [
  {
    url: "https://ideogram.ai/api/images/ephemeral/S5x2A3ZESquXN4Ap0dR9Og.png?exp=1733158062&sig=5f24a65e907d05663f9ac730e724f178e2b71a4d8f40d8a3bbeb03ef1851052b",
    label: "圆领卫衣",
    unpublished: false
  },
  {
    url: "https://ideogram.ai/api/images/ephemeral/ifykIKs1Q7qHSED2wsPdQA.png?exp=1733158232&sig=e32744ce51021ed5d93d1695c9939555ae0e0f45471cd8c95af2fcc988b51af8",
    label: "帽衫卫衣",
    unpublished: true
  },
  {
    url: "https://ideogram.ai/api/images/ephemeral/2u23KXhIQbizuKUX0RryDQ.png?exp=1733158297&sig=2076648daecd2c35a460e345dfbf415d37596270a9d7a47bd8a9735793c720dd",
    label: "POLO衫",
    unpublished: true
  }
]

const ClosePreview = () => {
  const [bgRemovalToggle, setBgRemovalToggled] = useState(false)

  return (
    <Container>
      <Wrapper>
        <Flex flexDirection="column" w={"100%"}>
          <Flex bgColor={"#fff"} alignItems={"center"} justifyContent={"center"}>
            <Image h={"23.44rem"} src={imgUrl} alt="" />
          </Flex>

          <Flex justifyContent={"flex-end"} p={"0.63rem 1rem"}>
            <Switch checked={bgRemovalToggle} onCheckedChange={value => console.log(value)}>
              去除插画背景
            </Switch>
          </Flex>

          <StyledTabRoot bgColor={"#fff"} flexGrow={"1"} borderRadius={"0.5rem 0.5rem 0rem 0rem"} defaultValue="shape">
            <Tabs.List>
              <Tabs.Trigger value="shape">款式</Tabs.Trigger>
              <Tabs.Trigger value="color">颜色</Tabs.Trigger>
              <Tabs.Trigger value="model">模特</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="shape">
              <Grid templateColumns="repeat(4, 1fr)" gap="0.75rem" pb={"0.75rem"} mb={"0.75rem"} px={"0.75rem"}>
                <For each={shapeList}>
                  {(item, index) => (
                    <OptionBox checked={index === 0} unpublished={item.unpublished}>
                      <Image src={item.url} alt="" />
                      <span>{item.label}</span>
                    </OptionBox>
                  )}
                </For>
              </Grid>
            </Tabs.Content>
            <Tabs.Content value="color">Manage your projects</Tabs.Content>
            <Tabs.Content value="model">Manage your tasks for freelancers</Tabs.Content>
          </StyledTabRoot>

          <Footer>
            <Button w={"16.69rem"} bgColor={"#ee3939"} borderRadius={"1.25rem"} type="submit" onClick={() => {}}>
              生成
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

const StyledTabRoot = styled(Root)`
  & > div:first-child {
    border-color: #f5f5f7;

    & > button::before {
      width: 1rem;
      height: 0.19rem;
      border-radius: 0.09rem;

      background: #e23;

      bottom: 0.15rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`
interface OptionBoxType {
  checked: boolean
  unpublished: boolean
}
const OptionBox = styled.div<OptionBoxType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  color: ${props => (props.unpublished ? "#BFBFBF" : props.checked ? "#ee3939" : "#171717")};

  ${props => props.unpublished && `filter: grayscale(80%);`}

  ${props =>
    props.unpublished &&
    `&::after {
        content: "待上线";
        font-weight: 400;
        font-size: 0.69rem;
        color: #aaaaaa;
        line-height: 1rem;
        text-align: left;
        font-style: normal;
        text-align: center;

        width: 2.69rem;
        height: 1rem;
        background: #ebebec;
        border-radius: 0rem 0.5rem 0rem 0.5rem;

        position: absolute;
        right: 0;
        top: 0;
      }`}
  & > img {
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${props => (props.checked ? "#ee3939" : "#e3e3e3")};
  }
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

export default ClosePreview
