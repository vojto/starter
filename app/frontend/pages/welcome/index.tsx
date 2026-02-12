import { Box, Heading, Text } from "@radix-ui/themes"

export default function WelcomeIndex() {
  return (
    <Box>
      <Heading size="8" mb="4">
        Welcome
      </Heading>
      <Text as="p" size="3" style={{ color: "var(--gray-11)" }}>
        Your Rails + Inertia.js + React app is ready.
      </Text>
    </Box>
  )
}
