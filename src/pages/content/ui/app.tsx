import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import Container from "./Container"

const CONTENT_PREFIX = "[content-script]"

export default function App() {
  useEffect(() => {
    console.info(`${CONTENT_PREFIX} loaded :)`)
    injectCangerBtn()
  }, [])

  return <div className=""></div>
}

// 注入按钮
function injectCangerBtn() {
  if (document.documentElement.lang != "en") return
  // TODO: 已忽略域名跳过

  const allTextarea = document.querySelectorAll("textarea")
  allTextarea.forEach(textarea => {
    textarea.addEventListener("focus", event => {
      setTimeout(() => {
        attachCanger(textarea)
      }, 200)
    })
  })
}

function attachCanger(textarea: HTMLTextAreaElement) {
  const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-input-container")
  createRoot(container).render(<Container textarea={textarea} />)
}

function pieceFollowArea() {
  const textarea = document.getElementsByTagName("textarea")
  for (let i = 0; i < textarea.length; i++) {
    const area = textarea[i]
    //TODO: 监听textarea的变化，变化时重新计算piece的位置
  }
}

// 上下文语料分析
function contextCorpusAnalysis() {}
