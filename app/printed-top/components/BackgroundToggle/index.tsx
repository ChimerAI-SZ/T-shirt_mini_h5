"use client"

import styles from "./styles.module.css"

interface BackgroundToggleProps {
  removeBackground: boolean
  setRemoveBackground: (value: boolean) => void
}

export function BackgroundToggle({ removeBackground, setRemoveBackground }: BackgroundToggleProps) {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={removeBackground} onChange={e => setRemoveBackground(e.target.checked)} />
        <span className={styles.slider} />
      </label>
      <span className={styles.toggleLabel}>去除插画背景</span>
    </div>
  )
}
