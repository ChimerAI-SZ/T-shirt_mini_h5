import axios, {
  AxiosRequestConfig,
  RawAxiosResponseHeaders,
  CancelTokenSource,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponseHeaders
} from "axios"
import { exitLogin, storage } from "@utils/index"

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  cancelToken?: CancelTokenSource["token"]
  headers: AxiosRequestHeaders
  data?: any
}

// 统一定义一下 axios 返回类型
export interface AxiosResponse<T = any, D = any> {
  data: T
  code?: number
  message?: string
  success?: boolean
  value?: object
  status: number
  statusText: string
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  config: InternalAxiosRequestConfig<D>
  request?: any
}

declare global {
  interface Window {
    $message?: {
      destroy: () => void
      error: (options: { content: string; duration: number; onClose: () => void }) => void
    }
  }
}
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "/",
  timeout: 30000
})

// 用于存储 pending 的请求（处理多条相同请求）
const pendingRequest = new Map<string, CancelTokenSource>()

// 生成 request 的唯一 key
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&")
}

// 将重复请求添加到 pendingRequest 中
const addPendingRequest = (config: ExtendedAxiosRequestConfig): void => {
  const key = generateRequestKey(config)
  if (!pendingRequest.has(key)) {
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    pendingRequest.set(key, source)
  }
}

// 取消重复请求
const removePendingRequest = (config: AxiosRequestConfig): void => {
  const key = generateRequestKey(config)
  if (pendingRequest.has(key)) {
    const source = pendingRequest.get(key)
    if (source) source.cancel(key) // 取消之前发送的请求
    pendingRequest.delete(key) // 请求对象中删除 requestKey
  }
}

instance.interceptors.request.use(
  config => {
    const extendedConfig = config as ExtendedAxiosRequestConfig
    removePendingRequest(extendedConfig)
    addPendingRequest(extendedConfig)

    const TOKEN = storage.get("token")
    if (TOKEN) {
      extendedConfig.headers = extendedConfig.headers || {}
      extendedConfig.headers["Content-Type"] = extendedConfig.headers["Content-Type"] || "text/plain"
      extendedConfig.headers.Authorization = TOKEN
    }

    return extendedConfig
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在一个 ajax 响应后再执行一下取消操作，把已经完成的请求从 pending 中移除
    removePendingRequest(response.config)
    if (response.status === 401) {
      exitLogin()
    }
    return response.data
  },
  error => {
    const { status } = error?.response || {}
    if (status === 500) {
      window.$message?.destroy()
      console.error(status)
    } else if (status === 401) {
      exitLogin()
    }
    return Promise.reject(error)
  }
)

export default instance
