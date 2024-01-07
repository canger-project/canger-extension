import useStorage from "@root/src/shared/hooks/useStorage"
import vocabularyStorage from "@root/src/shared/storages/VocabularyStorage"
import { createRoot } from "react-dom/client"
import WordPanel from "./WordPanel"

export default function HighLight(props: { range: Range }) {
  const { range } = props
  const vocabulary = useStorage(vocabularyStorage)
  const wordStorage = vocabulary && vocabulary.find(w => w.word === range.toString().trim())

  function handleMouseOver(e) {
    if (wordStorage === undefined) return
    const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-trans-container")
    const root = createRoot(container)
    root.render(<WordPanel vocabulary={wordStorage} selection={range} />)
  }

  return (
    <span
      style={{
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "red",
        textUnderlineOffset: "2px",
      }}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}>
      {range.toString()}
    </span>
  )
}
