import Logo from "@assets/img/logo.svg"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Panel from "./Panel"

export async function DoubanContentFlow(domain: string) {
  const vocabulary = await vocabularyStorage.getsByO()
  if (vocabulary.length > 0) {
    const hostname = new URL(domain).hostname
    console.info(domain)
    switch (hostname) {
      case "www.douban.com": {
        if (domain === "https://www.douban.com/") {
          const stream = document.getElementsByClassName("stream-items")[0]
          vocabulary.forEach((word, index) => {
            stream.insertBefore(Container(<Status word={word} />), stream.children[index * 3])
          })
        }
        break
      }
      case "movie.douban.com":
      case "book.douban.com": {
        const hotcomment = document.getElementById("hot-comments")
        const aside = document.getElementsByClassName("aside")[0]
        aside.insertBefore(
          Container(
            <Panel
              word={vocabulary[0]}
              mainStyle={{ padding: "20px 12px", marginBottom: "40px", background: "#F0F3F5", fontSize: "13px" }}
            />,
          ),
          aside.children[0],
        )
        vocabulary.forEach((word, index) => {
          hotcomment.insertBefore(
            Container(
              <Panel
                word={vocabulary[0]}
                mainStyle={{ padding: "20px 12px", marginBottom: "40px", background: "#F0F3F5", fontSize: "13px" }}
              />,
            ),
            hotcomment.children[index * 3],
          )
        })
        break
      }
      default: {
        console.info(domain)
        break
      }
    }
  }
}

function Container(reactNode: ReactNode) {
  const container = document.createElement("div")
  const root = createRoot(container)
  root.render(reactNode)
  return container
}

function Status(props: { word: Vocabulary }) {
  const { word } = props

  return (
    <div
      className={`new-status status-wrapper saying canger-word-${word.word}`}
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
            <Panel
              word={word}
              mainStyle={{ padding: "20px 12px", marginBottom: "40px", background: "#F0F3F5", fontSize: "13px" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Subject(props: { word: Vocabulary }) {
  const { word } = props
  const wordDetail = word.detail

  const explains = wordDetail.basic.explains ? (
    wordDetail.basic.explains.map((item, index) => {
      return <div key={index}>{item}</div>
    })
  ) : (
    <div></div>
  )
  return (
    <div
      style={{
        padding: "20px 12px",
        marginBottom: "40px",
        background: "#F0F3F5",
        fontSize: "13px",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h2>{word.word}</h2>
        <div>查词次数 {word.o}</div>
      </div>
      <div>{explains}</div>
    </div>
  )
}
