import instance from "../workflow-axios"
import { instance as axios } from "../axios"
import { errorCaptureRes } from "@/utils/index"

interface PrintedTop {
  loadOriginalImage: string
  loadGarmentImage: string
  loadPrintingImage: string
  printingX: number
  printingY: number
  printingScale: number
  printingRotate: number
  removePrintingBackground: boolean
  userUUID: string
}

export const fetchPrintedTop = async (printedTop: PrintedTop) => {
  try {
    const response = await instance.post("/v1/printed_top", printedTop)
    return response
  } catch (error: any) {
    // 提取详细错误信息
    const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message
    throw new Error(errorMessage)
  }
}

// 通过taskid拿结果
export const getQuery = (params: object) => {
  return axios.post("/api/util/query", params)
}
