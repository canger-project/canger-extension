import { getSelectionPosition } from "../utils"

// 单词面板
export default function WordPanel(props: { wordDetail: any; selection: Selection }) {
  const { wordDetail, selection } = props
  const { top, left } = getSelectionPosition(selection)

  const explains = wordDetail.basic.explains.map((item, index) => {
    return <div key={index}>{item}</div>
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
      }}>
      <div className="word">{wordDetail.translation[0]}</div>
      <div className="phonetic">
        {usPhonetic && <Phonetic type="us" phonetic={usPhonetic} speechUrl={wordDetail.basic["us-speech"]} />}
        {ukPhonetic && <Phonetic type="uk" phonetic={ukPhonetic} speechUrl={wordDetail.basic["uk-speech"]} />}
      </div>
      <div className="explains">{explains}</div>
    </div>
  )
}

function Phonetic(props: { type: "us" | "uk"; phonetic: string; speechUrl: string }) {
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
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 8a3 3 0 0 1 0 6" />
        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
        <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
      </svg>
      {typeCN}[{phonetic}]
    </span>
  )
}
