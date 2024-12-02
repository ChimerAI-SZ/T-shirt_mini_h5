"use client"

import { useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import { useSetState } from "ahooks"

import { generateImage } from "@/lib/request/page"
import { errorCaptureRes } from "@/utils/index"

import { Flex, Show, Image, Textarea, Box, Text, For, Grid } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/Alert"

const aspectRadioList = [
  { label: "3:1", value: "ASPECT_3_1", type: "horizontal" },
  { label: "16:9", value: "ASPECT_16_9", type: "horizontal" },
  { label: "16:10", value: "ASPECT_16_10", type: "horizontal" },
  { label: "3:2", value: "ASPECT_3_2", type: "horizontal" },
  { label: "4:3", value: "ASPECT_4_3", type: "horizontal" },
  // { label: "5:4", value: "ASPECT_5_4", type: "horizontal" },
  // { label: "2:1", value: "ASPECT_2_1", type: "horizontal" },
  { label: "1:3", value: "ASPECT_1_3", type: "vertical" },
  { label: "9:16", value: "ASPECT_9_16", type: "vertical" },
  { label: "10:16", value: "ASPECT_10_16", type: "vertical" },
  { label: "2:3", value: "ASPECT_2_3", type: "vertical" },
  { label: "3:4", value: "ASPECT_3_4", type: "vertical" },
  // { label: "4:5", value: "ASPECT_4_5", type: "vertical" },
  // { label: "`1`:2", value: "ASPECT_1_2", type: "vertical" },
  { label: "1:1", value: "ASPECT_1_1", type: "square" }
]
const orientationOptionList = [
  {
    label: "横向",
    value: "horizontal",
    imgUrl: "/assets/images/parameterConfig/horizontal.svg",
    selectedImgUrl: "/assets/images/parameterConfig/horzontalSelected.svg"
  },
  {
    label: "纵向",
    value: "vertical",
    imgUrl: "/assets/images/parameterConfig/vertical.svg",
    selectedImgUrl: "/assets/images/parameterConfig/verticalSelected.svg"
  },
  {
    label: "正方形",
    value: "square",
    imgUrl: "/assets/images/parameterConfig/square.svg",
    selectedImgUrl: "/assets/images/parameterConfig/squareSelected.svg"
  }
]

type aspectRatioType =
  | "ASPECT_1_1"
  | "ASPECT_16_10"
  | "ASPECT_10_16"
  | "ASPECT_4_3"
  | "ASPECT_3_4"
  | "ASPECT_16_9"
  | "ASPECT_9_16"
  | "ASPECT_3_2"
  | "ASPECT_2_3"
interface generationOptionsType {
  prompt: string
  aspect_ratio?: aspectRatioType
  model?: "V_1" | "V_1_TURBO" | "V_2" | "V_2_TURBO"
  style_type?: "AUTO" | "GENERAL" | "REALISTIC" | "DESIGN" | "RENDER_3D" | "ANIME"
  magic_prompt_option?: "AUTO" | "ON" | "OFF"
}

function Dashboard() {
  const [referenceType, setReferenceType] = useState<"picture" | "tips">("tips") // 参考类型，默认提示语，还能选择参考图

  // 比例
  const [orientation, setOrientation] = useState("horizontal")
  const [aspectRadio, setAspectRadio] = useState("ASPECT_4_3")

  const [loading, setLoading] = useState(false) // 加载状态
  const [loadingTime, setLoadingTime] = useState(0) // 加载已用时间

  const [generationOptions, setGenerationOptions] = useSetState<generationOptionsType>({
    // 固定配置
    model: "V_2_TURBO",
    style_type: "AUTO",
    magic_prompt_option: "AUTO",
    // 必填配置
    aspect_ratio: "ASPECT_4_3",

    prompt: ""
  })

  const router = useRouter()

  const handleOrientataionSelect = (value: string) => {
    // 存入 state
    setOrientation(value)

    // 切换图片类型之后，同步修改默认比例
    let aspect_ratio: aspectRatioType = "ASPECT_4_3"
    switch (value) {
      case "horizontal":
        aspect_ratio = "ASPECT_4_3"
        break
      case "vertical":
        aspect_ratio = "ASPECT_3_4"
        break
      default:
        aspect_ratio = "ASPECT_1_1"
        break
    }

    setGenerationOptions({
      aspect_ratio
    })
  }

  // 生成图片
  const handleGenerate = async () => {
    setLoading(true)

    let time = 0
    const interval = setInterval(() => {
      time++
      setLoadingTime(time)
    }, 1000)

    // 异步函数，用于生成一张图片并返回结果

    const result = []

    // 异步调用4次接口（同步会报错只有最后一个接口会被调用）
    for (let index = 0; index < 4; index++) {
      const [err, res] = await generateImage(generationOptions)

      result.push(res)
    }

    const timestamp = Date.now()
    const imgUrls = JSON.stringify(result.map(item => item.data.data[0].url))

    localStorage.setItem(`generatedImgList_${timestamp}`, imgUrls)

    // todo 这里是否针对某个错误进行判断，如果有错误的话再调用接口直到有4张图片呢？

    router.push(`/imagePreselection?timestamp=${timestamp}`)

    setTimeout(() => {
      setLoadingTime(0)
    }, 1000)

    clearInterval(interval)
    setLoading(false)
  }

  return (
    <Container className="parameter-config-container">
      <Wrapper>
        <Flex flexDirection="column" w={"100%"} mb={"3.8rem"}>
          {/* 选择设计类型 */}
          <DesignType>
            <Flex w={"50%"} h={"3.75rem"} bgColor={"#FFECEE"} position={"relative"}>
              <Image src={"/assets/images/parameterConfig/brush.svg"} alt="" />
              <span>插画设计</span>
              <Image
                alt=""
                src={"/assets/images/parameterConfig/brush_bg.svg"}
                boxSize={"2.5rem"}
                position={"absolute"}
                zIndex={1}
                right={0}
                bottom={0}
                margin={0}
              />
            </Flex>
            <Flex w={"50%"} h={"3.75rem"} bgColor={"#F3F3F3"} position={"relative"}>
              <Image src={"/assets/images/parameterConfig/artboard.svg"} />
              <span>Logo插画设计</span>
              <Image
                alt=""
                src={"/assets/images/parameterConfig/artboard_bg.svg"}
                boxSize={"2.5rem"}
                position={"absolute"}
                zIndex={1}
                right={0}
                bottom={0}
                margin={0}
              />
            </Flex>
          </DesignType>
          {/* 选择参考类型 */}
          <ReferenceSection>
            <Switch>
              <SwitchBg referenceType={referenceType} />
              <ReferenceItem onClick={() => setReferenceType("tips")}>提示语</ReferenceItem>
              <ReferenceItem onClick={() => setReferenceType("picture")}>参考图</ReferenceItem>
            </Switch>
            <Show
              when={referenceType === "tips"}
              fallback={
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  h={"15rem"}
                  borderRadius={"0.5rem"}
                  bgColor={"#f5f5f5"}
                >
                  <Image h={"3.5rem"} mb={"0.75rem"} src={"/assets/images/parameterConfig/uploadImgPlaceholder.png"} />
                  <Text fontSize={"0.81rem"} fontWeight={"400"} color={"#bfbfbf"} lineHeight={"1.25rem"}>
                    请点击上传图片
                  </Text>
                </Flex>
              }
            >
              <Box h={"15rem"} position={"relative"}>
                <StyledTextarea
                  onChange={e => {
                    setGenerationOptions({
                      prompt: e.target.value
                    })
                  }}
                  value={generationOptions.prompt}
                  bgColor={"#f5f5f5"}
                  borderRadius={"0.5rem"}
                  border={"unset"}
                  resize="none"
                  h={"15rem"}
                  placeholder="请输入一些描述"
                  maxLength={200}
                />
              </Box>
            </Show>
          </ReferenceSection>
          {/* 选择比例 */}
          <RatioSelector>
            <SubTitle>请选择图片生成比例</SubTitle>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="0.75rem"
              pb={"0.75rem"}
              mb={"0.75rem"}
              mt={"1rem"}
              borderBottom={"0.03rem dashed #d2d2d2"}
            >
              <For each={orientationOptionList}>
                {item => {
                  const checked = orientation === item.value
                  return (
                    <OrientationItem
                      checked={checked}
                      onClick={() => {
                        handleOrientataionSelect(item.value)
                      }}
                      key={item.value}
                    >
                      <Image src={checked ? item.selectedImgUrl : item.imgUrl} />
                      <div>{item.label}</div>
                    </OrientationItem>
                  )
                }}
              </For>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap="0.75rem">
              <For each={aspectRadioList.filter(item => item.type === orientation)}>
                {item => (
                  <RadioItem
                    onClick={() => {
                      setGenerationOptions({
                        aspect_ratio: item.value as aspectRatioType
                      })
                      setAspectRadio(item.value)
                    }}
                    checked={generationOptions.aspect_ratio === item.value}
                    key={item.value}
                  >
                    <span>{item.label}</span>
                  </RadioItem>
                )}
              </For>
            </Grid>
          </RatioSelector>
        </Flex>
        <Footer>
          <Button
            disabled={referenceType === "tips" && !generationOptions.prompt}
            w={"16.69rem"}
            bgColor={"#ee3939"}
            borderRadius={"1.25rem"}
            type="submit"
            loading={loading}
            loadingText={
              <div>
                {"生成中 "}
                <Show when={loadingTime > 0}>
                  <span>{loadingTime}s...</span>
                </Show>
              </div>
            }
            onClick={handleGenerate}
          >
            生成
          </Button>
        </Footer>
      </Wrapper>

      {/* <ImageGeneratorInput /> */}
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

  padding: 0.75rem;

  background: #f5f5f5;
`
const Section = styled.section`
  border-radius: 0.5rem;
  display: flex;
  background: #fff;
  width: 100%;
  padding: 0.75rem;

  margin-bottom: 0.75rem;
`
const DesignType = styled(Section)`
  & > div {
    &:first-child {
      margin-right: 0.75rem;
    }

    border-radius: 0.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:first-child {
      font-weight: 600;
      font-size: 0.94rem;
      color: #ee3939;
      line-height: 1.5rem;
      text-align: center;
      font-style: normal;
    }

    &:last-child {
      font-weight: 600;
      font-size: 0.94rem;
      color: #bfbfbf;
      line-height: 1.5rem;
      text-align: left;
      font-style: normal;

      &::after {
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
      }
    }

    & > img:first-child {
      width: 1rem;
      height: 1rem;
      margin-right: 0.38rem;
    }
  }
`
const ReferenceSection = styled(Section)`
  flex-direction: column;
`

const Switch = styled.div`
  width: 9.5rem;
  height: 1.75rem;

  background: #f5f5f5;
  border-radius: 0.88rem;

  display: flex;
  align-items: center;

  position: relative;
  padding: 0.13rem;
  margin-bottom: 0.75rem;
`

const ReferenceItem = styled.div`
  flex: 1;
  text-align: center;
  z-index: 2;
`
interface SwitchBgType {
  referenceType: "tips" | "picture"
}
const SwitchBg = styled.div<SwitchBgType>`
  width: 50%;
  position: absolute;
  background: #fff;
  height: calc(100% - 0.26rem);
  z-index: 1;
  border-radius: 0.75rem;

  transition: transform 0.5s ease;
  transform: translateX(${props => (props.referenceType === "tips" ? "0" : "94%")});
`
const RatioSelector = styled(Section)`
  flex-direction: column;
`
const SubTitle = styled.div`
  font-weight: 600;
  font-size: 0.94rem;
  color: #171717;
  line-height: 1.31rem;
  text-align: left;
  font-style: normal;
`
interface OrientationItemType {
  checked: boolean
}
const OrientationItem = styled.div<OrientationItemType>`
  background: ${props => (props.checked ? "#FFECEE" : "#F5F5F5")};
  color: ${props => (props.checked ? "#EE2233" : "#171717")};
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 0.5rem;

  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.25rem;
  text-align: center;
  font-style: normal;

  & > img {
    width: 0.88rem;
  }
`
const RadioItem = styled.div<OrientationItemType>`
  height: 2.25rem;
  border-radius: 0.5rem;
  background: ${props => (props.checked ? "#FFECEE" : "#F5F5F5")};
  color: ${props => (props.checked ? "#EE2233" : "#171717")};

  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-align: center;
    font-style: normal;
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

const StyledTextarea = styled(Textarea)`
  &:focus,
  &:focus-visible {
    outline-style: unset;
  }
`

export default Dashboard
