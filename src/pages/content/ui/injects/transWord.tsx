import { createRoot } from "react-dom/client"
import { ContainerM } from "../Container"

/* 单词翻译 */

export function injectTransWord() {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-trans-container")

  document.addEventListener("selectionchange", e => {
    const selection = window.getSelection()
    const root = createRoot(container)
    if (selection.toString().trim() !== "") {
      root.render(<ContainerM selection={selection} />)
    }
  })

  document.addEventListener("click", function (event) {
    const clickedElement = event.target
    if (
      clickedElement &&
      (clickedElement as HTMLElement).id !== "canger-root" &&
      window.getSelection().toString() === ""
    ) {
      createRoot(container).unmount()
    }
  })
}
