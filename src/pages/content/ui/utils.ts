// 是否英文：长度不为空且仅包含单词字母
export function isValidWord(word) {
  return word.length > 0 && /^[a-zA-Z]+$/.test(word.replace(/\s+/g, ""))
}

export function getSelectWords() {
  const selection = window.getSelection()
  return selection.toString().trim()
}

export function getSelectionPosition(selection: Selection) {
  const range = selection instanceof Range ? selection : selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()
  const top = rect.top + window.scrollY - range.startContainer.parentElement.scrollTop
  const left = rect.left + window.scrollX - range.startContainer.parentElement.scrollLeft
  return { top, left }
}
