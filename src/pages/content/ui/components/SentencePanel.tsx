import { getSelectionPosition } from "../utils"

export default function SentencePanel(props: { sentence: string; selection: Selection }) {
  const { sentence, selection } = props
  const { top, left } = getSelectionPosition(selection)
  return (
    <div
      className="sentence-panel"
      style={{
        position: "absolute",
        top: top + 24 + "px",
        left: left + "px",
        zIndex: 999999,
      }}
    >
      {sentence}
    </div>
  )
}
