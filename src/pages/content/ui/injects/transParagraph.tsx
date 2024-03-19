import { createRoot } from "react-dom/client"
import { Container } from "../Container"
import { DEFAULT_DOMAINS_SELECTOR, DOMAINS_SELECTOR } from "../const"

/**
 * Translates the paragraph
 */

export async function injectTransParagraph() {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-input-container")
  let selectors = DEFAULT_DOMAINS_SELECTOR
  let currentDomain = ""

  const resp = await chrome.runtime.sendMessage({ type: "taburl", message: "" })
  currentDomain = resp.result
  for (let i = 0; i < DOMAINS_SELECTOR.length; i++) {
    const domain = DOMAINS_SELECTOR[i]
    if (currentDomain.match(domain.pattern) != null) {
      selectors = domain.selectors.concat(DEFAULT_DOMAINS_SELECTOR)
      break
    }
  }
  const allEle = document.querySelectorAll(selectors.join(", "))
  allEle.forEach(ele => {
    ele.addEventListener("mouseenter", event => {
      setTimeout(() => {
        createRoot(container).render(<Container ele={ele as HTMLElement} type="trans" />)
      }, 200)
    })
    ele.addEventListener("mouseleave", event => {
      createRoot(container).unmount()
    })
  })
}
