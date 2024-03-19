import { ReactNode } from "react"
import { createRoot } from "react-dom/client"

const HOST_SELECTORS = new Map<string, string[]>([["douban.com", [".stream-items"]]])

export function Container(reactNode: ReactNode) {
  const container = document.createElement("div")
  const root = createRoot(container)
  root.render(reactNode)
  return container
}

export type Density = "low" | "medium" | "high"
