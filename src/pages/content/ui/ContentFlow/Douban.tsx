import Logo from "@assets/img/logo.svg"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { ReactNode } from "react"
import { createRoot } from "react-dom/client"
import Panel from "./Panel"

export async function DoubanContentFlow(domain: string, density: string) {
  const vocabulary = await vocabularyStorage.getsAllNewWord()

  if (vocabulary.length > 0) {
    const domainUrl = new URL(domain)
    switch (domainUrl.hostname) {
      case "www.douban.com": {
        if (domainUrl.pathname === "/") {
          const page = parseInt(domainUrl.searchParams.get("p") || "1", 10)

          const stream = document.getElementsByClassName("stream-items")[0]
          console.info("density: ", density)
          const d = () => {
            if (density === "low") {
              return 2
            } else if (density === "medium") {
              return ~~(stream.children.length / 3)
            } else if (density === "high") {
              return stream.children.length - 2
            }
          }
          vocabulary.slice(page, d() * page + d()).forEach((word, index) => {
            stream.insertBefore(
              Container(<Status word={word} />),
              stream.children[index * ~~(stream.children.length / d() + 1)],
            )
          })
        }
        break
      }
      case "movie.douban.com":
      case "book.douban.com": {
        const aside = document.getElementsByClassName("aside")[0]
        aside.insertBefore(
          Container(<Panel word={vocabulary[0]} mainStyle={{ marginBottom: "24px" }} />),
          aside.children[0],
        )
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
      }}
    >
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
            <Panel word={word} mainStyle={{ marginBottom: "24px" }} />
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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{word.word}</h2>
        <div>查词次数 {word.o}</div>
      </div>
      <div>{explains}</div>
    </div>
  )
}
