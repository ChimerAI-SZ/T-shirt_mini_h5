import Image from "next/image"
import { StyleOption } from "../../../types"
import { styleOptions } from "../../../constants"
import styles from "../styles.module.css"

interface StyleOptionsProps {
  selectedStyle: StyleOption | null
  onStyleSelect: (style: StyleOption) => void
}

export function StyleOptions({ selectedStyle, onStyleSelect }: StyleOptionsProps) {
  return (
    <div className={styles.optionsScroll}>
      {styleOptions.map(style => (
        <div
          key={style.id}
          className={`${styles.optionCard} 
            ${selectedStyle?.id === style.id ? styles.selected : ""} 
            ${style.status === "coming" ? styles.comingSoon : ""}`}
          onClick={() => style.status === "active" && onStyleSelect(style)}
        >
          {style.status === "coming" && <div className={styles.comingSoonBadge}>待上线</div>}
          <div className={styles.imageWrapper}>
            <Image src={style.image} alt={style.name} width={120} height={120} className={styles.optionImage} />
          </div>
          <span className={styles.optionName}>{style.name}</span>
        </div>
      ))}
    </div>
  )
}
