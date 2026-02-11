import { type ReactNode } from "react"
import { Box, Button, Flex, Text } from "@radix-ui/themes"
import { Link, router, usePage } from "@inertiajs/react"
import FlashToast from "@/components/flash-toast"
import { SharedPropsSchema } from "@/schemas"

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const { auth } = SharedPropsSchema.parse(usePage().props)

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

            {auth?.user ? (
              <Flex gap="3" align="center">
                <Text size="2" style={{ color: "var(--gray-11)" }}>
                  Logged in as {auth.user.email}
                </Text>
                <Button
                  variant="soft"
                  color="gray"
                  onClick={() => {
                    router.delete("/logout")
                  }}
                >
                  Log out
                </Button>
              </Flex>
            ) : (
              <Button asChild>
                <Link href="/login">Log in</Link>
              </Button>
            )}
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

      <FlashToast />
    </Box>
  )
}
