import { type ReactNode } from "react"
import { Box, Flex, Text } from "@radix-ui/themes"
import { Link } from "@inertiajs/react"

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "var(--color-background)" }}>
      {/* Header */}
      <Box asChild>
        <header
          style={{
            backgroundColor: "var(--gray-2)",
            borderBottom: "1px solid var(--gray-a5)",
          }}
        >
          <Flex
            className="mx-auto"
            style={{ maxWidth: "1000px" }}
            px="4"
            py="4"
            justify="between"
            align="center"
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Text size="5" weight="bold" style={{ color: "var(--gray-12)" }}>
                App
              </Text>
            </Link>
          </Flex>
        </header>
      </Box>

      {/* Main content area */}
      <Box asChild>
        <main>
          <Box className="mx-auto" style={{ maxWidth: "1000px" }} px="4" py="8">
            {children}
          </Box>
        </main>
      </Box>
    </Box>
  )
}
