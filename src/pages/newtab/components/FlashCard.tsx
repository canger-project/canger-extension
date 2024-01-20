import { Alert, AlertIcon, Box, Card, CardBody, Flex, Heading, Kbd } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { useEffect, useState } from "react"
import ReactCardFlip from "react-card-flip"
import Phonetics from "./Phonetics"

/* 单词卡 */
export default function FlashCard(props: { word: Vocabulary }) {
  const { word } = props
  const [flip, setFlip] = useState(false)
  const [flipEnabled, setFlipEnabled] = useState(true)

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

  useEffect(() => {
    const handleKeyUp = e => {
      if (e.code === "Space") {
        setFlip(!flip)
      }
    }
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [flip])

  const handleFlip = () => {
    setFlip(!flip)
  }

  return (
    <Box className="flash-card">
      <ReactCardFlip isFlipped={flipEnabled && flip} flipDirection="vertical">
        <div onClick={flipEnabled && handleFlip} id="flash-card-front">
          <Card h="280">
            <CardBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="4">
              <Heading size="2xl" textAlign="center">
                {word.word}
              </Heading>
              <Phonetics
                detail={detail}
                enableFlip={() => {
                  setFlipEnabled(false)
                }}
                disableFlip={() => {
                  setFlipEnabled(true)
                  setFlip(false)
                }}
              />
            </CardBody>
          </Card>
        </div>
        <div onClick={handleFlip} id="flash-card-back">
          <Card h="280">
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

function PromptBar() {
  return (
    <Alert status="info">
      <AlertIcon />
      <Box>
        <Kbd>Space</Kbd> 翻转卡片 / <Kbd>←</Kbd> 上一个 / <Kbd>→</Kbd> 下一个
      </Box>
    </Alert>
  )
}
