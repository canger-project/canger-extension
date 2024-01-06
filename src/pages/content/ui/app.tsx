import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Container, ContainerM } from "./Container"
import { DEFAULT_DOMAINS_SELECTOR, DOMAINS_SELECTOR } from "./const"
import { isValidWord } from "./utils"

const CONTENT_PREFIX = "[content-script]"

export default function App() {
  useEffect(() => {
    console.info(`${CONTENT_PREFIX} loaded :)`)
    if (document.documentElement.lang === "en") {
      // FIXME: 自定义域名过滤
      injectTransWord()
      injectTransParagraph()
      injectTransInput()
    }
  }, [])

  return <div className=""></div>
}

// 注入单词翻译功能
function injectTransWord() {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-trans-container")

  document.addEventListener("selectionchange", e => {
    const selection = window.getSelection()
    const word = selection.toString().trim()
    const root = createRoot(container)
    if (isValidWord(word)) {
      root.render(<ContainerM selection={selection} />)
    }
  })

  container.addEventListener("blur", event => {
    createRoot(container).unmount()
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

// 注入段落翻译功能
async function injectTransParagraph() {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-input-container")
  let selectors = DEFAULT_DOMAINS_SELECTOR
  let currentDomain = ""

  const resp = await chrome.runtime.sendMessage({ type: "taburl", message: "" })
  currentDomain = resp.result
  for (let i = 0; i < DOMAINS_SELECTOR.length; i++) {
    const domain = DOMAINS_SELECTOR[i]
    if (currentDomain.match(domain.pattern) != null) {
      selectors = domain.selectors
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

// 注入写作输入功能
function injectTransInput() {
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
