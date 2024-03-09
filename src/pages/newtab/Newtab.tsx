import SvgCollecting from "@assets/img/collecting.svg"
import SvgWinners from "@assets/img/winners.svg"
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import withErrorBoundary from "@root/src/shared/hoc/withErrorBoundary"
import withSuspense from "@root/src/shared/hoc/withSuspense"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import { Vocabulary, vocabularyStorage } from "@root/src/shared/storages/VocabularyStorage"
import { IconChecks, IconX } from "@tabler/icons-react"
import moment from "moment"
import { useEffect, useState } from "react"
import Clock from "./components/Clock"
import FlashCard from "./components/FlashCard"
import Hello from "./components/Hello"
import Progress from "./components/Progress"

const day = moment().format("YYYYMMDD")

function Newtab() {
  const bg = useColorModeValue("#f1f5f9", "#0f172a")
  const commonConfig = useStorage(commonStorage)
  const curDayLearnedWordCount = commonConfig.dailyLearnedWordNum[day] || 0

  const [success, setSuccess] = useState(false)

  const [allNewWords, setAllNewWords] = useState<Vocabulary[]>([])
  // 单词卡动画
  const [cardAnimate, setCardAnimate] = useState(false)
  // 当前单词
  const [currentWord, setCurrentWord] = useState<Vocabulary>()

  useEffect(() => {
    async function _setWords() {
      const newWords = await vocabularyStorage.getsAllNewWord()
      setAllNewWords(newWords)
      setCurrentWord(newWords.pop())
    }
    _setWords()

    if (curDayLearnedWordCount >= commonConfig.dailyWordNum) {
      setSuccess(true)
    }
  }, [])

  async function handleWordRemember(remembered: boolean) {
    if (remembered) {
      await vocabularyStorage.add({ ...currentWord, o: 0 })
    }

    if (curDayLearnedWordCount < commonConfig.dailyWordNum) {
      setCurrentWord(allNewWords.pop())
      if (remembered) {
        const dailyLearnedWordNum = commonConfig.dailyLearnedWordNum || {}
        dailyLearnedWordNum[day] = dailyLearnedWordNum[day] ? dailyLearnedWordNum[day] + 1 : 1
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

      <Box>
        <Progress />
        {success ? (
          <Card h="280px" w="600px">
            <CardBody display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="2">
              <Image src={SvgWinners} alt="winners" boxSize="150px" />
              <Text fontSize="lg">恭喜你全都背完了！</Text>
            </CardBody>
          </Card>
        ) : currentWord ? (
          <Box>
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
                  // FIXME: 未记住的单词，下次还会出现
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
        ) : (
          <Card h="280px" w="600px">
            <CardBody display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="2">
              <Image src={SvgCollecting} alt="collecting" boxSize="150px" />
              <Heading size="md">没有生词了，去积累一些吧！</Heading>
            </CardBody>
          </Card>
        )}
      </Box>
    </Flex>
  )
}

function Btn(props: { name: string; icon: JSX.Element; handleClick: () => void }) {
  const { name, icon, handleClick } = props

  return (
    <Tooltip label={name} fontSize="md">
      <IconButton
        colorScheme="indigo"
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
