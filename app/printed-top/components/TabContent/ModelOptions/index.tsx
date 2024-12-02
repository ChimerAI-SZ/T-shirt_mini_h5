import Image from "next/image"
import { ModelOption } from "../../../types"
import { modelOptions } from "../../../constants"
import styles from "../styles.module.css"

interface ModelOptionsProps {
  selectedModel: ModelOption | null
  onModelSelect: (model: ModelOption) => void
}

export function ModelOptions({ selectedModel, onModelSelect }: ModelOptionsProps) {
  return (
    <div className={styles.optionsScroll}>
      {modelOptions.map(model => (
        <div
          key={model.id}
          className={`${styles.optionCard} ${selectedModel?.id === model.id ? styles.selected : ""}`}
          onClick={() => onModelSelect(model)}
        >
          <Image src={model.image} alt={model.gender} width={120} height={120} className={styles.optionImage} />
          <span className={styles.optionName}>{model.gender}</span>
        </div>
      ))}
    </div>
  )
}
