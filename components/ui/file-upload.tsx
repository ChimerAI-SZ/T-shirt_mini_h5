"use client"

import { useRef, useState } from "react"
import { Box, Text, Image, Input } from "@chakra-ui/react"

export interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string[]
  maxSize?: number
  disabled?: boolean
}

export function FileUpload({
  onFileSelect,
  accept = ["image/jpeg", "image/png"],
  maxSize = 5 * 1024 * 1024,
  disabled
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = (file: File) => {
    if (!accept.includes(file.type)) {
      alert("不支持的文件类型")
      return
    }

    if (file.size > maxSize) {
      alert("文件大小超出限制")
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
    onFileSelect(file)
  }

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      p={6}
      border="2px dashed"
      borderColor={isDragActive ? "blue.400" : "gray.200"}
      borderRadius="md"
      textAlign="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      transition="all 0.2s"
      _hover={{ borderColor: disabled ? "gray.200" : "blue.400" }}
      position="relative"
    >
      <Input
        ref={inputRef}
        type="file"
        accept={accept.join(",")}
        onChange={handleFileInput}
        display="none"
        disabled={disabled}
      />

      {previewUrl ? (
        <Image src={previewUrl} alt="Preview" maxH="200px" mx="auto" />
      ) : (
        <Text color="gray.500">{isDragActive ? "放开以上传图片" : "拖拽或点击上传图片 (JPG/PNG, 最大5MB)"}</Text>
      )}
    </Box>
  )
}
