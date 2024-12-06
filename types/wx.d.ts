interface WxNavigateToOptions {
  url: string
  success?: () => void
  fail?: (err: { errMsg?: string }) => void
}

interface WxMiniProgram {
  navigateTo: (options: WxNavigateToOptions) => void
  navigateBack: (options?: { delta?: number }) => void
  switchTab: (options: { url: string }) => void
  reLaunch: (options: { url: string }) => void
  redirectTo: (options: { url: string }) => void
  postMessage: (data: any) => void
  getEnv: (callback: (res: { miniprogram: boolean }) => void) => void
}

interface Wx {
  miniProgram?: WxMiniProgram
}

declare global {
  interface Window {
    wx?: Wx
  }
  const wx: Wx
}

export {}
