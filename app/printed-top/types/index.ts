export interface TabOption {
  id: string
  label: string
  image: string
}

export interface ModelOption {
  id: string
  image: string
  gender: "男性" | "女性"
}

export interface StyleOption {
  id: string
  name: string
  image: string
  status: "active" | "coming"
}

export interface ColorOption {
  id: string
  name: string
  hex: string
  image: string
}

export interface PrintPosition {
  x: number
  y: number
  scale?: number
  rotation: number
}

export interface PreviewAreaProps {
  selectedStyle: StyleOption | null
  selectedColor: ColorOption | null
}
