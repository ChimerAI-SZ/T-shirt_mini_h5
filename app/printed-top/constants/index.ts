import { TabOption, StyleOption, ColorOption, ModelOption } from "../types"

export const tabs: TabOption[] = [
  { id: "style", label: "款式", image: "/images/tab-style.png" },
  { id: "color", label: "颜色", image: "/images/tab-color.png" },
  { id: "model", label: "模特", image: "/images/tab-model.png" }
]

export const styleOptions: StyleOption[] = [
  { id: "tshirt", name: "圆领T恤", image: "/images/round-collar.png", status: "active" },
  { id: "hoodie", name: "连帽卫衣", image: "/images/hoodie.png", status: "coming" },
  { id: "polo", name: "POLO衫", image: "/images/polo.png", status: "coming" }
]

export const colorOptions: ColorOption[] = [
  {
    id: "anyehui",
    name: "暗夜灰",
    hex: "#666666",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_anyehui.jpg"
  },
  { id: "bai", name: "白色", hex: "#FFFFFF", image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_bai.jpg" },
  { id: "hei", name: "黑色", hex: "#000000", image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_hei.jpg" },
  {
    id: "jianghuang",
    name: "姜黄",
    hex: "#FFA500",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_jianghuang.jpg"
  },
  {
    id: "kaqi",
    name: "卡其",
    hex: "#808000",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_kaqi.jpg"
  },
  {
    id: "kelaiyinlan",
    name: "卡莱茵蓝",
    hex: "#0000FF",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_kelaiyinlan.jpg"
  },
  {
    id: "mahui",
    name: "麻灰",
    hex: "#808080",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_mahui.jpg"
  },
  {
    id: "muguacheng",
    name: "木瓜橙",
    hex: "#FFA500",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_muguacheng.jpg"
  },
  {
    id: "qianfen",
    name: "浅粉",
    hex: "#FFC0CB",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_qianfen.jpg"
  },
  {
    id: "wumailan",
    name: "乌麦兰",
    hex: "#808080",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_wumailan.jpg"
  },
  {
    id: "zangqing",
    name: "藏青",
    hex: "#000080",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_zangqing.jpg"
  },
  {
    id: "zhongguohong",
    name: "中国红",
    hex: "#FF0000",
    image: "https://brain-testing.oss-cn-beijing.aliyuncs.com/img/s_zhongguohong.jpg"
  }
]

export const modelOptions: ModelOption[] = [
  { id: "male1", image: "/images/boy.svg", gender: "男性" },
  { id: "female1", image: "/images/girl.svg", gender: "女性" }
]

export const femaleImages = [
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/Chimer_00001436.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/Chimer_00001437.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/Chimer_00001452.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00055_.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00059_.png"
]

export const maleImages = [
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00063_.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00070_.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00073_.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00076_.png",
  "https://brain-testing.oss-cn-beijing.aliyuncs.com/ComfyUI_00085_.png"
]
