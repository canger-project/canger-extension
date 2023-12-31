import { useState } from "react"
import { IconSignature, IconX } from "@tabler/icons-react"
import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"

export default function Container(props: { textarea: HTMLTextAreaElement }) {
  const { textarea } = props
  const areaRect = textarea.getBoundingClientRect()

  return (
    <div
      style={{
        position: "absolute",
        top: getEleTop(textarea) + "px",
        left: getEleLeft(textarea) + "px",
        zIndex: 999999,
      }}>
      <Btn textarea={textarea} />
    </div>
  )
}

function Btn(props: { textarea: HTMLTextAreaElement }) {
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
        <button id="canger-trans" onClick={e => handleClick(e, "translator")}>
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
