"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"
import { PreviewArea } from "./components/PreviewArea"
import { TabNavigation } from "./components/TabNavigation"
import { TabContent } from "./components/TabContent"
import { BackgroundToggle } from "./components/BackgroundToggle"
import { PrintPosition, StyleOption, ColorOption, ModelOption } from "./types"
import { styleOptions, colorOptions, tabs } from "./constants"
import { getPrintedPreview } from "./api"

export default function PrintedTopPage() {
  const [activeTab, setActiveTab] = useState("style")
  const [removeBackground, setRemoveBackground] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(styleOptions[0])
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colorOptions[0])
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [mounted, setMounted] = useState(false)
  const [printPosition, setPrintPosition] = useState({
    x: 800,
    y: 870,
    scale: 0.655,
    rotation: 0
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handlePreviewClick = async () => {
    try {
      const params = {
        loadOriginalImage: "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/20241130-214432.jpg",
        loadGarmentImage: selectedColor?.image || "",
        loadPrintingImage: "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/Asset%205%404x.png",
        printingX: printPosition.x,
        printingY: printPosition.y,
        printingScale: printPosition.scale,
        printingRotate: printPosition.rotation,
        removePrintingBackground: removeBackground,
        userUUID: "string"
      }

      const result = await getPrintedPreview(params)
      console.log("Preview result:", result)
    } catch (error) {
      console.error("Failed to get preview:", error)
    }
  }

  if (!mounted) return null

  return (
    <div className={styles.container}>
      <PreviewArea
        selectedStyle={selectedStyle}
        selectedColor={selectedColor}
        removeBackground={removeBackground}
        onPositionChange={setPrintPosition}
      />

      <div className={styles.tabsContainer}>
        <BackgroundToggle removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />

        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <TabContent
          activeTab={activeTab}
          selectedStyle={selectedStyle}
          selectedColor={selectedColor}
          selectedModel={selectedModel}
          onStyleSelect={setSelectedStyle}
          onColorSelect={setSelectedColor}
          onModelSelect={setSelectedModel}
        />
      </div>

      <div className={styles.bottomButton}>
        <button className={styles.previewButton} onClick={handlePreviewClick} disabled={!selectedColor}>
          预览效果
        </button>
      </div>
    </div>
  )
}
