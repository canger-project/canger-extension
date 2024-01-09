import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import wordflowStorage from "@root/src/shared/storages/WordFlowStorage"

export default function Words() {
  return (
    <Flex gap="4" direction="column">
      <Density />
      <SupportedDomain />
    </Flex>
  )
}

function SupportedDomain() {
  const toast = useToast()
  const domains = useStorage(wordflowStorage)
  const domainZHMap = new Map([["douban", "豆瓣"]])

  function handleToggle(e, domain) {
    wordflowStorage.add({ ...domain, checked: e.target.checked })
    toast({
      title: `已保存`,
      position: "top",
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">网站集成</Heading>
        <Text pt="2" fontSize="sm">
          开启后苍耳会自动在你浏览的内容前后插入生词模块（基于你的查词频率），帮助你随时随地记单词。
        </Text>
        <Text pt="2" fontSize="sm">
          更多网站支持正在开发中，欢迎提出建议。
        </Text>
      </CardHeader>
      <CardBody>
        <Box>
          {domains.map(domain => (
            <FormControl display="flex" alignItems="center" justifyContent="space-between" key={domain.name}>
              <FormLabel mb="0">{domainZHMap.get(domain.name)}</FormLabel>
              <Switch onChange={e => handleToggle(e, domain)} isChecked={domain.checked} />
            </FormControl>
          ))}
        </Box>
      </CardBody>
    </Card>
  )
}

function Density() {
  const toast = useToast()
  const commonConfig = useStorage(commonStorage)
  const options = ["low", "medium", "high"].map(option => {
    const selected = commonConfig.wordLearnDensity === option
    return (
      <option value={option} selected={selected} key={option}>
        {option}
      </option>
    )
  })

  return (
    <Card>
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading size="md">单词密度</Heading>
            <Text fontSize="sm">不同的密度对应单词在网站的不同出现频率</Text>
          </Box>

          <Select
            width="fit-content"
            onChange={async e => {
              await commonStorage.add("wordLearnDensity", e.target.value)
              toast({
                title: `已保存`,
                position: "top",
                status: "success",
                duration: 1000,
                isClosable: true,
              })
            }}>
            {options}
          </Select>
        </Flex>
      </CardBody>
    </Card>
  )
}
