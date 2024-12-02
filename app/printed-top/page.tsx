"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"
import { PreviewArea } from "./components/PreviewArea"
import { TabNavigation } from "./components/TabNavigation"
import { TabContent } from "./components/TabContent"
import { PrintPosition, StyleOption, ColorOption, ModelOption } from "./types"
import { styleOptions, colorOptions, tabs } from "./constants"

export default function PrintedTopPage() {
  const [activeTab, setActiveTab] = useState("style")
  const [removeBackground, setRemoveBackground] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(styleOptions[0])
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colorOptions[0])
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className={styles.container}>
      <PreviewArea
        selectedStyle={selectedStyle}
        removeBackground={removeBackground}
        setRemoveBackground={setRemoveBackground}
      />

      <div className={styles.tabsContainer}>
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
    </div>
  )
}
