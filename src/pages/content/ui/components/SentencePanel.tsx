import { getSelectionPosition } from "../utils"

export default function SentencePanel(props: { sentence: string; selection: Selection }) {
  const { sentence, selection } = props
  const { top, left } = getSelectionPosition(selection)
  return (
    <div
      style={{
        color: "#020617",
        padding: "12px",
        borderRadius: "12px",
        border: "solid 1px #f3f4f6",
        backgroundColor: "white",
        boxShadow: "0px 0px 12px 2px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        top: top + 24 + "px",
        left: left + "px",
        zIndex: 999999,
      }}>
      {sentence}
    </div>
  )
}
