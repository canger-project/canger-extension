import { ReactNode, useState } from "react"
import { createRoot } from "react-dom/client"

const HOST_SELECTORS = new Map<string, string[]>([["douban.com", [".stream-items"]]])

export function Container(reactNode: ReactNode, id: string = "ops", className: string = "") {
  const container = document.createElement("div")
  container.className = className
  container.id = `canger-word-${id}`
  const root = createRoot(container)
  root.render(reactNode)
  return container
}

export type Density = "low" | "medium" | "high"

export function CheckBtn(props: { width: number; height: number }) {
  const { width, height } = props
  const [hover, setHover] = useState(false)

  return (
    <svg
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontWeight: hover ? "bolder" : "normal",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  )
}
