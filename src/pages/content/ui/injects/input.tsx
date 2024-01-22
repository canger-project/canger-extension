import { createRoot } from "react-dom/client"
import { Container } from "../Container"

/* 写作输入 */

export function injectTransInput() {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-input-container")

  const allTextarea = document.querySelectorAll("textarea")

  allTextarea.forEach(textarea => {
    textarea.addEventListener("focus", event => {
      setTimeout(() => {
        createRoot(container).render(<Container ele={textarea} type="input" />)
      }, 200)
    })
  })
}
