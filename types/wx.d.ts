interface IMiniProgram {
  navigateTo: (options: { url: string }) => void
}

interface IWx {
  miniProgram: IMiniProgram
}

declare global {
  const wx: IWx
}

export {}
