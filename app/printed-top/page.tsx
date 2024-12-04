"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import styles from "./page.module.css"
import { PreviewArea } from "./components/PreviewArea"
import { TabNavigation } from "./components/TabNavigation"
import { TabContent } from "./components/TabContent"
import { BackgroundToggle } from "./components/BackgroundToggle"
import { PrintPosition, StyleOption, ColorOption, ModelOption } from "./types"
import { styleOptions, colorOptions, tabs, maleImages, femaleImages, modelOptions } from "./constants"
import { getPrintedPreview } from "./api"

export default function PrintedTopPage() {
  const searchParams = useSearchParams()
  const printImage = `/api/proxy?url=${encodeURIComponent(searchParams.get("printImage") || "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/Asset%205%404x.png")}`
  const print =
    searchParams.get("printImage") || "https://ch-testing.oss-cn-beijing.aliyuncs.com/test_image/Asset%205%404x.png"

  const [activeTab, setActiveTab] = useState("style")
  const [removeBackground, setRemoveBackground] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(styleOptions[0])
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colorOptions[0])
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(modelOptions[0])
  const [mounted, setMounted] = useState(false)
  const [printPosition, setPrintPosition] = useState<PrintPosition>({
    x: 800,
    y: 870,
    scale: undefined,
    rotation: 0
  })
  const [originalImage, setOriginalImage] = useState<string>("")

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleModelSelect = (model: ModelOption) => {
    setSelectedModel(model)
    const images = model.gender === "男性" ? maleImages : femaleImages
    const randomIndex = Math.floor(Math.random() * images.length)
    setOriginalImage(images[randomIndex])
  }

  useEffect(() => {
    if (selectedModel) {
      const images = selectedModel.gender === "男性" ? maleImages : femaleImages
      const randomIndex = Math.floor(Math.random() * images.length)
      setOriginalImage(images[randomIndex])
    }
  }, [])

  const handlePreviewClick = async () => {
    try {
      const params = {
        loadOriginalImage: originalImage,
        loadGarmentImage: selectedColor?.image || "",
        loadPrintingImage: print,
        printingX: printPosition.x,
        printingY: printPosition.y,
        printingScale: printPosition.scale || 1,
        printingRotate: printPosition.rotation,
        removePrintingBackground: removeBackground,
        userUUID: "string"
      }
      console.log("接口params", params)
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
          onModelSelect={handleModelSelect}
        />
      </div>

      <div className={styles.bottomButton}>
        <button className={styles.previewButton} onClick={handlePreviewClick} disabled={!selectedColor}>
          上身效果
        </button>
      </div>
    </div>
  )
}
