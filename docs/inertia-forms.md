# Inertia.js Forms

## Basic Pattern

```typescript
import { useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

// Initialize form
const { data, setData, post, patch, processing, errors } = useForm({
  name: "",
  email: "",
})

// Submit handler
const submit: FormEventHandler = (e) => {
  e.preventDefault()
  post(resourcePath())      // For creating
  // or
  patch(resourcePath(id))   // For updating
}

// In JSX
<form onSubmit={submit}>
  <TextField.Root
    value={data.name}
    onChange={(e) => setData("name", e.target.value)}
  />
  <InputError message={errors.name} />

  <Button type="submit" disabled={processing}>
    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
    Submit
  </Button>
</form>
```

## Key Points

- **`useForm` returns**: `data`, `setData`, `post`, `patch`, `processing`, `errors`
- **Bind inputs**: Use `value={data.field}` and `onChange={(e) => setData("field", e.target.value)}`
- **Submit**: Call `post()` for create, `patch()` for update
- **Errors**: Display with `<InputError message={errors.field} />`
- **Loading state**: Disable button with `disabled={processing}`
- **Edit forms**: Initialize with existing data: `useForm({ name: resource.name })`
