import { Vocabulary, vocabularyStorage } from "@root/src/shared/storages/VocabularyStorage"

/* 单词面板 */
export default function Panel(props: { word: Vocabulary; mainStyle: any }) {
  const { word, mainStyle } = props
  const style = {
    ...mainStyle,
    padding: "12px",
    color: "#020617",
    background: "white",
    border: "1px solid #eee",
    borderRadius: "4px",
  }

  const wordDetail = word.detail
  const usPhonetic = wordDetail.basic["us-phonetic"]
  const ukPhonetic = wordDetail.basic["uk-phonetic"]
  const explains = wordDetail.basic.explains ? (
    wordDetail.basic.explains.map((item: string, index) => {
      // 取；前 3 个
      const explain = item.split("；", 3).join("；")
      return <div key={index}>{explain}</div>
    })
  ) : (
    <div></div>
  )

  async function handleClick(e) {
    await vocabularyStorage.add({ ...word, o: 0 })
    // remove all
    Array.from(document.getElementsByClassName(`canger-word-${word.word}`)).forEach(ele => {
      ele.remove()
    })
  }

  return (
    <div className={`canger-word-${word.word} canger-word-panel`} style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#020617",
            fontSize: "1.5em",
            fontWeight: 700,
          }}
        >
          {word.word}
        </h2>
        <span
          onClick={async e => {
            await handleClick(e)
          }}
        >
          <svg
            onMouseOver={e => {
              e.currentTarget.style.color = "#FF0000"
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = "#020617"
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 12l5 5l10 -10" />
            <path d="M2 12l5 5m5 -5l5 -5" />
            <span className="tooltip">翻译</span>
          </svg>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "4px 0",
          color: "#64748b",
        }}
      >
        {usPhonetic && <Phonetic type="us" phonetic={usPhonetic} speechUrl={wordDetail.basic["us-speech"]} />}
        {ukPhonetic && <Phonetic type="uk" phonetic={ukPhonetic} speechUrl={wordDetail.basic["uk-speech"]} />}
      </div>
      <div>{explains}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          color: "#64748b",
        }}
      >
        查词次数 {word.o}
      </div>
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
    <span
      style={{
        display: "flex",
        alignItems: "center",
        margin: "0 4px",
      }}
    >
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
