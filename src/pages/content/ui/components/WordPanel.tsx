import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { getSelectionPosition } from "../utils"

// 单词面板
export default function WordPanel(props: { vocabulary: Vocabulary; selection: Selection | Range }) {
  const { vocabulary, selection } = props
  const wordDetail = vocabulary.detail
  const { top, left } = getSelectionPosition(selection)

  const explains = wordDetail.basic.explains.map((explain, index) => {
    return <div key={index}>{explain.split("；", 3).join("；")}</div>
  })
  const usPhonetic = wordDetail.basic["us-phonetic"]
  const ukPhonetic = wordDetail.basic["uk-phonetic"]

  return (
    <div
      className="word-panel"
      style={{
        position: "absolute",
        top: top + 24 + "px",
        left: left + "px",
        zIndex: 999999,
      }}
    >
      <div className="word-header">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
          }}
        >
          <span className="word">{vocabulary.word.charAt(0).toUpperCase() + vocabulary.word.slice(1)}</span>
          <span
            className="word-o"
            style={{
              color: "#6366f1",
              fontSize: "12px",
              fontWeight: 900,
            }}
          >
            +{vocabulary.o}
          </span>
        </div>
      </div>
      <div className="phonetic">
        {usPhonetic && <Phonetic type="us" phonetic={usPhonetic} speechUrl={wordDetail.basic["us-speech"]} />}
        {ukPhonetic && <Phonetic type="uk" phonetic={ukPhonetic} speechUrl={wordDetail.basic["uk-speech"]} />}
      </div>
      <div
        className="explains"
        style={{
          textAlign: "justify",
        }}
      >
        {explains}
      </div>
    </div>
  )
}

// 音标
export function Phonetic(props: { type: "us" | "uk"; phonetic: string; speechUrl: string }) {
  const { type, phonetic, speechUrl } = props
  const typeCN = { us: "美", uk: "英" }[type]

  function handleClick() {
    const audio = new Audio(speechUrl)
    audio.play()
  }

  return (
    <span>
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 8a5 5 0 0 1 0 8" />
        <path d="M17.7 5a9 9 0 0 1 0 14" />
        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
      </svg>
      {typeCN}[{phonetic}]
    </span>
  )
}
