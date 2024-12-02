'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import styles from './page.module.css'
import 'react-resizable/css/styles.css'
import './resizable.css'

interface TabOption {
    id: string
    label: string
}

const tabs: TabOption[] = [
    { id: 'style', label: '款式' },
    { id: 'color', label: '颜色' },
    { id: 'model', label: '模特' }
]

interface ModelOption {
    id: string
    image: string
    gender: '男生' | '女生'
}

const modelOptions: ModelOption[] = [
    { id: 'male1', image: '/images/models/male1.png', gender: '男生' },
    { id: 'female1', image: '/images/models/female1.png', gender: '女生' },
    // 添加更多模特选项...
]

interface StyleOption {
    id: string
    name: string
    image: string
    status: 'active' | 'coming'
}

interface ColorOption {
    id: string
    name: string
    hex: string
}

const styleOptions: StyleOption[] = [
    { id: 'tshirt', name: '圆领T恤', image: '/images/tshirt-template.png', status: 'active' },
    { id: 'hoodie', name: '连帽卫衣', image: '/images/hoodie-template.png', status: 'coming' },
    { id: 'polo', name: 'POLO衫', image: '/images/polo-template.png', status: 'coming' },
]

const colorOptions: ColorOption[] = [
    { id: 'white', name: '白色', hex: '#FFFFFF' },
    { id: 'black', name: '黑色', hex: '#000000' },
    { id: 'gray', name: '灰色', hex: '#808080' },
    { id: 'navy', name: '藏青', hex: '#000080' },
]

interface PrintPosition {
    x: number
    y: number
    width: number
    height: number
    scale: number
}

