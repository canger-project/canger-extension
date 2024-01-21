import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import { IconVolume } from "@tabler/icons-react"

type PhoneticType = "us" | "uk"

export default function Phonetics(props: { detail: any; enableFlip: () => void; disableFlip: () => void }) {
  const { detail, enableFlip, disableFlip } = props
  return (
    <Flex gap="2" alignItems="center">
      <Phonetic
        type="us"
        phonetic={detail.basic["us-phonetic"]}
        speechUrl={detail.basic["us-speech"]}
        enableFlip={enableFlip}
        disableFlip={disableFlip}
      />
      <Phonetic
        type="uk"
        phonetic={detail.basic["uk-phonetic"]}
        speechUrl={detail.basic["uk-speech"]}
        enableFlip={enableFlip}
        disableFlip={disableFlip}
      />
    </Flex>
  )
}

function Phonetic(props: {
  type: PhoneticType
  phonetic: string
  speechUrl: string
  enableFlip: () => void
  disableFlip: () => void
}) {
  const { type, phonetic, speechUrl, enableFlip, disableFlip } = props
  const typeCN = { us: "美", uk: "英" }[type]

  function handleClick() {
    enableFlip()
    const audio = new Audio(speechUrl)
    audio.play()
  }

  return (
    <Box
      gap="1"
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "6px",
      }}
      onClick={handleClick}
      onMouseLeave={() => {
        disableFlip()
      }}
    >
      <IconButton
        aria-label="volume"
        icon={<IconVolume size="18" />}
        isRound={true}
        colorScheme="blue"
        variant="outline"
        size="xs"
      />
      <Text fontSize="md">
        {typeCN}[{phonetic}]
      </Text>
    </Box>
  )
}
