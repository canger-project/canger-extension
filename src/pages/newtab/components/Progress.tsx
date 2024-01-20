import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import { IconPacman } from "@tabler/icons-react"

export default function Progress(props: { count: number }) {
  const commonConfig = useStorage(commonStorage)
  const { count } = props

  return (
    <Slider aria-label="slider-ex-1" value={count} min={0} max={commonConfig.dailyWordNum}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6}>
        <Box as={IconPacman} color="#ef4444" />
      </SliderThumb>
    </Slider>
  )
}
