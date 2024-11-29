"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Input, Text, IconButton } from "@chakra-ui/react"

export interface NumberInputProps {
  value: number | undefined
  onChange: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
  label?: string
}

export function NumberInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  placeholder,
  disabled,
  label
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "")
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setInputValue(value?.toString() ?? "")
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue === "") {
      onChange(undefined)
      return
    }

    const numValue = Number(newValue)
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue)
    }
  }

  const handleBlur = () => {
    if (inputValue === "") {
      onChange(undefined)
      return
    }

    const numValue = Number(inputValue)
    if (isNaN(numValue)) {
      setInputValue(value?.toString() ?? "")
    } else {
      const clampedValue = Math.min(Math.max(numValue, min), max)
      setInputValue(clampedValue.toString())
      onChange(clampedValue)
    }
  }

  const increment = () => {
    if (disabled) return
    const currentValue = value ?? 0
    if (currentValue < max) {
      const newValue = Math.min(currentValue + step, max)
      onChange(newValue)
    }
  }

  const decrement = () => {
    if (disabled) return
    const currentValue = value ?? 0
    if (currentValue > min) {
      const newValue = Math.max(currentValue - step, min)
      onChange(newValue)
    }
  }

  return (
    <Box width="100%">
      {label && (
        <Text mb={2} fontSize="sm">
          {label}
        </Text>
      )}
      <Box position="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          pr="4rem"
        />
        <Box position="absolute" right={2} top="50%" transform="translateY(-50%)" display="flex" gap={1}>
          <IconButton
            aria-label="increment"
            size="xs"
            variant="ghost"
            onClick={increment}
            disabled={disabled || value === max}
          />
          <IconButton
            aria-label="decrement"
            size="xs"
            variant="ghost"
            onClick={decrement}
            disabled={disabled || value === min}
          />
        </Box>
      </Box>
    </Box>
  )
}
