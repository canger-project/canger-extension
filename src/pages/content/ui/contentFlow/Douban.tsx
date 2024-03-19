import Logo from "@assets/img/logo.svg"
import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { Container, Density } from "."
import { InsertWordsByDensity } from "../utils"
import Panel from "./Panel"

export async function DoubanContentFlow(domain: string, words: Vocabulary[], density: Density) {
  // 从生词中取查词数最多的 n 个（由每日背词量控制），
  // 随机出现在内容流的不同位置（由设置中密度控制）
  if (words.length > 0) {
    const domainUrl = new URL(domain)
    switch (domainUrl.hostname) {
      case "www.douban.com": {
        if (domainUrl.pathname === "/") {
          const stream = document.getElementsByClassName("stream-items")[0]
          InsertWordsByDensity(density, stream, null, words, word => {
            return Container(<Status word={word} />)
          })
        }
        break
      }
      case "movie.douban.com":
      case "book.douban.com": {
        const aside = document.getElementsByClassName("aside")[0]
        aside.insertBefore(Container(<Panel word={words[0]} mainStyle={{ marginBottom: "24px" }} />), aside.children[0])
        break
      }
      default: {
        console.info(domain)
        break
      }
    }
  }
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
                苍耳单词
              </a>
              &nbsp;生词
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
