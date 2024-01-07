import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Container, ContainerM } from "./Container"
import { DoubanContentFlow } from "./ContentFlow/Douban"
import HighLight from "./components/HighLight"
import { DEFAULT_DOMAINS_SELECTOR, DOMAINS_SELECTOR } from "./const"
import { isValidWord } from "./utils"

export default function App() {
  useEffect(() => {
    console.info(`Canger loaded :)`)
    // 注入内容流
    injectContentFlow()
    if (document.documentElement.lang === "en") {
      // FIXME: 自定义域名过滤
      // TODO: 提供是否开启高亮的选项
      // injectHighLightWords()
      injectTransWord()
      injectTransParagraph()
      injectTransInput()
    }
  }, [])

  return <div className=""></div>
}

// 注入单词高亮
function injectHighLightWords() {
  const node = document.getElementsByTagName("body")[0]
  // const words = await wordStorage.get()
  hightLightWords(node, ["resolve", "good"])
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

// 注入内容流生词
function injectContentFlow() {
  document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, resp => {
      const currentDomain = resp.result
      const hostname = new URL(currentDomain).hostname
      // TODO: 过滤域名
      switch (hostname) {
        case "www.douban.com":
          DoubanContentFlow()
          break
        default:
          break
      }
    })
  })
}

function hightLightWords(node, words) {
  if (node.nodeType == Node.TEXT_NODE) {
    for (const word of words) {
      highLightWord(node, word)
    }
  } else {
    for (let i = 0, len = node.childNodes.length; i < len; ++i) {
      hightLightWords(node.childNodes[i], words)
    }
  }
}

function highLightWord(textNode, word) {
  const text = textNode.nodeValue.toLowerCase()
  const textList = [...text.matchAll(new RegExp(word, "gi"))].filter(
    w =>
      (text[w.index - 1] == " " && text[w.index + w[0].length] == " ") ||
      (text[w.index - 1] == undefined && text[w.index + w[0].length] == " ") ||
      (text[w.index - 1] == " " && text[w.index + w[0].length] == undefined),
  )
  if (textList.map(t => t[0]).includes(word)) {
    for (const t of textList) {
      const range = document.createRange()
      range.setStart(textNode, Math.min(t.index, textNode.length))
      range.setEnd(textNode, Math.min(t.index + word.length, textNode.length))
      const span = document.createElement("span")
      createRoot(span).render(<HighLight range={range} />)
      range.surroundContents(span)
    }
  }
}
