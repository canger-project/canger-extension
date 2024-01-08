import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"

export default function Panel(props: { word: Vocabulary; mainStyle: any }) {
  const { word, mainStyle } = props
  const wordDetail = word.detail

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
    <div className={`canger-word-${word.word}`} style={mainStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h2
          style={{
            color: "black",
            fontWeight: 500,
          }}>
          {word.word}
        </h2>
        <div>查词次数 {word.o}</div>
      </div>
      <div>{explains}</div>
      <button
        style={{
          textAlign: "center",
        }}
        onClick={async e => {
          await handleClick(e)
        }}>
        学会了
      </button>
    </div>
  )
}
