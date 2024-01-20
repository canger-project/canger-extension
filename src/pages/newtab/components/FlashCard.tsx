import { Box, Card, CardBody, Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { useState } from "react"
import ReactCardFlip from "react-card-flip"
/* 单词卡 */

export default function FlashCard(props: { word: Vocabulary }) {
  const { word } = props
  const [flip, setFlip] = useState(false)

  const detail = word.detail
  const explains = detail.basic.explains ? (
    detail.basic.explains.map((item: string, index) => {
      // 取；前 3 个
      const explain = item.split("；", 3).join("；")
      return <div key={index}>{explain}</div>
    })
  ) : (
    <div></div>
  )

  const handleFlip = () => {
    setFlip(!flip)
  }

  return (
    <Box width="600px">
      <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <div>
          <Card h="240">
            <CardBody>
              <Grid h="100%" templateRows="repeat(3, 1fr)" templateColumns="repeat(1, 1fr)">
                <GridItem>
                  <Phonetics detail={detail} />
                </GridItem>
                <GridItem rowSpan={2} onClick={handleFlip}>
                  <Heading size="xl" textAlign="center">
                    {word.word}
                  </Heading>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </div>
        <div onClick={handleFlip}>
          <Card h="240">
            <CardBody display="flex" justifyContent="center" alignItems="center">
              <Flex fontSize="lg" direction="column">
                {explains}
              </Flex>
            </CardBody>
          </Card>
        </div>
      </ReactCardFlip>
    </Box>
  )
}

function Phonetics(props: { detail: any }) {
  const { detail } = props
  return (
    <div className="word-phonetics">
      <Phonetic type="us" phonetic={detail.basic["us-phonetic"]} speechUrl={detail.basic["us-speech"]} />
      <Phonetic type="uk" phonetic={detail.basic["uk-phonetic"]} speechUrl={detail.basic["uk-speech"]} />
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
        marginRight: "6px",
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
        <path d="M18 8a3 3 0 0 1 0 6" />
        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
        <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
      </svg>
      {typeCN}[{phonetic}]
    </span>
  )
}
