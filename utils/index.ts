/**
 * storage 存储
 */
export const storage = {
  // 设置值为字符串
  set(name: string, value: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, value)
    }
  },
  // 设置值为对象
  setObj<T>(name: string, value: T): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(value))
    }
  },
  // 获取字符串值
  get(name: string): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(name)
    }
    return null
  },
  // 获取对象值
  getObj<T>(name: string): T | null {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(name)
      if (item) {
        try {
          return JSON.parse(item) as T
        } catch (error) {
          console.error("Failed to parse item from localStorage:", error)
          return null
        }
      }
    }
    return null
  },
  // 删除项
  remove(name: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name)
    }
  },
  // 清除所有项
  clear(): void {
    if (typeof window !== "undefined") {
      localStorage.clear()
    }
  }
}

/**
 * 退出登录
 */
export const exitLogin = () => {
  localStorage.clear()
  window.location.href = "/login?type=err"
}

/**
 * async 方法错误捕获
 * @param {type: Function, desc: 异步方法（必填） } asyncFunc
 * @param  {type: } data
 * @param  {type: bool, desc: 是否是自定义信息 } flag
 */
export const errorCaptureRes = async (asyncFunc: (arg0: any) => any, data?: any, flag = true) => {
  try {
    const res = await asyncFunc(data)
    if (!res.success) {
      return [{ message: res.message || "未获取到信息", code: res.code }, res]
    }
    return [null, res]
  } catch (e: any) {
    // 如果是接口取消的错误，直接返回 null
    if (e.code === "ERR_CANCELED") {
      return [null, null]
    }
    // 其他错误正常返回
    return [e, null]
  }
}

// debounce.ts

/**
 * 防抖函数：限制函数在连续触发时的执行频率
 * @param func 需要防抖的函数
 * @param delay 延迟时间，单位毫秒
 * @returns 返回一个防抖后的函数
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null // 存储定时器ID

  return function (...args: Parameters<T>) {
    // 清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      func(...args) // 执行传入的函数
    }, delay)
  }
}

// throttle.ts

/**
 * 节流函数：点击第一次立即生效，之后在设定的时间内（比如 2秒内）不会再执行操作
 * @param {Function} func 需要节流的函数
 * @param {number} delay 延迟时间，单位毫秒，设定间隔
 * @returns {Function} 返回一个节流后的函数
 */
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let isThrottle = false // 标记是否处于节流状态

  return function (...args: Parameters<T>) {
    if (isThrottle) return // 如果处于节流状态，直接返回，不执行

    func(...args) // 执行传入的函数
    isThrottle = true // 设置节流状态

    // 设置定时器，delay时间后恢复节流状态
    setTimeout(() => {
      isThrottle = false // 恢复为可点击状态
    }, delay)
  }
}
