"use client"

import { useRef, useEffect, useState } from "react"
import styles from "./styles.module.css"
import { StyleOption, ColorOption } from "../../types"
import { PrintableArea } from "../PrintableArea"

interface PreviewAreaProps {
  selectedStyle: StyleOption | null
  selectedColor: ColorOption | null
  removeBackground: boolean
  onPositionChange?: (position: { x: number; y: number; scale: number; rotation: number }) => void
}

export function PreviewArea({ selectedStyle, selectedColor, removeBackground, onPositionChange }: PreviewAreaProps) {
  const [printPosition, setPrintPosition] = useState({
    x: 800,
    y: 870,
    scale: 0.655,
    rotation: 0
  })

  const handlePrintPositionChange = (newPosition: typeof printPosition) => {
    setPrintPosition(newPosition)
    onPositionChange?.(newPosition)
  }

  return (
    <div className={styles.previewArea}>
      <PrintableArea
        previewImage={selectedColor?.image || "/images/test.png"}
        defaultPrint="/images/default-print.jpeg"
        onPositionChange={handlePrintPositionChange}
        initialPosition={printPosition}
      />
    </div>
  )
}
