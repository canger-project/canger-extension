import { InputBtn } from "./components/InputBtn"
import { TransParagraphBtn } from "./components/TransParagraphBtn"
import { TransWordBtn } from "./components/TransWordBtn"
import { getEleLeft, getEleTop, getSelectionPosition } from "./utils"

export function Container(props: { ele: HTMLElement; type: "input" | "trans" }) {
  const { ele, type } = props

  return (
    <div
      style={{
        position: "absolute",
        top: getEleTop(ele) + "px",
        left: getEleLeft(ele) + "px",
        zIndex: 999999,
      }}
    >
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
      }}
    >
      <TransWordBtn selection={selection} />
    </div>
  )
}
