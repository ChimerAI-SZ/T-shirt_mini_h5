import { StyleOption, ColorOption, ModelOption } from "../../types"
import { StyleOptions } from "./StyleOptions"
import { ColorOptions } from "./ColorOptions"
import { ModelOptions } from "./ModelOptions"
import styles from "./styles.module.css"

interface TabContentProps {
  activeTab: string
  selectedStyle: StyleOption | null
  selectedColor: ColorOption | null
  selectedModel: ModelOption | null
  onStyleSelect: (style: StyleOption) => void
  onColorSelect: (color: ColorOption) => void
  onModelSelect: (model: ModelOption) => void
}

export function TabContent({
  activeTab,
  selectedStyle,
  selectedColor,
  selectedModel,
  onStyleSelect,
  onColorSelect,
  onModelSelect
}: TabContentProps) {
  return (
    <div className={styles.tabContent}>
      {activeTab === "style" && <StyleOptions selectedStyle={selectedStyle} onStyleSelect={onStyleSelect} />}
      {activeTab === "color" && <ColorOptions selectedColor={selectedColor} onColorSelect={onColorSelect} />}
      {activeTab === "model" && <ModelOptions selectedModel={selectedModel} onModelSelect={onModelSelect} />}
    </div>
  )
}
