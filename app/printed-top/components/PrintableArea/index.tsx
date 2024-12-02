"use client"

import { useRef, useState, useEffect } from "react"
import { fabric } from "fabric"
import type { IEvent, Image } from "fabric/fabric-impl"
import styles from "./styles.module.css"

interface PrintPosition {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scale: number
}

interface FabricEvent extends IEvent {
  target: fabric.Image
}

export function PrintableArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const [printPosition, setPrintPosition] = useState<PrintPosition>({
    x: 300,
    y: 300,
    width: 600,
    height: 600,
    rotation: 0,
    scale: 1
  })

  useEffect(() => {
    if (!canvasRef.current || fabricRef.current) return

    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: 750,
      height: 750,
      selection: false,
      preserveObjectStacking: true
    })

    // 添加预览图作为背景
    fabric.Image.fromURL(
      "/images/test.png",
      (img: fabric.Image) => {
        img.set({
          left: 0,
          top: 0,
          width: 1600,
          height: 1600,
          selectable: false,
          evented: false,
          scaleX: 1,
          scaleY: 1
        })
        fabricRef.current?.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current))
      },
      { crossOrigin: "anonymous" }
    )

    // 添加背景区域
    const backgroundArea = new fabric.Rect({
      left: 0,
      top: 0,
      width: 600,
      height: 600,
      fill: "rgba(240, 240, 240, 0.1)",
      stroke: "transparent",
      selectable: false,
      evented: false,
      rx: 8,
      ry: 8
    })

    // 添加可编辑区域边框
    const editableArea = new fabric.Rect({
      left: 0,
      top: 0,
      width: 300,
      height: 300,
      fill: "transparent",
      stroke: "#666",
      strokeWidth: 2,
      strokeDashArray: [8, 8],
      selectable: false,
      evented: false,
      rx: 8,
      ry: 8
    })

    fabricRef.current.add(backgroundArea)
    fabricRef.current.add(editableArea)

    // 加载印花图片
    fabric.Image.fromURL(
      "/images/default-print.jpeg",
      (img: fabric.Image) => {
        // 设置初始大小，确保不超过可编辑区域
        const maxSize = 400
        const scale = Math.min(maxSize / img.width!, maxSize / img.height!)

        img.set({
          left: 300,
          top: 300,
          originX: "center",
          originY: "center",
          centeredScaling: true,
          cornerStyle: "circle",
          cornerSize: 6,
          cornerColor: "#666",
          cornerStrokeColor: "#fff",
          transparentCorners: false,
          padding: 0,
          borderColor: "#666",
          borderScaleFactor: 1,
          scaleX: scale,
          scaleY: scale,
          minScaleLimit: 0.2,
          lockScalingFlip: true
        })

        // 限制移动范围
        img.setControlsVisibility({
          mtr: true,
          ml: true,
          mr: true,
          mt: true,
          mb: true,
          tl: false,
          tr: false,
          bl: false,
          br: false
        })

        // 监听移动事件
        img.on("moving", (opt: IEvent<MouseEvent>) => {
          const obj = opt.target as fabric.Image
          if (!obj) return

          // 获取图片的实际尺寸和中心点
          const width = obj.getScaledWidth()
          const height = obj.getScaledHeight()
          const center = obj.getCenterPoint()

          // 计算可编辑区域的边界
          const editableArea = {
            left: 0,
            top: 0,
            right: 600,
            bottom: 600
          }

          // 计算图片的边界
          const imgBounds = {
            left: center.x - width / 2,
            right: center.x + width / 2,
            top: center.y - height / 2,
            bottom: center.y + height / 2
          }

          // 调整位置以确保图片在可编辑区域内
          if (imgBounds.left < editableArea.left) {
            obj.set('left', obj.left! + (editableArea.left - imgBounds.left))
          }
          if (imgBounds.right > editableArea.right) {
            obj.set('left', obj.left! - (imgBounds.right - editableArea.right))
          }
          if (imgBounds.top < editableArea.top) {
            obj.set('top', obj.top! + (editableArea.top - imgBounds.top))
          }
          if (imgBounds.bottom > editableArea.bottom) {
            obj.set('top', obj.top! - (imgBounds.bottom - editableArea.bottom))
          }

          obj.setCoords()
        })

        // 监听缩放事件
        img.on("scaling", (opt: IEvent<MouseEvent>) => {
          const obj = opt.target as fabric.Image
          if (!obj) return

          // 获取当前尺寸
          const width = obj.getScaledWidth()
          const height = obj.getScaledHeight()

          // 限制最大尺寸（不超过可编辑区域）
          const maxScale = Math.min(600 / obj.width!, 600 / obj.height!)
          if (obj.scaleX! > maxScale) {
            obj.set({
              scaleX: maxScale,
              scaleY: maxScale
            })
          }

          // 限制最小尺寸
          if (obj.scaleX! < 0.2) {
            obj.set({
              scaleX: 0.2,
              scaleY: 0.2
            })
          }

          // 确保缩放后图片仍在可编辑区域内
          const center = obj.getCenterPoint()
          const halfWidth = width / 2
          const halfHeight = height / 2

          // 计算新的位置，确保图片不会超出边界
          let newLeft = obj.left!
          let newTop = obj.top!

          // 检查并调整水平位置
          if (center.x - halfWidth < 0) {
            newLeft = halfWidth
          } else if (center.x + halfWidth > 600) {
            newLeft = 600 - halfWidth
          }

          // 检查并调整垂直位置
          if (center.y - halfHeight < 0) {
            newTop = halfHeight
          } else if (center.y + halfHeight > 600) {
            newTop = 600 - halfHeight
          }

          // 更新位置
          if (newLeft !== obj.left! || newTop !== obj.top!) {
            obj.set({
              left: newLeft,
              top: newTop
            })
          }

          obj.setCoords()
        })

        // 监听旋转事件
        img.on("rotating", (opt: IEvent<MouseEvent>) => {
          const obj = opt.target as fabric.Image
          if (!obj) return

          // 将角度限制在 0-360 度之间
          let angle = obj.angle! % 360
          if (angle < 0) angle += 360
          obj.set({ angle })
        })

        // 监听对象修改事件
        img.on("modified", () => {
          if (!img.left || !img.top) return
          setPrintPosition({
            x: img.left,
            y: img.top,
            width: img.getScaledWidth(),
            height: img.getScaledHeight(),
            rotation: img.angle || 0,
            scale: img.scaleX || 1
          })
        })

        fabricRef.current?.add(img)
        fabricRef.current?.setActiveObject(img)
      },
      { crossOrigin: "anonymous" }
    )

    return () => {
      fabricRef.current?.dispose()
      fabricRef.current = null
    }
  }, [])

  // 监听画布尺寸变化
  useEffect(() => {
    const handleResize = () => {
      if (!fabricRef.current) return
      const canvas = fabricRef.current
      const container = canvas.getElement().parentElement?.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scale = Math.min(
        (rect.width * 0.8) / 600,
        (rect.height * 0.8) / 600
      )

      // 重置画布尺寸和缩放
      canvas.setWidth(600)
      canvas.setHeight(600)
      canvas.setZoom(scale)

      // 更新画布容器样式
      const canvasContainer = canvas.getElement().parentElement
      if (canvasContainer) {
        canvasContainer.style.width = '600px'
        canvasContainer.style.height = '600px'
        canvasContainer.style.position = 'absolute'
        canvasContainer.style.left = '50%'
        canvasContainer.style.top = '50%'
        canvasContainer.style.transform = `translate(-50%, -50%)`
      }

      // 更新画布元素样式
      const canvasElement = canvas.getElement()
      canvasElement.style.width = '100%'
      canvasElement.style.height = '100%'
      canvasElement.style.position = 'absolute'
      canvasElement.style.left = '0'
      canvasElement.style.top = '0'
      canvasElement.style.transform = 'none'

      // 确保事件处理正确
      canvas.calcOffset()
      canvas.requestRenderAll()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={styles.printableArea}>
      <div className={styles.info}>
        <div>
          中心坐标: X={printPosition.x.toFixed(0)}, Y={printPosition.y.toFixed(0)}
        </div>
        <div>缩放: {(printPosition.scale * 100).toFixed(0)}%</div>
        <div>旋转: {printPosition.rotation.toFixed(0)}°</div>
      </div>
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
