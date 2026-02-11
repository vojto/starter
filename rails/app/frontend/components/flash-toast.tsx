import { useEffect, useRef, useState } from "react"
import * as Toast from "@radix-ui/react-toast"
import { usePage } from "@inertiajs/react"
import { Flex, Text } from "@radix-ui/themes"
import { SharedPropsSchema } from "@/schemas"

type FlashToastTone = "error" | "success"

interface FlashToastItem {
  id: number
  title: string
  message: string
  tone: FlashToastTone
}

const FLASH_TOAST_CONFIG = [
  { key: "error", title: "Error", tone: "error" },
  { key: "alert", title: "Error", tone: "error" },
  { key: "success", title: "Success", tone: "success" },
  { key: "notice", title: "Notice", tone: "success" },
] as const

export default function FlashToast() {
  const page = usePage()
  const nextToastId = useRef(1)
  const [toasts, setToasts] = useState<FlashToastItem[]>([])

  useEffect(() => {
    const { flash } = SharedPropsSchema.parse(page.props)
    if (!flash) return

    const nextToasts = FLASH_TOAST_CONFIG.flatMap((config) => {
      const message = flash[config.key]
      if (!message) return []

      return [
        {
          id: nextToastId.current++,
          title: config.title,
          message,
          tone: config.tone,
        },
      ]
    })

    if (nextToasts.length === 0) return
    setToasts((current) => [...current, ...nextToasts])
  }, [page.props])

  const dismissToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          duration={4500}
          defaultOpen
          onOpenChange={(open) => {
            if (!open) dismissToast(toast.id)
          }}
          style={{
            backgroundColor: "var(--color-panel-solid)",
            border: `1px solid ${toast.tone === "error" ? "var(--red-a6)" : "var(--green-a6)"}`,
            borderRadius: "var(--radius-3)",
            boxShadow: "var(--shadow-4)",
            padding: "var(--space-3)",
          }}
        >
          <Flex direction="column" gap="1">
            <Toast.Title asChild>
              <Text
                size="2"
                weight="medium"
                style={{
                  color: toast.tone === "error" ? "var(--red-11)" : "var(--green-11)",
                }}
              >
                {toast.title}
              </Text>
            </Toast.Title>

            <Toast.Description asChild>
              <Text size="2">{toast.message}</Text>
            </Toast.Description>
          </Flex>
        </Toast.Root>
      ))}

      <Toast.Viewport
        style={{
          position: "fixed",
          bottom: "var(--space-4)",
          right: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          width: "min(360px, calc(100vw - var(--space-6)))",
          margin: 0,
          outline: "none",
          listStyle: "none",
          zIndex: 9999,
        }}
      />
    </Toast.Provider>
  )
}
