import { Heading } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"

export default function Clock() {
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
