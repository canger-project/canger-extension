import { Heading, Icon } from "@chakra-ui/react"
import { IconMoodHappy } from "@tabler/icons-react"
import moment from "moment"

export default function Hello(props: { HasNewWords: boolean }) {
  const { HasNewWords } = props

  const sayHello = () => {
    switch (moment().hour()) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 21:
      case 22:
      case 23:
        return "夜深了"
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
      default:
        return ""
    }
  }

  return (
    <Heading size="md" display="flex" justifyContent="center" alignItems="center" my="6">
      {sayHello()}
      {HasNewWords && "，背会单词吧"}
      <Icon as={IconMoodHappy} boxSize="6" />
    </Heading>
  )
}
