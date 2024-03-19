import { getSelectionPosition } from "../utils"

export default function SentencePanel(props: { sentence: string; selection: Selection }) {
  const { sentence, selection } = props
  const { left, bottom } = getSelectionPosition(selection)
  return (
    <div
      className="sentence-panel"
      style={{
        position: "absolute",
        top: bottom + 12 + "px",
        left: left + "px",
        zIndex: 999999,
      }}
    >
      {sentence}
    </div>
  )
}
