import { Box, Card, CardBody, Flex, Icon, IconButton, Text, Tooltip, useColorModeValue } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import withErrorBoundary from "@root/src/shared/hoc/withErrorBoundary"
import withSuspense from "@root/src/shared/hoc/withSuspense"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { IconChecks, IconConfetti, IconX } from "@tabler/icons-react"
import moment from "moment"
import { useEffect, useState } from "react"
import Clock from "./components/Clock"
import FlashCard from "./components/FlashCard"
import Hello from "./components/Hello"
import Progress from "./components/Progress"

const day = moment().format("YYYYMMDD")

function Newtab() {
  const bg = useColorModeValue("slate.200", "slate.900")
  const commonConfig = useStorage(commonStorage)

  const [photo, setPhoto] = useState("")
  const [success, setSuccess] = useState(false)

  const [allNewWords, setAllNewWords] = useState<Vocabulary[]>([])
  // 背词次数
  const [count, setCount] = useState(commonConfig.dailyLearnedWordNum[day] || 0)
  // 单词卡动画
  const [cardAnimate, setCardAnimate] = useState(false)
  // 当前单词
  const [currentWord, setCurrentWord] = useState<Vocabulary>()

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "photo", message: "" }, resp => {
      setPhoto(resp.result)
    })

    async function _setWords() {
      const newWords = await vocabularyStorage.getsAllNewWord()
      setAllNewWords(newWords)
      setCurrentWord(newWords.pop())
    }
    _setWords()
  }, [])

  async function handleWordRemember(remembered: boolean) {
    if (remembered) {
      await vocabularyStorage.add({ ...currentWord, o: 0 })
    }

    const newWordsTotal = await vocabularyStorage.newWordsTotal()
    if (count < Math.min(newWordsTotal, commonConfig.dailyWordNum)) {
      setCurrentWord(allNewWords.pop())
      if (remembered) {
        setCount(count + 1)
        const dailyLearnedWordNum = commonConfig.dailyLearnedWordNum || {}
        dailyLearnedWordNum[day] = count + 1
        await commonStorage.add("dailyLearnedWordNum", dailyLearnedWordNum)
      }
    } else {
      setSuccess(true)
    }
  }

  return (
    <Flex
      className="App"
      gap={6}
      width="100vw"
      height="100vh"
      bg={bg}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Clock />
      <Hello HasNewWords={true} />

      {success ? (
        <Card width="100%">
          <CardBody display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Icon as={IconConfetti} boxSize="24" color="#ef4444" />
            <Text fontSize="lg">恭喜你全都背完了！</Text>
          </CardBody>
        </Card>
      ) : (
        <>
          {currentWord && (
            <Box>
              <Progress count={count} />
              <div
                className={cardAnimate && "animate__animated animate__backOutRight animate__fast"}
                onAnimationEnd={() => {
                  handleWordRemember(true)
                  setCardAnimate(false)
                }}
              >
                <FlashCard word={currentWord} />
              </div>
              <Flex justifyContent="space-around" my="12">
                <Btn
                  name="先跳过"
                  icon={<IconX />}
                  handleClick={() => {
                    handleWordRemember(false)
                  }}
                />
                <Btn
                  name="已掌握"
                  icon={<IconChecks />}
                  handleClick={() => {
                    setCardAnimate(true)
                  }}
                />
              </Flex>
            </Box>
          )}
        </>
      )}
    </Flex>
  )
}

function Btn(props: { name: string; icon: JSX.Element; handleClick: () => void }) {
  const { name, icon, handleClick } = props

  return (
    <Tooltip label={name} fontSize="md">
      <IconButton
        colorScheme="blue"
        isRound={true}
        variant="outline"
        icon={icon}
        aria-label={name}
        size="lg"
        onClick={handleClick}
      />
    </Tooltip>
  )
}

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>)
