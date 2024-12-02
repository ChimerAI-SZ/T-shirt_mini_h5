"use client"

import { useRef } from "react"
import Image from "next/image"
import styles from "./styles.module.css"
import { StyleOption } from "../../types"
import { BackgroundToggle } from "../BackgroundToggle"
import { PrintableArea } from "../PrintableArea"

interface PreviewAreaProps {
  selectedStyle: StyleOption | null
  removeBackground: boolean
  setRemoveBackground: (value: boolean) => void
}

export function PreviewArea({ selectedStyle, removeBackground, setRemoveBackground }: PreviewAreaProps) {
  return (
    <div className={styles.previewArea}>
          <PrintableArea />
      <BackgroundToggle removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
    </div>
  )
}
