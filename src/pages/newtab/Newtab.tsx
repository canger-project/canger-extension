import { Box, Card, CardBody, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import withErrorBoundary from "@root/src/shared/hoc/withErrorBoundary"
import withSuspense from "@root/src/shared/hoc/withSuspense"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { IconChecks, IconConfetti, IconMoodHappy, IconX } from "@tabler/icons-react"
import moment from "moment"
import { useEffect, useState } from "react"
import FlashCard from "./components/FlashCard"

function Newtab() {
  const commonConfig = useStorage(commonStorage)

  const [photo, setPhoto] = useState("")
  const [success, setSuccess] = useState(false)
  // 背词次数
  const [count, setCount] = useState(0)
  const [currentword, setCurrentword] = useState<Vocabulary>()
  const [unknowWords, setUnknowWords] = useState([])

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "photo", message: "" }, resp => {
      setPhoto(resp.result)
    })

    async function setWord() {
      const newWord = await vocabularyStorage.getTopNewWord()
      console.info(currentword)
      setCurrentword(newWord)
    }
    setWord()
  }, [])

  const sayHello = () => {
    switch (moment().hour()) {
      case 0:
      case 1:
      case 2:
        return "夜深了，早点休息"
      case 3:
      case 4:
      case 5:
        return "凌晨了，早点休息"
      case 6:
      case 7:
      case 8:
        return "早上好"
      case 9:
      case 10:
      case 11:
        return "上午好"
      case 12:
      case 13:
      case 14:
        return "中午好"
      case 15:
      case 16:
      case 17:
        return "下午好"
      case 18:
      case 19:
      case 20:
        return "晚上好"
      case 21:
      case 22:
      case 23:
        return "夜深了，早点休息"
      default:
        return "早上好"
    }
  }

  async function handleKnow() {
    // 从单词本中随机取一个单词
    const newWord = await vocabularyStorage.getTopNewWord()
    if (count < commonConfig.dailyWordNum) {
      await vocabularyStorage.add({ ...currentword, o: 0 })
      setCount(count + 1)
      setCurrentword(newWord)
    } else if (unknowWords.length > 0) {
      setCurrentword(unknowWords.pop())
      setUnknowWords(unknowWords)
    } else {
      setSuccess(true)
    }
  }

  const handleUnknow = () => {
    setUnknowWords([...unknowWords, currentword])
    handleKnow()
  }

  return (
    <Box
      className="App"
      width="100vw"
      height="100vh"
      backgroundImage={`url(${photo})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex gap={6} direction="column" alignItems="center" justifyContent="center" color="white">
        <Clock />
        <Heading size="md" display="flex" justifyContent="center" alignItems="center" my="6">
          {currentword ? "美好的一天从背单词开始吧" : sayHello()}
          <Icon as={IconMoodHappy} boxSize="6" />
        </Heading>

        {success ? (
          <Card width="100%">
            <CardBody display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Icon as={IconConfetti} boxSize="24" color="#ef4444" />
              <Text fontSize="lg">恭喜你全都背完了！</Text>
            </CardBody>
          </Card>
        ) : (
          <>
            {currentword && (
              <Box>
                (<FlashCard word={currentword} />
                <Flex justifyContent="space-around" my="12">
                  <Icon as={IconX} boxSize="32px" onClick={handleUnknow} className="icon" />
                  <Icon as={IconChecks} boxSize="32px" onClick={handleKnow} className="icon" />
                </Flex>
                )
              </Box>
            )}
          </>
        )}
      </Flex>
    </Box>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setTime(new Date())
    }, 1000)
  }, [])
  return (
    <Heading size="3xl" fontWeight="800">
      {moment(time).format("HH:mm")}
    </Heading>
  )
}

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>)
