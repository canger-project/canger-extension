import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import Container from "./Container"

const CONTENT_PREFIX = "[content-script]"

export default function App() {
  useEffect(() => {
    console.info(`${CONTENT_PREFIX} loaded :)`)
    injectCangerTrans()
    injectCangerInput()
  }, [])

  return <div className=""></div>
}

// 注入翻译
function injectCangerTrans() {
  const eleShowTransBtn = ["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"]
  const allEle = document.querySelectorAll(eleShowTransBtn.join(", "))
  allEle.forEach(ele => {
    ele.addEventListener("mouseenter", event => {
      attachCanger(ele as HTMLElement, "trans")
      console.info(`${CONTENT_PREFIX} attach canger to ${ele.tagName}`)
    })
  })
}

// 注入写作
function injectCangerInput() {
  if (document.documentElement.lang != "en") return
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
