import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import { IconPacman } from "@tabler/icons-react"
import moment from "moment"

export default function Progress() {
  const commonConfig = useStorage(commonStorage)
  const day = moment().format("YYYYMMDD")
  const dailyLearned = commonConfig.dailyLearnedWordNum[day] || 0

  return (
    <Flex justifyContent="center" alignItems="center" gap="4" mb="6px">
      <Slider
        aria-label="slider-ex-1"
        value={dailyLearned}
        min={0}
        max={commonConfig.dailyWordNum}
        colorScheme="indigo"
      >
        <SliderTrack bg="indigo.100">
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box as={IconPacman} color="indigo.600" />
        </SliderThumb>
      </Slider>
      <Text>
        {dailyLearned}/{commonConfig.dailyWordNum}
      </Text>
    </Flex>
  )
}
