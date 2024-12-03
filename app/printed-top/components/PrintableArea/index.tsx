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

interface PrintableAreaProps {
  previewImage: string
  defaultPrint: string
  onPositionChange?: (position: { x: number; y: number; scale: number; rotation: number }) => void
  initialPosition?: { x: number; y: number; scale: number; rotation: number }
}

export function PrintableArea({ previewImage, defaultPrint, onPositionChange, initialPosition }: PrintableAreaProps) {
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
    const initCanvas = () => {
      if (!canvasRef.current || fabricRef.current) return

      // 获取可编辑区域的实际尺寸
      const editableArea = document.querySelector(`.${styles.editableArea}`)
      if (!editableArea) {
        // 如果还没有准备好，稍后重试
        setTimeout(initCanvas, 100)
        return
      }

      const editableRect = editableArea.getBoundingClientRect()
      const canvasWidth = editableRect.width || 300
      const canvasHeight = editableRect.height || 200 // 根据实际比例调整

      // 创建画布 - 只用于印花编辑
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight, // 使用实际高度
        selection: false,
        preserveObjectStacking: true,
        backgroundColor: "transparent"
      })
      fabricRef.current = canvas

      // 加载印花图片
      fabric.Image.fromURL(
        defaultPrint,
        (img: fabric.Image) => {
          // 使用 initialPosition 设置初始位置
          const scale = initialPosition?.scale || 0.655

          img.set({
            left: initialPosition?.x || 800,
            top: initialPosition?.y || 870,
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
            angle: initialPosition?.rotation || 0,
            minScaleLimit: 0.1,
            lockScalingFlip: true,
            lockUniScaling: true
          })

          // 限制移动范围和设置控制点
          img.setControlsVisibility({
            mtr: true, // 旋转控制点
            ml: false, // 禁用左中控制点
            mr: false, // 禁用右中控制点
            mt: false, // 禁用上中控制点
            mb: false, // 禁用下中控制点
            tl: true, // 启用左上角控制点
            tr: true, // 启用右上角控制点
            bl: true, // 启用左下角控制点
            br: true // 启用右下角控制点
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
              right: canvasWidth,
              bottom: canvasHeight
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
              obj.set("left", obj.left! + (editableArea.left - imgBounds.left))
            }
            if (imgBounds.right > editableArea.right) {
              obj.set("left", obj.left! - (imgBounds.right - editableArea.right))
            }
            if (imgBounds.top < editableArea.top) {
              obj.set("top", obj.top! + (editableArea.top - imgBounds.top))
            }
            if (imgBounds.bottom > editableArea.bottom) {
              obj.set("top", obj.top! - (imgBounds.bottom - editableArea.bottom))
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
            const maxScale = Math.min(canvasWidth / obj.width!, canvasHeight / obj.height!)
            if (obj.scaleX! > maxScale) {
              obj.set({
                scaleX: maxScale,
                scaleY: maxScale
              })
            }

            // 限制最小尺寸
            if (obj.scaleX! < 0.1) {
              obj.set({
                scaleX: 0.1,
                scaleY: 0.1
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
            } else if (center.x + halfWidth > canvasWidth) {
              newLeft = canvasWidth - halfWidth
            }

            // 检查并调整垂直位置
            if (center.y - halfHeight < 0) {
              newTop = halfHeight
            } else if (center.y + halfHeight > canvasHeight) {
              newTop = canvasHeight - halfHeight
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

            const newPosition = {
              x: img.left,
              y: img.top,
              scale: img.scaleX || 1,
              rotation: img.angle || 0
            }

            onPositionChange?.(newPosition)
          })

          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.renderAll() // 确保渲染
        },
        { crossOrigin: "anonymous" }
      )

      // 监听窗口大小变化
      const handleResize = () => {
        const container = document.querySelector(`.${styles.previewContainer}`)
        if (!container) return

        const rect = container.getBoundingClientRect()
        const scale = Math.min(rect.width / 750, rect.height / 750)

        // 设置缩放比例
        const wrapper = document.querySelector(`.${styles.imageWrapper}`) as HTMLElement
        if (wrapper) {
          wrapper.style.setProperty("--container-scale", scale.toString())
        }
      }

      window.addEventListener("resize", handleResize)
      handleResize() // 初始化时调用一次

      return () => window.removeEventListener("resize", handleResize)
    }

    // 使用 setTimeout 而不是 requestAnimationFrame
    setTimeout(initCanvas, 100)

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose()
        fabricRef.current = null
      }
    }
  }, [defaultPrint, onPositionChange, initialPosition])

  return (
    <div className={styles.printableArea}>
      <div className={styles.previewContainer}>
        <div className={styles.imageWrapper}>
          <img src={previewImage} alt="Preview" className={styles.previewImage} />
          <div className={styles.editableArea}>
            <div className={styles.canvasContainer}>
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
