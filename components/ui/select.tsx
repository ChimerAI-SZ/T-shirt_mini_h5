"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Button, VStack, Text, Portal } from "@chakra-ui/react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  label?: string
}

export function Select({ value, onChange, options, placeholder = "请选择", disabled, label }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Box position="relative" width="100%">
      {label && (
        <Text mb={2} fontSize="sm">
          {label}
        </Text>
      )}
      <Button
        ref={buttonRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        width="100%"
        justifyContent="space-between"
        disabled={disabled}
        variant="outline"
      >
        {selectedOption ? selectedOption.label : placeholder}
      </Button>

      {isOpen && !disabled && (
        <Portal>
          <Box
            ref={menuRef}
            position="fixed"
            top={buttonRef.current?.getBoundingClientRect().bottom}
            left={buttonRef.current?.getBoundingClientRect().left}
            width={buttonRef.current?.offsetWidth}
            maxHeight="200px"
            overflowY="auto"
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            zIndex={1000}
          >
            <VStack align="stretch" p={1}>
              {options.map(option => (
                <Button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  variant="ghost"
                  justifyContent="flex-start"
                  _active={{ bg: "gray.100" }}
                  size="sm"
                >
                  {option.label}
                </Button>
              ))}
            </VStack>
          </Box>
        </Portal>
      )}
    </Box>
  )
}
