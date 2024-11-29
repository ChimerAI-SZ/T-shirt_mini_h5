"use client"

import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster, Flex } from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  offsets: { left: "20px", top: "20px", right: "20px", bottom: "5rem" }
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        // insetInline={{ mdDown: "4" }}
        css={{
          width: "19.69rem",
          left: "50%",
          transform: "translateX(-50%)",
          border: "none",
          shadow: "0 0 0 0 "
        }}
      >
        {toast => (
          <Toast.Root
            width={{ md: "sm" }}
            css={{
              borderRadius: "0.5rem",
              boxShadow: "0rem 0.13rem 0.5rem 0rem rgba(17,17,17,0.12)"
            }}
          >
            {toast.type === "loading" ? <Spinner size="sm" color="blue.solid" /> : <Toast.Indicator />}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
