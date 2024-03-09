import { Vocabulary, vocabularyStorage } from "@root/src/shared/storages/VocabularyStorage"
import { Container } from "."

export default async function BiliBiliContentFlow(domain: string) {
  const vocabulary = await vocabularyStorage.getsAllNewWord()

  const domainUrl = new URL(domain)
  switch (domainUrl.hostname) {
    case "www.bilibili.com": {
      const stream = document.getElementsByClassName("container")[0]
      stream.insertBefore(Container(<Card word={vocabulary[0]} />), stream.children[0])
      break
    }
    default: {
      break
    }
  }
}

function Card(props: { word: Vocabulary }) {
  const word = props.word
  const explains = word.detail.basic.explains.map((explain, index) => {
    return <p key={index}>{explain}</p>
  })

  return (
    <div className="feed-card">
      <h2 style={{ fontSize: "24px" }}>{word.word}</h2>
      {explains}
      <div className="bili-video-card__image--link"></div>
      <div className="bili-video-card__info"></div>
    </div>
  )
}
