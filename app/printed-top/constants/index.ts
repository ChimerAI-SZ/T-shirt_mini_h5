import { TabOption, StyleOption, ColorOption, ModelOption } from "../types"

export const tabs: TabOption[] = [
  { id: "style", label: "款式" },
  { id: "color", label: "颜色" },
  { id: "model", label: "模特" }
]

export const styleOptions: StyleOption[] = [
  { id: "tshirt", name: "圆领T恤", image: "/images/tshirt-template.png", status: "active" },
  { id: "hoodie", name: "连帽卫衣", image: "/images/hoodie-template.png", status: "coming" },
  { id: "polo", name: "POLO衫", image: "/images/polo-template.png", status: "coming" }
]

export const colorOptions: ColorOption[] = [
  { id: "white", name: "白色", hex: "#FFFFFF" },
  { id: "black", name: "黑色", hex: "#000000" },
  { id: "gray", name: "灰色", hex: "#808080" },
  { id: "navy", name: "藏青", hex: "#000080" }
]

export const modelOptions: ModelOption[] = [
  { id: "male1", image: "/images/models/male1.png", gender: "男生" },
  { id: "female1", image: "/images/models/female1.png", gender: "女生" }
]

// ... 其他常量
