export interface TabOption {
  id: string
  label: string
  image: string
}

export interface ModelOption {
  id: string
  image: string
  gender: "男生" | "女生"
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
  width: number
  height: number
  scale: number
}

export interface PreviewAreaProps {
  selectedStyle: StyleOption | null
  selectedColor: ColorOption | null
}
