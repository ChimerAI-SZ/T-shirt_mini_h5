"use client"

import { useState } from "react"
import { Box, VStack, Text, Textarea, Button, Icon } from "@chakra-ui/react"
import { ImageResolution, IdeogramImageRequest } from "@/lib/request/page"
import { Select, NumberInput } from "@/components/ui"

interface ImageGeneratorOptionsProps {
  onChange: (options: Partial<IdeogramImageRequest>) => void
  disabled?: boolean
}

export default function ImageGeneratorOptions({ onChange, disabled }: ImageGeneratorOptionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<Partial<IdeogramImageRequest>>({
    model: "V_2_TURBO",
    style_type: "AUTO",
    magic_prompt_option: "AUTO",
    seed: undefined,
    negative_prompt: "",
    resolution: ImageResolution.RESOLUTION_1024_1024
  })

  const handleOptionChange = <K extends keyof IdeogramImageRequest>(key: K, value: IdeogramImageRequest[K]) => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
    onChange(newOptions)
  }

  return (
    <Box borderWidth="1px" borderRadius="md">
      <Button
        width="100%"
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        justifyContent="space-between"
        fontWeight="normal"
      >
        高级选项
      </Button>

      {isOpen && (
        <Box p={4}>
          <VStack gap={4} align="stretch">
            {/* 模型选择 */}
            <Box>
              <Select
                label="模型版本"
                value={options.model ?? "V_2_TURBO"}
                onChange={value => handleOptionChange("model", value as IdeogramImageRequest["model"])}
                disabled={disabled}
                options={[
                  { value: "V_2_TURBO", label: "V2 Turbo (推荐)" },
                  { value: "V_2", label: "V2" },
                  { value: "V_1_TURBO", label: "V1 Turbo" },
                  { value: "V_1", label: "V1" }
                ]}
              />
            </Box>

            {/* 风格选择 */}
            <Box>
              <Select
                label="图片风格"
                value={options.style_type ?? "AUTO"}
                onChange={value => handleOptionChange("style_type", value as IdeogramImageRequest["style_type"])}
                disabled={disabled}
                options={[
                  { value: "AUTO", label: "自动" },
                  { value: "GENERAL", label: "通用" },
                  { value: "REALISTIC", label: "写实" },
                  { value: "DESIGN", label: "设计" },
                  { value: "RENDER_3D", label: "3D渲染" },
                  { value: "ANIME", label: "动漫" }
                ]}
              />
            </Box>

            {/* 提示词优化 */}
            <Box>
              <Select
                label="提示词优化"
                value={options.magic_prompt_option ?? "AUTO"}
                onChange={value =>
                  handleOptionChange("magic_prompt_option", value as IdeogramImageRequest["magic_prompt_option"])
                }
                disabled={disabled}
                options={[
                  { value: "AUTO", label: "自动" },
                  { value: "ON", label: "开启" },
                  { value: "OFF", label: "关闭" }
                ]}
              />
            </Box>

            {/* 分辨率选择 */}
            <Box>
              <Select
                label="分辨率"
                value={options.resolution ?? ImageResolution.RESOLUTION_1024_1024}
                onChange={value => handleOptionChange("resolution", value as ImageResolution)}
                disabled={disabled}
                options={[
                  { value: ImageResolution.RESOLUTION_1024_1024, label: "1024 x 1024 (推荐)" },
                  { value: ImageResolution.RESOLUTION_1024_768, label: "1024 x 768" },
                  { value: ImageResolution.RESOLUTION_768_1024, label: "768 x 1024" }
                ]}
              />
            </Box>

            {/* 随机种子 */}
            <Box>
              <NumberInput
                label="随机种子 (可选)"
                value={options.seed}
                onChange={value => handleOptionChange("seed", value)}
                min={0}
                max={2147483647}
                placeholder="留空为随机"
                disabled={disabled}
              />
            </Box>

            {/* 反向提示词 */}
            <Box>
              <Text mb={2} fontSize="sm">
                反向提示词 (可选)
              </Text>
              <Textarea
                value={options.negative_prompt ?? ""}
                onChange={e => handleOptionChange("negative_prompt", e.target.value)}
                placeholder="输入不想在图片中出现的元素"
                size="sm"
                disabled={disabled}
              />
            </Box>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
