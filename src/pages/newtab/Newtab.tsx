import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Heading, Icon, IconButton, Text } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import withErrorBoundary from "@root/src/shared/hoc/withErrorBoundary"
import withSuspense from "@root/src/shared/hoc/withSuspense"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import vocabularyStorage, { Vocabulary } from "@root/src/shared/storages/VocabularyStorage"
import { IconConfetti, IconMoodHappy, IconSettings } from "@tabler/icons-react"
import moment from "moment"
import { useEffect, useState } from "react"

function Newtab() {
  const commonConfig = useStorage(commonStorage)
  const vocabulary = useStorage(vocabularyStorage)
  const [photo, setPhoto] = useState("")
  const [success, setSuccess] = useState(false)
  // 背词次数
  const [count, setCount] = useState(0)
  const [currentword, setCurrentword] = useState(vocabulary[0])
  console.log(vocabulary)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "photo", message: "" }, resp => {
      setPhoto(resp.result)
    })
  }, [])

  // TODO: 取词规则梳理
  async function handleClick() {
    // 从单词本中随机取一个单词
    const index = Math.floor(Math.random() * vocabulary.length)
    const word = vocabulary[index]
    if (count < commonConfig.dailyWordNum) {
      setCurrentword(word)
      await vocabularyStorage.add({ ...word, o: 0 })
      setCount(count + 1)
    } else {
      setSuccess(true)
    }
  }

  const handleSettings = event => {
    event.preventDefault()

    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL("options.html"), "_blank")
    }
  }

  return (
    <Grid
      className="App"
      templateColumns="repeat(6, 1fr)"
      gap={6}
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        color: "white",
      }}>
      <GridItem
        colSpan={2}
        colStart={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%">
        <Clock />
        <Heading size="md" display="flex" justifyContent="center" alignItems="center" my="6">
          美好的一天从背单词开始吧
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
          <Box width="100%">
            <WordPanel word={currentword} />
            <Flex justifyContent="space-around" alignItems="center" py="8" gap="8">
              <Button w="100%">先跳过</Button>
              <Button w="100%" onClick={async () => await handleClick()}>
                学会了
              </Button>
            </Flex>
          </Box>
        )}
      </GridItem>
      <GridItem colSpan={1} colStart={6} display="flex" justifyContent="right" alignItems="start" m="2">
        <IconButton
          icon={<IconSettings />}
          fontSize="20px"
          onClick={handleSettings}
          isRound={true}
          aria-label="settings"
          variant="outline"
          color="white"
        />
      </GridItem>
    </Grid>
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

function WordPanel(props: { word: Vocabulary }) {
  const { word } = props
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
  return (
    <Card>
      <CardBody>
        <Heading size="md">{word.word}</Heading>
        <Phonetics detail={detail} />
        <Box fontSize="lg">{explains}</Box>
      </CardBody>
    </Card>
  )
}

function Phonetics(props: { detail: any }) {
  const { detail } = props
  return (
    <div
      style={{
        display: "flex",
        color: "#64748b",
        margin: "12px 0",
        fontSize: "12px",
      }}>
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
      }}>
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
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 8a3 3 0 0 1 0 6" />
        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
        <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
      </svg>
      {typeCN}[{phonetic}]
    </span>
  )
}

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>)
