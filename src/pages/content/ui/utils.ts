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
 * Inserts words into a stream element based on the specified density.
 *
 * @param density - The density of word insertion ("high", "medium", or "low").
 * @param stream - The stream element to insert words into.
 * @param itemClass - An array of class names that identify valid items in the stream.
 * @param words - An array of vocabulary words.
 * @param container - A function that creates a container element for a word.
 */
export function InsertWordsByDensity(
  density: Density,
  stream: Element,
  itemClassName: string | null,
  itemIdNamePattern: string | null,
  words: Vocabulary[],
  container: (word: Vocabulary) => HTMLDivElement,
) {
  const streamLength = stream.children.length
  let step = 0
  switch (density) {
    case "high":
      step = Math.floor(streamLength * 0.2)
      break
    case "medium":
      step = Math.floor(streamLength * 0.5)
      break
    case "low":
      step = Math.floor(streamLength * 0.8)
      break
    default:
      break
  }
  let insertWordsNum = Math.floor(streamLength / step + 1)
  insertWordsNum = insertWordsNum > words.length ? words.length : insertWordsNum

  const insertWords = []
  for (let i = 0; i < insertWordsNum; i++) {
    const index = Math.floor(Math.random() * words.length)
    insertWords.push(words[index])
    words.splice(index, 1)
  }

  // all valid items
  const validItems = []
  if (itemClassName) {
    for (const ele of stream.children) {
      if (ele.className === itemClassName) {
        if (itemIdNamePattern && ele.id.match(itemIdNamePattern)) {
          validItems.push(ele)
          continue
        }
        validItems.push(ele)
      }
    }
  } else {
    for (const child of stream.children) {
      validItems.push(child)
    }
  }

  insertWords.forEach((word, index) => {
    validItems[index * step].insertAdjacentElement("beforebegin", container(word))
  })
}
