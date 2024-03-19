import Logo from "@assets/img/logo.svg"
import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { Container, Density } from "."
import { InsertWordsByDensity } from "../utils"

export async function V2exContentFlow(domain: string, words: Vocabulary[], density: Density) {
  if (words.length > 0) {
    const domainUrl = new URL(domain)
    switch (domainUrl.hostname) {
      case "www.v2ex.com": {
        if (domainUrl.pathname === "/") {
          const stream = document.getElementById("Main").getElementsByClassName("box")[0]
          InsertWordsByDensity(density, stream, ["cell", "item"], words, word => {
            return Container(<Item word={word} />)
          })
        }

        break
      }
      default: {
        break
      }
    }
  }
}

function Item(props: { word: Vocabulary }) {
  const { word } = props
  return (
    <div className="cell item">
      <table cellPadding={0} cellSpacing="0" border={0} width="100%">
        <tbody>
          <tr>
            <td width="48" valign="top" align="center">
              <a href="#">
                <img
                  src={Logo}
                  className="avatar"
                  width="48"
                  style={{ width: "48px", maxHeight: "48px" }}
                  alt="monkeyWie"
                />
              </a>
            </td>
            <td width="10"></td>
            <td width="auto" valign="middle">
              <span className="item_title">
                <div className="topic-link">
                  [{word.word}] {word.detail.basic.explains}
                </div>
              </span>
              <div className="sep5"></div>
              <span className="topic_info">
                <div className="votes"></div>
                <a className="node" href="#">
                  单词
                </a>{" "}
                &nbsp;•&nbsp;{" "}
                <strong>
                  <a href="#">canger</a>
                </strong>{" "}
                &nbsp;•&nbsp; <span>几秒前</span>
              </span>
            </td>
            <td width="70" align="right" valign="middle">
              <a href="/t/1024935#reply116" className="count_livid">
                116
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
