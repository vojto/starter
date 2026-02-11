import { createInertiaApp } from "@inertiajs/react"
import { type ReactNode, createElement } from "react"
import { createRoot } from "react-dom/client"
import { Theme } from "@radix-ui/themes"
import DefaultLayout from "../layouts/default"

import "@radix-ui/themes/styles.css"

interface ResolvedComponent {
  default: ReactNode & { layout?: (page: ReactNode) => ReactNode }
}

const appName = (import.meta.env.VITE_APP_NAME ?? "App") as string

void createInertiaApp({
  // Dynamic title generation
  title: (title) => (title ? `${title} - ${appName}` : appName),

  // Page resolution - imports from app/frontend/pages/**/*.tsx
  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.tsx", {
      eager: true,
    })
    const page = pages[`../pages/${name}.tsx`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`)
    }

    // Default layout wrapping
    page.default.layout ??= (page: ReactNode) => createElement(DefaultLayout, null, page)

    return page
  },

  // Radix Theme setup
  setup({ el, App, props }) {
    createRoot(el).render(
      createElement(
        Theme,
        {
          accentColor: "indigo",
          grayColor: "slate",
          appearance: "light",
          panelBackground: "solid",
          radius: "medium",
        },
        createElement(App, props)
      )
    )
  },
})
