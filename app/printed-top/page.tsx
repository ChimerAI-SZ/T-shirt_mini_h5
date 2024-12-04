"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import styles from "./page.module.css"
import { PreviewArea } from "./components/PreviewArea"
import { TabNavigation } from "./components/TabNavigation"
import { TabContent } from "./components/TabContent"
import { BackgroundToggle } from "./components/BackgroundToggle"
import { PrintPosition, StyleOption, ColorOption, ModelOption } from "./types"
import { styleOptions, colorOptions, tabs } from "./constants"
import { getPrintedPreview } from "./api"

export default function PrintedTopPage() {
  const searchParams = useSearchParams()
  const printImage = `/api/proxy?url=${encodeURIComponent(searchParams.get("printImage") || "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/Asset%205%404x.png")}`
  const [activeTab, setActiveTab] = useState("style")
  const [removeBackground, setRemoveBackground] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(styleOptions[0])
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colorOptions[0])
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [mounted, setMounted] = useState(false)
  const [printPosition, setPrintPosition] = useState<PrintPosition>({
    x: 800,
    y: 870,
    scale: undefined,
    rotation: 0
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  console.log(printPosition, removeBackground, printImage, selectedColor?.image)
  const handlePreviewClick = async () => {
    console.log("1111111", printPosition, removeBackground, printImage, selectedColor?.image)

    try {
      const params = {
        loadOriginalImage: "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/20241130-214432.jpg",
        loadGarmentImage: selectedColor?.image || "",
        loadPrintingImage: printImage,
        printingX: printPosition.x,
        printingY: printPosition.y,
        printingScale: printPosition.scale || 1,
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

  const handlePositionChange = (position: PrintPosition) => {
    setPrintPosition({
      x: position.x,
      y: position.y,
      scale: position.scale,
      rotation: position.rotation
    })
  }

  if (!mounted) return null

  return (
    <div className={styles.container}>
      <PreviewArea
        selectedStyle={selectedStyle}
        selectedColor={selectedColor}
        removeBackground={removeBackground}
        onPositionChange={handlePositionChange}
        printImage={printImage}
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
