"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import styles from "./page.module.css"
import { PreviewArea } from "./components/PreviewArea"
import { TabNavigation } from "./components/TabNavigation"
import { TabContent } from "./components/TabContent"
import { BackgroundToggle } from "./components/BackgroundToggle"
import { PrintPosition, StyleOption, ColorOption, ModelOption } from "./types"
import { styleOptions, colorOptions, tabs, maleImages, femaleImages, modelOptions } from "./constants"
import { fetchPrintedTop, getQuery } from "@/lib/request/printed-top"
import { Alert } from "@/components/Alert"
import { Button } from "@/components/ui/button"

export default function PrintedTopPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const timestamp = searchParams.get("timestamp")
  const url = localStorage.getItem(`selectedImg_${timestamp}`) || ""
  const printImage = url
  const print = url
  const [image, setImage] = useState()
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
  const [taskId, setTaskId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isLoading) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
      setElapsedTime(0)
    }
  }, [isLoading])

  const handlePreviewClick = async () => {
    setIsLoading(true)
    router.push(`/upperDisplay?imageUrl=${encodeURIComponent(print)}`)
    // try {
    //   const params = {
    //     loadOriginalImage: originalImage,
    //     loadGarmentImage: selectedColor?.image || "",
    //     loadPrintingImage: print,
    //     printingX: printPosition.x,
    //     printingY: printPosition.y,
    //     printingScale: printPosition.scale || 1,
    //     printingRotate: printPosition.rotation,
    //     removePrintingBackground: removeBackground,
    //     userUUID: "string"
    //   }
    //   const result = await fetchPrintedTop(params)
    //   if (result?.data?.taskID) {
    //     setTaskId(result.data.taskID)
    //   } else {
    //     setIsLoading(false)
    //     Alert.open({
    //       content: "生成失败！"
    //     })
    //   }
    // } catch (error) {
    //   setIsLoading(false)
    //   console.error("Failed to get preview:", error)
    // }
  }
  const getImage = async (taskID: string) => {
    try {
      const resultData: any = await getQuery({ taskID })
      const { result, success, message } = resultData || {}

      if (success) {
        setImage(result.data.imageFiles[0].url)
        setTaskId("")
        setIsLoading(false)
        // router.push(`/upperDisplay?imageUrl=${encodeURIComponent(result.data.imageFiles[0].url)}`)
      } else {
        console.log(`Task ${taskID} still in progress`)
      }
    } catch (err) {
      setTaskId("")
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (taskId) {
        getImage(taskId)
      }
    }, 5000)
    return () => {
      console.log("Cleaning up interval")
      clearInterval(interval)
    }
  }, [taskId])

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
        <Button
          onClick={handlePreviewClick}
          disabled={!selectedColor || isLoading}
          w={"16.69rem"}
          bgColor={"#ee3939"}
          borderRadius={"1.25rem"}
          type="submit"
          loading={isLoading}
          loadingText={<span>{`上身中 ${elapsedTime}s...`}</span>}
        >
          上身效果
        </Button>
      </div>
    </div>
  )
}
