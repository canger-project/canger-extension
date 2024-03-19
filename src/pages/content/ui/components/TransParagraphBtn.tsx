import { IconTransformFilled } from "@tabler/icons-react"
import { useState } from "react"

// 段落翻译按钮
export function TransParagraphBtn(props: { ele: HTMLElement }) {
  const [thinking, setThinking] = useState(false)
  const { ele } = props

  function handleClick(e) {
    setThinking(true)
    chrome.runtime.sendMessage({ type: "sentence", message: ele.textContent }, function (response) {
      setThinking(false)
      const resultEle = document.createElement(ele.tagName)
      resultEle.className = ele.className
      resultEle.style.cssText = ele.style.cssText
      resultEle.innerHTML = response.result
      ele.insertAdjacentElement("afterend", resultEle)
    })
  }

  return (
    <div
      className="canger-trans-btn"
      style={{
        position: "relative",
        top: 2 + "px",
        left: -36 + "px",
      }}
    >
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
