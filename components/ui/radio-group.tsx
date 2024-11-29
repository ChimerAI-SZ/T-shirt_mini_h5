"use client"

import { useState } from "react"
import { Box, Button } from "@chakra-ui/react"

export interface RadioOption {
  value: string
  label: string
}

export interface RadioGroupProps {
  options: RadioOption[]
  defaultValue: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function RadioGroup({ options, defaultValue, onChange, disabled }: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <Box display="flex" gap={4}>
      {options.map(option => (
        <Button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          colorScheme={selectedValue === option.value ? "blue" : "gray"}
          flex={1}
          disabled={disabled}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  )
}
