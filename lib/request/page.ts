import { instance, apiInstance } from "../axios"

import { errorCaptureRes } from "@/utils/index"

// 分辨率枚举
export enum ImageResolution {
  RESOLUTION_512_1536 = "RESOLUTION_512_1536",
  RESOLUTION_576_1408 = "RESOLUTION_576_1408",
  RESOLUTION_576_1472 = "RESOLUTION_576_1472",
  RESOLUTION_576_1536 = "RESOLUTION_576_1536",
  RESOLUTION_640_1024 = "RESOLUTION_640_1024",
  RESOLUTION_640_1344 = "RESOLUTION_640_1344",
  RESOLUTION_640_1408 = "RESOLUTION_640_1408",
  RESOLUTION_640_1472 = "RESOLUTION_640_1472",
  RESOLUTION_640_1536 = "RESOLUTION_640_1536",
  RESOLUTION_704_1152 = "RESOLUTION_704_1152",
  RESOLUTION_704_1216 = "RESOLUTION_704_1216",
  RESOLUTION_704_1280 = "RESOLUTION_704_1280",
  RESOLUTION_704_1344 = "RESOLUTION_704_1344",
  RESOLUTION_704_1408 = "RESOLUTION_704_1408",
  RESOLUTION_704_1472 = "RESOLUTION_704_1472",
  RESOLUTION_720_1280 = "RESOLUTION_720_1280",
  RESOLUTION_736_1312 = "RESOLUTION_736_1312",
  RESOLUTION_768_1024 = "RESOLUTION_768_1024",
  RESOLUTION_768_1088 = "RESOLUTION_768_1088",
  RESOLUTION_768_1152 = "RESOLUTION_768_1152",
  RESOLUTION_768_1216 = "RESOLUTION_768_1216",
  RESOLUTION_768_1232 = "RESOLUTION_768_1232",
  RESOLUTION_768_1280 = "RESOLUTION_768_1280",
  RESOLUTION_768_1344 = "RESOLUTION_768_1344",
  RESOLUTION_832_960 = "RESOLUTION_832_960",
  RESOLUTION_832_1024 = "RESOLUTION_832_1024",
  RESOLUTION_832_1088 = "RESOLUTION_832_1088",
  RESOLUTION_832_1152 = "RESOLUTION_832_1152",
  RESOLUTION_832_1216 = "RESOLUTION_832_1216",
  RESOLUTION_832_1248 = "RESOLUTION_832_1248",
  RESOLUTION_864_1152 = "RESOLUTION_864_1152",
  RESOLUTION_896_960 = "RESOLUTION_896_960",
  RESOLUTION_896_1024 = "RESOLUTION_896_1024",
  RESOLUTION_896_1088 = "RESOLUTION_896_1088",
  RESOLUTION_896_1120 = "RESOLUTION_896_1120",
  RESOLUTION_896_1152 = "RESOLUTION_896_1152",
  RESOLUTION_960_832 = "RESOLUTION_960_832",
  RESOLUTION_960_896 = "RESOLUTION_960_896",
  RESOLUTION_960_1024 = "RESOLUTION_960_1024",
  RESOLUTION_960_1088 = "RESOLUTION_960_1088",
  RESOLUTION_1024_640 = "RESOLUTION_1024_640",
  RESOLUTION_1024_768 = "RESOLUTION_1024_768",
  RESOLUTION_1024_832 = "RESOLUTION_1024_832",
  RESOLUTION_1024_896 = "RESOLUTION_1024_896",
  RESOLUTION_1024_960 = "RESOLUTION_1024_960",
  RESOLUTION_1024_1024 = "RESOLUTION_1024_1024",
  RESOLUTION_1088_768 = "RESOLUTION_1088_768",
  RESOLUTION_1088_832 = "RESOLUTION_1088_832",
  RESOLUTION_1088_896 = "RESOLUTION_1088_896",
  RESOLUTION_1088_960 = "RESOLUTION_1088_960",
  RESOLUTION_1120_896 = "RESOLUTION_1120_896",
  RESOLUTION_1152_704 = "RESOLUTION_1152_704",
  RESOLUTION_1152_768 = "RESOLUTION_1152_768",
  RESOLUTION_1152_832 = "RESOLUTION_1152_832",
  RESOLUTION_1152_864 = "RESOLUTION_1152_864",
  RESOLUTION_1152_896 = "RESOLUTION_1152_896",
  RESOLUTION_1216_704 = "RESOLUTION_1216_704",
  RESOLUTION_1216_768 = "RESOLUTION_1216_768",
  RESOLUTION_1216_832 = "RESOLUTION_1216_832",
  RESOLUTION_1232_768 = "RESOLUTION_1232_768",
  RESOLUTION_1248_832 = "RESOLUTION_1248_832",
  RESOLUTION_1280_704 = "RESOLUTION_1280_704",
  RESOLUTION_1280_720 = "RESOLUTION_1280_720",
  RESOLUTION_1280_768 = "RESOLUTION_1280_768",
  RESOLUTION_1280_800 = "RESOLUTION_1280_800",
  RESOLUTION_1312_736 = "RESOLUTION_1312_736",
  RESOLUTION_1344_640 = "RESOLUTION_1344_640",
  RESOLUTION_1344_704 = "RESOLUTION_1344_704",
  RESOLUTION_1344_768 = "RESOLUTION_1344_768",
  RESOLUTION_1408_576 = "RESOLUTION_1408_576",
  RESOLUTION_1408_640 = "RESOLUTION_1408_640",
  RESOLUTION_1408_704 = "RESOLUTION_1408_704",
  RESOLUTION_1472_576 = "RESOLUTION_1472_576",
  RESOLUTION_1472_640 = "RESOLUTION_1472_640",
  RESOLUTION_1472_704 = "RESOLUTION_1472_704",
  RESOLUTION_1536_512 = "RESOLUTION_1536_512",
  RESOLUTION_1536_576 = "RESOLUTION_1536_576",
  RESOLUTION_1536_640 = "RESOLUTION_1536_640"
}

