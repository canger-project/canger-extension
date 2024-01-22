import { createRoot } from "react-dom/client"
import HighLight from "../components/HighLight"

// 注入单词高亮
export function injectHighLightWords() {
  const node = document.getElementsByTagName("body")[0]
  // const words = await wordStorage.get()
  hightLightWords(node, ["resolve", "good"])
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
