"use client"

import { useRef, useEffect, useState } from "react"
import styles from "./styles.module.css"
import { StyleOption, ColorOption, PrintPosition } from "../../types"
import { PrintableArea } from "../PrintableArea"

interface PreviewAreaProps {
  selectedStyle: StyleOption | null
  selectedColor: ColorOption | null
  removeBackground: boolean
  onPositionChange?: (position: PrintPosition) => void
  printImage?: string
}

export function PreviewArea({
  selectedStyle,
  selectedColor,
  removeBackground,
  onPositionChange,
  printImage
}: PreviewAreaProps) {
  const [printPosition, setPrintPosition] = useState<PrintPosition>({
    x: 800,
    y: 870,
    scale: undefined,
    rotation: 0
  })

  const handlePrintPositionChange = (newPosition: PrintPosition) => {
    setPrintPosition(newPosition)
    onPositionChange?.(newPosition)
  }

  return (
    <div className={styles.previewArea}>
      <PrintableArea
        previewImage={selectedColor?.image || "/images/test.png"}
        defaultPrint={printImage || "/images/default-print.jpeg"}
        onPositionChange={handlePrintPositionChange}
        initialPosition={printPosition}
      />
    </div>
  )
}