// 颜色调色板预设名称
export enum ColorPaletteName {
  VIBRANT = "VIBRANT",
  MUTED = "MUTED",
  EARTHY = "EARTHY"
  // ... 其他预设名称
}

// 颜色调色板成员
interface ColorPaletteMember {
  color: string // 十六进制颜色值
  weight?: number // 可选权重
}

// 颜色调色板类型
type ColorPalette =
  | {
      name?: ColorPaletteName
    }
  | {
      members: ColorPaletteMember[]
    }

// Ideogram API 接口类型定义
export interface IdeogramImageRequest {
  prompt: string
  aspect_ratio?:
    | "ASPECT_1_1"
    | "ASPECT_16_10"
    | "ASPECT_10_16"
    | "ASPECT_4_3"
    | "ASPECT_3_4"
    | "ASPECT_16_9"
    | "ASPECT_9_16"
    | "ASPECT_3_2"
    | "ASPECT_2_3"
  model?: "V_1" | "V_1_TURBO" | "V_2" | "V_2_TURBO"
  style_type?: "AUTO" | "GENERAL" | "REALISTIC" | "DESIGN" | "RENDER_3D" | "ANIME"
  magic_prompt_option?: "AUTO" | "ON" | "OFF"
  seed?: number // >=0 && <=2147483647
  negative_prompt?: string
  resolution?: ImageResolution
  color_palette?: ColorPalette
}

export interface IdeogramImageResponse {
  created: string
  data: Array<{
    prompt: string
    resolution: string
    is_image_safe: boolean
    seed: number
    url: string
    style_type: string
  }>
}

// Ideogram API 接口使用 apiInstance
export const generateImage = async (imageRequest: IdeogramImageRequest) => {
  return errorCaptureRes(async () => {
    try {
      const response = await instance.post("/api/ideogram/generate", imageRequest)
      return response
    } catch (error: any) {
      // 提取详细错误信息
      const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message
      throw new Error(errorMessage)
    }
  })
}

// 图片编辑接口
export const editImage = async (imageRequest: IdeogramImageRequest & { image_url: string }) => {
  return errorCaptureRes(async () => {
    const response = await apiInstance.post(
      "api/edit",
      { image_request: imageRequest },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    return response
  })
}

// 图片放大接口
export const upscaleImage = async (imageUrl: string) => {
  return errorCaptureRes(async () => {
    const response = await apiInstance.post(
      "api/upscale",
      { image_url: imageUrl },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    return response
  })
}
