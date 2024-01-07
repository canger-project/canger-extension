import Logo from "@assets/img/logo.svg"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { ReactNode } from "react"
import { createRoot } from "react-dom/client"

export async function DoubanContentFlow() {
  const vocabulary = await vocabularyStorage.getsByO()
  const stream = document.getElementsByClassName("stream-items")[0]
  // TODO: 控制插入频率
  stream.insertBefore(Container(<Douban word={vocabulary[0]} />), stream.firstChild)
  stream.insertBefore(Container(<Douban word={vocabulary[1]} />), stream.lastChild)
}

function Container(reactNode: ReactNode) {
  const container = document.createElement("div")
  const root = createRoot(container)
  root.render(reactNode)
  return container
}

function Douban(props: { word: Vocabulary }) {
  const { word } = props
  const wordDetail = word.detail

  const explains = wordDetail.basic.explains.map((item, index) => {
    return <div key={index}>{item}</div>
  })

  function handleClick(e) {
    e.preventDefault()
    vocabularyStorage.add({ ...word, o: 0 })
    document.getElementById(`canger-word-${word.word}`).remove()
  }

  return (
    <div
      id={`canger-word-${word.word}`}
      className="new-status status-wrapper saying"
      style={{
        padding: "20px 0",
      }}>
      <div className="status-item">
        <div className="mod">
          <div className="hd">
            <div className="usr-pic">
              <a href="" title="苍耳">
                <img src={Logo} alt="苍耳" />
              </a>
            </div>

            <div className="text">
              <a href="" className="lnk-people">
                苍耳
              </a>
              &nbsp;背个单词吧
            </div>
          </div>

          <div className="bd sns">
            <div
              className="status-saying"
              style={{
                background: "#f9f9f9",
                padding: "16px 20px",
              }}>
              <blockquote className="">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <h2
                    style={{
                      color: "#37a",
                    }}>
                    {word.word}
                  </h2>
                  <div>查词次数: {word.o}</div>
                </div>

                {explains}
              </blockquote>
            </div>
            <div className="actions">
              <a href="" className="btn" onClick={handleClick}>
                学会了
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
