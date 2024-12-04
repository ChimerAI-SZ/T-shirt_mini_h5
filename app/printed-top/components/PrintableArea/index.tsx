"use client"

import { useRef, useState, useEffect } from "react"
import { fabric } from "fabric"
import type { IEvent } from "fabric/fabric-impl"
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
  initialPosition?: {
    x: number
    y: number
    scale?: number
    rotation: number
  }
}

export function PrintableArea({ previewImage, defaultPrint, onPositionChange, initialPosition }: PrintableAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasRef.current || fabricRef.current) return

      const editableArea = document.querySelector(`.${styles.editableArea}`)
      if (!editableArea) {
        setTimeout(initCanvas, 100)
        return
      }

      const editableRect = editableArea.getBoundingClientRect()
      const canvasWidth = editableRect.width || 300
      const canvasHeight = editableRect.height || 200

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        selection: false,
        preserveObjectStacking: true,
        backgroundColor: "transparent"
      })
      fabricRef.current = canvas

      fabric.Image.fromURL(
        defaultPrint,
        (img: fabric.Image) => {
          // 计算合适的初始缩放比例
          const calculateInitialScale = () => {
            // 获取可编辑区域的尺寸
            const editableWidth = canvasWidth * 0.8 // 留出 20% 边距
            const editableHeight = canvasHeight * 0.8

            // 获取图片原始尺寸
            const imgWidth = img.width!
            const imgHeight = img.height!

            // 计算宽高比
            const imgRatio = imgWidth / imgHeight
            const editableRatio = editableWidth / editableHeight

            let scale
            if (imgRatio > editableRatio) {
              // 图片更宽，以宽度为准
              scale = editableWidth / imgWidth
              console.log("Using width as base, scale:", scale)
            } else {
              // 图片更高，以高度为准
              scale = editableHeight / imgHeight
            }
            // 限制缩放范围
            const finalScale = Math.min(Math.max(scale, 0.1), 2.0)
            // 通知父组件初始缩放值
            if (!initialPosition?.scale && onPositionChange) {
              onPositionChange({
                x: initialPosition?.x || canvasWidth / 2,
                y: initialPosition?.y || canvasHeight / 2,
                scale: finalScale,
                rotation: initialPosition?.rotation || 0
              })
            }

            return finalScale
          }

          const initialScale = initialPosition?.scale ?? calculateInitialScale()

          img.set({
            left: canvasWidth / 2,
            top: canvasHeight / 2,
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
            scaleX: initialScale,
            scaleY: initialScale,
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

          img.on("moving", (opt: IEvent<MouseEvent>) => {
            const obj = opt.target as fabric.Image
            if (!obj) return

            const width = obj.getScaledWidth()
            const height = obj.getScaledHeight()
            const center = obj.getCenterPoint()

            const editableArea = {
              left: 0,
              top: 0,
              right: canvasWidth,
              bottom: canvasHeight
            }

            const imgBounds = {
              left: center.x - width / 2,
              right: center.x + width / 2,
              top: center.y - height / 2,
              bottom: center.y + height / 2
            }

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

          img.on("scaling", (opt: IEvent<MouseEvent>) => {
            const obj = opt.target as fabric.Image
            if (!obj) return

            const width = obj.getScaledWidth()
            const height = obj.getScaledHeight()

            const maxScale = Math.min(canvasWidth / obj.width!, canvasHeight / obj.height!)
            if (obj.scaleX! > maxScale) {
              obj.set({
                scaleX: maxScale,
                scaleY: maxScale
              })
            }

            if (obj.scaleX! < 0.1) {
              obj.set({
                scaleX: 0.1,
                scaleY: 0.1
              })
            }

            const center = obj.getCenterPoint()
            const halfWidth = width / 2
            const halfHeight = height / 2

            let newLeft = obj.left!
            let newTop = obj.top!

            if (center.x - halfWidth < 0) {
              newLeft = halfWidth
            } else if (center.x + halfWidth > canvasWidth) {
              newLeft = canvasWidth - halfWidth
            }

            if (center.y - halfHeight < 0) {
              newTop = halfHeight
            } else if (center.y + halfHeight > canvasHeight) {
              newTop = canvasHeight - halfHeight
            }

            if (newLeft !== obj.left! || newTop !== obj.top!) {
              obj.set({
                left: newLeft,
                top: newTop
              })
            }

            obj.setCoords()
          })

          img.on("rotating", (opt: IEvent<MouseEvent>) => {
            const obj = opt.target as fabric.Image
            if (!obj) return

            let angle = obj.angle! % 360
            if (angle < 0) angle += 360
            obj.set({ angle })
          })

          img.on("modified", () => {
            if (!img.left || !img.top) return
            const newPosition = {
              x: img.left,
              y: img.top,
              scale: img.scaleX || 1,
              rotation: img.angle || 0
            }
            console.log("Modified position:", newPosition)
            onPositionChange?.(newPosition)
          })

          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.renderAll()
        },
        {
          crossOrigin: "anonymous"
          // 添加其他需要的选项
        } as fabric.IImageOptions
      )

      const handleResize = () => {
        const container = document.querySelector(`.${styles.previewContainer}`)
        if (!container) return

        const rect = container.getBoundingClientRect()
        const scale = Math.min(rect.width / 750, rect.height / 750)

        const wrapper = document.querySelector(`.${styles.imageWrapper}`) as HTMLElement
        if (wrapper) {
          wrapper.style.setProperty("--container-scale", scale.toString())
        }
      }

      window.addEventListener("resize", handleResize)
      handleResize()

      return () => {
        window.removeEventListener("resize", handleResize)
        if (fabricRef.current) {
          fabricRef.current.dispose()
          fabricRef.current = null
        }
      }
    }

    initCanvas()
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
