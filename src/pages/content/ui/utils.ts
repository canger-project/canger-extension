import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { ReactNode } from "react"
import { createRoot } from "react-dom/client"

// 是否英文：长度不为空且仅包含单词字母(两边有空格的去掉)
export function isValidWord(word) {
  word = word.trim()
  return word.length > 0 && /^[a-zA-Z]+$/.test(word)
}

export function getSelectWords() {
  const selection = window.getSelection()
  return selection.toString().trim()
}

/**
 * Calculates the position of a selection or range within the viewport.
 * @param selection - The selection or range object.
 * @returns An object containing the top, left, bottom, and right coordinates of the selection.
 */
export function getSelectionPosition(selection: Selection | Range) {
  const range = selection instanceof Range ? selection : selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()
  const top = rect.top + window.scrollY - range.startContainer.parentElement.scrollTop
  const left = rect.left + window.scrollX - range.startContainer.parentElement.scrollLeft
  const bottom = rect.bottom + window.scrollY
  const right = rect.right + window.scrollX
  return { top, left, bottom, right }
}

export function ContainerFlowContainer(reactNode: ReactNode) {
  const container = document.createElement("div")
  const root = createRoot(container)
  root.render(reactNode)
  return container
}

export function getEleTop(ele: HTMLElement) {
  let actualTop = ele.offsetTop
  let current = ele.offsetParent as HTMLElement
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }
  return actualTop
}

export function getEleLeft(ele: HTMLElement) {
  let actualLeft = ele.offsetLeft
  let current = ele.offsetParent as HTMLElement
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent as HTMLElement
  }
  return actualLeft
}

type Density = "low" | "medium" | "high"

/**
 * 根据内容流密度在不同位置插入单词
 * @param density 密度
 * @param stream 内容流
 * @param words 要记忆的生词
 */
export function InsertWordsByDensity(
  density: Density,
  stream: Element,
  words: Vocabulary[],
  container: (word: Vocabulary) => HTMLDivElement,
) {
  // 插入单词的间隔
  const streamLength = stream.children.length
  let step = 0
  switch (density) {
    case "high":
      step = ~~streamLength * 0.2
      break
    case "medium":
      step = ~~streamLength * 0.5
      break
    case "low":
      step = ~~streamLength * 0.8
      break
    default:
      break
  }
  // 插入单词数量
  let insertWordsNum = ~~(streamLength / step + 1)
  insertWordsNum = insertWordsNum > words.length ? words.length : insertWordsNum

  const insertWords = []
  for (let i = 0; i < insertWordsNum; i++) {
    const index = ~~(Math.random() * words.length)
    insertWords.push(words[index])
    words.splice(index, 1)
  }

  insertWords.forEach((word, index) => {
    stream.insertBefore(container(word), stream.children[index * step])
  })
}
