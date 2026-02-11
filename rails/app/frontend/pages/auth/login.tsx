import { type FormEvent } from "react"
import { Link, useForm } from "@inertiajs/react"
import { Box, Button, Card, Flex, Heading, Link as RadixLink, Text, TextField } from "@radix-ui/themes"

function formatError(error: string | undefined) {
  return error ?? null
}

export default function LoginPage() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post("/login")
  }

  return (
    <Flex justify="center">
      <Box width="100%" style={{ maxWidth: "420px" }}>
        <Card size="4">
          <Flex direction="column" gap="5">
            <Heading size="6">Log in</Heading>

            <Box asChild>
              <form onSubmit={submit}>
                <Flex direction="column" gap="4">
                  <label>
                    <Text as="div" size="2" weight="medium" mb="1">
                      Email
                    </Text>
                    <TextField.Root
                      type="email"
                      value={data.email}
                      onChange={(event) => setData("email", event.currentTarget.value)}
                      autoComplete="email"
                      required
                    />
                    {formatError(errors.email) && (
                      <Text as="div" size="1" color="red" mt="1">
                        {formatError(errors.email)}
                      </Text>
                    )}
                  </label>

                  <label>
                    <Text as="div" size="2" weight="medium" mb="1">
                      Password
                    </Text>
                    <TextField.Root
                      type="password"
                      value={data.password}
                      onChange={(event) => setData("password", event.currentTarget.value)}
                      autoComplete="current-password"
                      required
                    />
                    {formatError(errors.password) && (
                      <Text as="div" size="1" color="red" mt="1">
                        {formatError(errors.password)}
                      </Text>
                    )}
                  </label>

                  <Button type="submit" disabled={processing}>
                    {processing ? "Logging in..." : "Log in"}
                  </Button>
                </Flex>
              </form>
            </Box>

            <Text size="2" style={{ color: "var(--gray-11)" }}>
              Need an account?{" "}
              <RadixLink asChild>
                <Link href="/signup">Create one</Link>
              </RadixLink>
            </Text>
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}
