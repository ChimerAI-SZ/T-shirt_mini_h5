"use client"

import { useState } from "react"
import { Box, Button, Textarea, Text } from "@chakra-ui/react"
import { generateImage, IdeogramImageRequest } from "@/lib/request/page"
import ImageGeneratorOptions from "./ImageGeneratorOptions"
import { RadioGroup, FileUpload } from "@/components/ui"

const MAX_CHARS = 500
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

interface InputMode {
  mode: "text" | "image"
  prompt: string
  referenceImage?: File | null
}

export default function ImageGeneratorInput() {
  const [inputData, setInputData] = useState<InputMode>({
    mode: "text",
    prompt: "",
    referenceImage: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generationOptions, setGenerationOptions] = useState<Partial<IdeogramImageRequest>>({
    model: "V_2_TURBO",
    style_type: "AUTO",
    magic_prompt_option: "AUTO"
  })

  // 模式选择
  const handleModeChange = (value: string) => {
    setInputData(prev => ({
      ...prev,
      mode: value as "text" | "image",
      referenceImage: null
    }))
    setError(null)
  }

  // 文本输入处理
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setInputData(prev => ({ ...prev, prompt: text }))
      setError(null)
    }
  }

  // 图片上传处理
  const handleFileSelect = (file: File) => {
    setInputData(prev => ({ ...prev, referenceImage: file }))
    setError(null)
  }

  // 生成图片
  const handleGenerate = async () => {
    if (!inputData.prompt.trim()) {
      setError("请输入图片描述")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const params = {
        prompt: inputData.prompt,
        ...generationOptions
      }

      const [err, response] = await generateImage(params)

      if (err) {
        setError(err.message || "生成失败，请重试")
        return
      }

      // TODO: 处理生成成功的响应
      console.log("Generated image:", response)
    } catch (e) {
      setError("生成失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      {/* 模式选择按钮 */}
      <RadioGroup
        options={[
          { value: "text", label: "文本生成" },
          { value: "image", label: "图片参考" }
        ]}
        defaultValue="text"
        onChange={handleModeChange}
        disabled={isLoading}
      />

      {/* 文本输入区域 */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Textarea
          value={inputData.prompt}
          onChange={handlePromptChange}
          placeholder="请输入图片描述..."
          size="lg"
          rows={4}
          css={{
            borderColor: error ? "var(--chakra-colors-red-500)" : undefined
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {inputData.prompt.length}/{MAX_CHARS}
          </Text>
        </Box>
      </Box>

      {/* 图片上传区域 - 仅在图片模式下显示 */}
      {inputData.mode === "image" && (
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={MAX_FILE_SIZE}
          disabled={isLoading}
        />
      )}

      {/* 高级选项 */}
      <ImageGeneratorOptions onChange={setGenerationOptions} disabled={isLoading} />

      {/* ���成按钮 */}
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleGenerate}
        css={{
          "&[disabled]": {
            opacity: 0.4,
            cursor: "not-allowed"
          },
          "&[data-loading]": {
            opacity: 0.4,
            cursor: "progress"
          }
        }}
        data-loading={isLoading}
        disabled={!inputData.prompt.trim() || isLoading}
      >
        {isLoading ? "生成中..." : "生成图片"}
      </Button>
    </Box>
  )
}
