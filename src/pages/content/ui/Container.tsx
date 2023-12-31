import { IconSignature, IconTransform, IconX } from "@tabler/icons-react"

export default function Container(props: { textarea: HTMLTextAreaElement }) {
  const { textarea } = props
  const areaRect = textarea.getBoundingClientRect()
  return (
    <div
      style={{
        position: "absolute",
        top: areaRect.top + "px",
        left: areaRect.left + "px",
        zIndex: 9999999,
      }}>
      <Btn textarea={textarea} />
    </div>
  )
}

function Btn(props: { textarea: HTMLTextAreaElement }) {
  const { textarea } = props
  const areaRect = textarea.getBoundingClientRect()

  const handleClick = (e, kind) => {
    chrome.runtime.sendMessage({ sentence: textarea.value, kind: kind }, function (response) {
      console.debug(`content-script received: `, response.result)
      textarea.value = response.result
    })
  }
  return (
    <div
      className="canger-btn"
      style={{
        position: "relative",
        top: areaRect.height - 38 + "px",
        left: areaRect.width - 94 + "px",
      }}>
      <button id="canger-close">
        <IconX size={24} />
        <span className="tooltip">关闭</span>
      </button>
      <button id="canger-writing" onClick={e => handleClick(e, "writer")}>
        <IconSignature size={24} />
        <span className="tooltip">续写</span>
      </button>
      <button id="canger-trans" onClick={e => handleClick(e, "translator")}>
        <IconTransform size={24} />
        <span className="tooltip">翻译</span>
      </button>
    </div>
  )
}
