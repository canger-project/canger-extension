import useStorage from "@root/src/shared/hooks/useStorage"
import { Vocabulary, vocabularyStorage } from "@root/src/shared/storages/VocabularyStorage"
import { IconTransformFilled } from "@tabler/icons-react"
import { useState } from "react"
import { createRoot } from "react-dom/client"
import { isValidWord } from "../utils"
import SentencePanel from "./SentencePanel"
import WordPanel, { WordPanelError } from "./WordPanel"

export function TransWordBtn(props: { selection: Selection }) {
  const vocabulary = useStorage(vocabularyStorage)
  const { selection } = props
  const selectedStr = selection.toString().trim().toLowerCase()
  const [thinking, setThinking] = useState(false)

  async function handleClick() {
    setThinking(true)
    const container = document.getElementById("canger-root").shadowRoot.getElementById("canger-trans-container")
    const root = createRoot(container)
    const wordStorage = vocabulary && vocabulary.find(w => w.word === selectedStr)
    let currentWord: Vocabulary

    // show different panel according to the type of the selected string
    if (isValidWord(selectedStr)) {
      // if the word has been stored, just render it
      if (wordStorage !== undefined) {
        currentWord = { ...wordStorage, o: wordStorage.o + 1 }
        setThinking(false)
        await vocabularyStorage.add(currentWord)
        root.render(<WordPanel vocabulary={currentWord} selection={selection} />)
      } else {
        const resp = await chrome.runtime.sendMessage({ type: "dictionary", message: selectedStr })
        const detail = resp.result
        if (detail.errorCode !== "0" || detail.isWord === false) {
          root.render(<WordPanelError selection={selection} />)
        } else {
          currentWord = { word: selectedStr, o: 1, detail: detail }
          setThinking(false)
          await vocabularyStorage.add(currentWord)
          root.render(<WordPanel vocabulary={currentWord} selection={selection} />)
        }
      }
    } else {
      // show sentence translate result panel
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
        }}
      >
        {thinking ? (
          <span className="loader"></span>
        ) : (
          <button
            onClick={async () => {
              await handleClick()
            }}
          >
            <IconTransformFilled size={24} />
            <span className="tooltip">翻译</span>
          </button>
        )}
      </div>
    </>
  )
}