export default function PrintedTopPage() {
    const [activeTab, setActiveTab] = useState('style')
    const [removeBackground, setRemoveBackground] = useState(false)
    const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(styleOptions[0])
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colorOptions[0])
    const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [moveableKey, setMoveableKey] = useState(0)
    const printRef = useRef<HTMLDivElement>(null)
    const printAreaRef = useRef<HTMLDivElement>(null)
    const dragRef = useRef<HTMLDivElement>(null)

    const [printPosition, setPrintPosition] = useState<PrintPosition>({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        scale: 1
    })

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        // 等待组件挂载和图片加载
        const initializePosition = () => {
            if (printAreaRef.current) {
                const area = printAreaRef.current.getBoundingClientRect()
                console.log('Area dimensions:', area)

                // 确保区域有有效尺寸
                if (area.width === 0 || area.height === 0) {
                    console.log('Area dimensions are zero, retrying...')
                    requestAnimationFrame(initializePosition)
                    return
                }

                const defaultSize = Math.min(area.width, area.height) * 0.3
                console.log('Default size:', defaultSize)

                const newPosition = {
                    width: defaultSize,
                    height: defaultSize,
                    x: (area.width * 0.8 - defaultSize) / 2,
                    y: (area.height * 0.6 - defaultSize) / 2,
                    scale: 1
                }
                console.log('New position:', newPosition)

                setPrintPosition(newPosition)
                setIsReady(true)
                console.log('Component initialized')
            }
        }

        // 使用 requestAnimationFrame 确保 DOM 已更新
        requestAnimationFrame(initializePosition)

        return () => {
            setIsReady(false)
        }
    }, [mounted]) // 添加 mounted 作为依赖项

    const handleDrag = (e: any, data: any) => {
        setPrintPosition(prev => ({
            ...prev,
            x: data.x,
            y: data.y
        }))
    }

    const handleResize = (e: any, { size }: any) => {
        setPrintPosition(prev => ({
            ...prev,
            width: size.width,
            height: size.height
        }))
    }

    // 添加一个函数来计算最大约束
    const getMaxConstraints = () => {
        const area = printAreaRef.current?.getBoundingClientRect()
        if (!area) return [500, 500]
        return [
            area.width * 0.8,
            area.height * 0.6
        ]
    }

    if (!mounted) return null;

    return (
        <div className={styles.container}>
            <div className={styles.previewArea}>
                <div className={styles.editArea} ref={printAreaRef}>
                    <Image
                        src={selectedStyle?.image || ''}
                        alt="Preview"
                        width={800}
                        height={800}
                        className={styles.mainPreview}
                        priority
                    />

                    {/* 添加虚线编辑区域 */}
                    <div className={styles.printableArea}>
                        {isReady ? (
                            <Draggable
                                nodeRef={dragRef}
                                position={{ x: printPosition.x, y: printPosition.y }}
                                onDrag={handleDrag}
                                bounds="parent"
                            >
                                <div
                                    ref={dragRef}
                                    className={styles.dragWrapper}
                                >
                                    <ResizableBox
                                        width={printPosition.width}
                                        height={printPosition.height}
                                        onResize={handleResize}
                                        minConstraints={[50, 50]}
                                        maxConstraints={getMaxConstraints()}
                                        resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
                                    >
                                        <div
                                            className={styles.printPreview}
                                        >
                                            <Image
                                                src="/images/default-print.jpeg"
                                                alt="Print preview"
                                                fill
                                                style={{
                                                    objectFit: 'contain',
                                                    pointerEvents: 'none',
                                                    border: '2px solid white'
                                                }}
                                                priority
                                                onError={(e) => {
                                                    console.error('Image load error:', e)
                                                    console.error('Image path:', '/images/default-print.jpeg')
                                                }}
                                                onLoad={() => {
                                                    console.log('Image loaded successfully')
                                                    console.log('Image dimensions:', {
                                                        width: printPosition.width,
                                                        height: printPosition.height
                                                    })
                                                }}
                                            />
                                        </div>
                                    </ResizableBox>
                                </div>
                            </Draggable>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>

                {/* 背景移除开关 */}
                <div className={styles.toggleContainer}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={removeBackground}
                            onChange={(e) => setRemoveBackground(e.target.checked)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <span className={styles.toggleLabel}>去除插画背景</span>
                </div>
            </div>

            {/* 标签页导航 */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabList}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 标签页内容 */}
                <div className={styles.tabContent}>
                    {activeTab === 'style' && (
                        <div className={styles.optionsScroll}>
                            {styleOptions.map((style) => (
                                <div
                                    key={style.id}
                                    className={`${styles.optionCard} 
                                        ${selectedStyle?.id === style.id ? styles.selected : ''} 
                                        ${style.status === 'coming' ? styles.comingSoon : ''}`}
                                    onClick={() => style.status === 'active' && setSelectedStyle(style)}
                                >
                                    {style.status === 'coming' && (
                                        <div className={styles.comingSoonBadge}>待上线</div>
                                    )}
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={style.image}
                                            alt={style.name}
                                            width={120}
                                            height={120}
                                            className={styles.optionImage}
                                        />
                                    </div>
                                    <span className={styles.optionName}>{style.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'color' && (
                        <div className={styles.optionsScroll}>
                            {colorOptions.map((color) => (
                                <div
                                    key={color.id}
                                    className={`${styles.optionCard} ${selectedColor?.id === color.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    <Image
                                        src={`/images/styles/${selectedStyle?.id}-${color.id}.png`}
                                        alt={color.name}
                                        width={120}
                                        height={120}
                                        className={styles.optionImage}
                                    />
                                    <span className={styles.optionName}>{color.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'model' && (
                        <div className={styles.optionsScroll}>
                            {modelOptions.map((model) => (
                                <div
                                    key={model.id}
                                    className={`${styles.optionCard} ${selectedModel?.id === model.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedModel(model)}
                                >
                                    <Image
                                        src={model.image}
                                        alt={model.gender}
                                        width={120}
                                        height={120}
                                        className={styles.optionImage}
                                    />
                                    <span className={styles.optionName}>{model.gender}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
