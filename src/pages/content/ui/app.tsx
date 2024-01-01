import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import Container from "./Container"
import { DEFAULT_DOMAINS_SELECTOR, DOMAINS_SELECTOR } from "./const"
const CONTENT_PREFIX = "[content-script]"

export default function App() {
  useEffect(() => {
    console.info(`${CONTENT_PREFIX} loaded :)`)
    if (document.documentElement.lang === "en") {
      injectCangerTrans()
      injectCangerInput()
    }
  }, [])

  return <div className=""></div>
}

// 注入翻译
async function injectCangerTrans() {
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
        attachCanger(ele as HTMLElement, "trans")
      }, 200)
    })
  })
}

// 注入写作
function injectCangerInput() {
  // TODO: 已忽略域名跳过

  const allTextarea = document.querySelectorAll("textarea")
  allTextarea.forEach(textarea => {
    textarea.addEventListener("focus", event => {
      setTimeout(() => {
        attachCanger(textarea, "input")
        console.info(`${CONTENT_PREFIX} attach canger to textarea`)
      }, 200)
    })
  })
}

function attachCanger(ele: HTMLElement, type: "input" | "trans") {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-input-container")
  createRoot(container).render(<Container ele={ele} type={type} />)
}

function attatchCangerBtn() {}

// 上下文语料分析
function contextCorpusAnalysis() {}
