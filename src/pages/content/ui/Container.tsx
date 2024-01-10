import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { IconSignature, IconTransformFilled, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { createRoot } from "react-dom/client"
import SentencePanel from "./components/SentencePanel"
import WordPanel from "./components/WordPanel"
import { getSelectionPosition, isValidWord } from "./utils"

export function Container(props: { ele: HTMLElement; type: "input" | "trans" }) {
  const { ele, type } = props

  return (
    <div
      style={{
        position: "absolute",
        top: getEleTop(ele) + "px",
        left: getEleLeft(ele) + "px",
        zIndex: 999999,
      }}>
      {type === "input" ? <InputBtn textarea={ele as HTMLTextAreaElement} /> : <TransParagraphBtn ele={ele} />}
    </div>
  )
}

// 划词翻译的容器
export function ContainerM(props: { selection: Selection }) {
  const { selection } = props
  const { top, left } = getSelectionPosition(selection)

  return (
    <div
      style={{
        position: "absolute",
        top: top + "px",
        left: left + "px",
        zIndex: 999999,
      }}>
      <TransWordBtn selection={selection} />
    </div>
  )
}

function TransWordBtn(props: { selection: Selection }) {
  const vocabulary = useStorage(vocabularyStorage)
  const { selection } = props
  const selectedStr = selection.toString().trim()
  const [thinking, setThinking] = useState(false)

  async function handleClick() {
    setThinking(true)
    const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-trans-container")
    const root = createRoot(container)
    const wordStorage = vocabulary && vocabulary.find(w => w.word === selectedStr)
    let currentVocabulary: Vocabulary

    // 根据是单词还是句子，展示不同的面板
    if (isValidWord(selectedStr)) {
      // 如果已经存储过该词，直接渲染就行
      if (wordStorage !== undefined) {
        currentVocabulary = { ...wordStorage, o: wordStorage.o + 1 }
        setThinking(false)
        await vocabularyStorage.add(currentVocabulary)
        root.render(<WordPanel vocabulary={currentVocabulary} selection={selection} />)
      } else {
        const resp = await chrome.runtime.sendMessage({ type: "dictionary", message: selectedStr })
        const detail = resp.result
        if (detail.errorCode !== "0") {
          // TODO: 出错处理
          console.error(detail)
        } else {
          currentVocabulary = { word: selectedStr, o: 1, detail: resp.result }
          setThinking(false)
          await vocabularyStorage.add(currentVocabulary)
          root.render(<WordPanel vocabulary={currentVocabulary} selection={selection} />)
        }
      }
    } else {
      // 句子面板
      const resp = await chrome.runtime.sendMessage({ type: "sentence", message: selectedStr })
      setThinking(false)
      const sentence = resp.result[0].translations[0].text
      root.render(<SentencePanel sentence={sentence} selection={selection} />)
    }
  }

  return (
    <>
      <div
        className="canger-trans-btn"
        style={{
          position: "relative",
          top: 2 + "px",
          left: -36 + "px",
        }}>
        {thinking ? (
          <span className="loader"></span>
        ) : (
          <button
            onClick={async () => {
              await handleClick()
            }}>
            <IconTransformFilled size={24} />
            <span className="tooltip">翻译</span>
          </button>
        )}
      </div>
    </>
  )
}

// 段落翻译按钮
function TransParagraphBtn(props: { ele: HTMLElement }) {
  const [thinking, setThinking] = useState(false)
  const { ele } = props

  function handleClick(e) {
    setThinking(true)
    chrome.runtime.sendMessage(
      { type: "chatgpt", message: { sentence: ele.textContent, kind: "translator" } },
      function (response) {
        setThinking(false)
        const resultEle = document.createElement(ele.tagName)
        resultEle.className = ele.className
        resultEle.style.cssText = ele.style.cssText
        resultEle.innerHTML = response.result
        ele.insertAdjacentElement("afterend", resultEle)
      },
    )
  }

  return (
    <div
      className="canger-trans-btn"
      style={{
        position: "relative",
        top: 2 + "px",
        left: -36 + "px",
      }}>
      {thinking ? (
        <span className="loader"></span>
      ) : (
        <button onClick={handleClick}>
          <IconTransformFilled size={24} />
          <span className="tooltip">翻译</span>
        </button>
      )}
    </div>
  )
}

// 写作输入按钮
function InputBtn(props: { textarea: HTMLTextAreaElement }) {
  const [thinking, setThinking] = useState(false)
  const { textarea } = props
  const areaRect = textarea.getBoundingClientRect()

  const handleClick = (e, kind) => {
    setThinking(true)
    chrome.runtime.sendMessage(
      { type: "chatgpt", message: { sentence: textarea.value, kind: kind } },
      function (response) {
        setThinking(false)
        textarea.value = response.result
      },
    )
  }

  function handleCloseBtn() {
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, function (response) {
      disabledDomainStorage.add(response.result)
      const cangerRoot = document.getElementById("canger-root")
      cangerRoot.remove()
    })
  }

  return (
    <div
      className="canger-btn"
      style={{
        position: "relative",
        top: areaRect.height - 38 + "px",
        left: areaRect.width - 70 + "px",
      }}>
      <button id="canger-close" onClick={handleCloseBtn}>
        <IconX size={24} />
        <span className="tooltip">关闭</span>
      </button>

      {thinking ? (
        <span className="loader"></span>
      ) : (
        <button id="canger-trans" onClick={e => handleClick(e, "writer")}>
          <IconSignature size={24} />
          <span className="tooltip">翻译+优化</span>
        </button>
      )}
    </div>
  )
}

function getEleTop(ele: HTMLElement) {
  let actualTop = ele.offsetTop
  let current = ele.offsetParent as HTMLElement
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }
  return actualTop
}

function getEleLeft(ele: HTMLElement) {
  let actualLeft = ele.offsetLeft
  let current = ele.offsetParent as HTMLElement
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent as HTMLElement
  }
  return actualLeft
}
