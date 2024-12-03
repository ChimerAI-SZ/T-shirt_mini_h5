import { ColorOption } from "../../types"
import { colorOptions } from "../../constants"
import styles from "./styles.module.css"

interface ColorOptionsProps {
  selectedColor: ColorOption | null
  onColorSelect: (color: ColorOption) => void
}

export function ColorOptions({ selectedColor, onColorSelect }: ColorOptionsProps) {
  return (
    <div className={styles.optionsScroll}>
      {colorOptions.map(color => (
        <div
          key={color.id}
          className={`${styles.optionCard} ${selectedColor?.id === color.id ? styles.selected : ""}`}
          onClick={() => onColorSelect(color)}
        >
          <div className={styles.imageWrapper}>
            <img src={color.image} alt={color.name} className={styles.optionImage} />
          </div>
          <span className={`${styles.optionName} ${selectedColor?.id === color.id ? styles.selectedText : ""}`}>
            {color.name}
          </span>
        </div>
      ))}
    </div>
  )
}
