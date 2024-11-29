// 缺省组件 props 类型
export interface EmptyProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  // 额外样式
  style?: { [key: string]: string }
}

export interface ToastProps {
  children: React.ReactNode
  boxStyle?: { [key: string]: string }
  maskVisible?: boolean
  close: () => void
  maskClosable?: boolean
}

export interface AlertProps {
  content: string // 文字内容
  iconVisible?: boolean // 是否展示图标
  customIcon?: string // 自定义图标 src
  duration?: number // alert存在时间 默认3000毫秒
}
