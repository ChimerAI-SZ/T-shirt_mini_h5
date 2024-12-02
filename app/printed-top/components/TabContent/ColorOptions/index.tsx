import Image from "next/image"
import { ColorOption } from "../../../types"
import { colorOptions } from "../../../constants"
import styles from "../styles.module.css"

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
          <Image
            src={`/images/styles/tshirt-${color.id}.png`}
            alt={color.name}
            width={120}
            height={120}
            className={styles.optionImage}
          />
          <span className={styles.optionName}>{color.name}</span>
        </div>
      ))}
    </div>
  )
}
