import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import youdaoStorage from "@root/src/shared/storages/YoudaoStorage"
import chatGPTApiStorage from "@root/src/shared/storages/chatGPTStorage"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"

export default function Settings() {
  return (
    <Flex gap="4" direction="column">
      <ChatGPT />
      <Youdao />
      <DisabledDomain />
      {/* TODO: 是否过滤中文网站 */}
    </Flex>
  )
}

function ChatGPT() {
  const chatgptapi = useStorage(chatGPTApiStorage)
  const toast = useToast()

  function handleKeyInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    chatGPTApiStorage.add(e.target.value)
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
        <Heading size="md">设置 ChatGPT</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>ChatGPT API Key</FormLabel>
          <Input type="text" value={chatgptapi} onChange={handleKeyInput} />
          <FormHelperText>We will never share your key.</FormHelperText>
        </FormControl>
      </CardBody>
    </Card>
  )
}

function Youdao() {
  const youdao = useStorage(youdaoStorage)
  const toast = useToast()

  function handleSecretInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    youdaoStorage.add({ appId: youdao.appScrect, appScrect: e.target.value })

    toast({
      title: `已保存`,
      position: "top",
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }

  function handleIDInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    youdaoStorage.add({ appId: e.target.value, appScrect: youdao.appScrect })

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
        <Heading size="md">设置有道词典</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>App ID</FormLabel>
          <Input type="text" value={youdao.appId} onChange={handleIDInput} />
          <FormHelperText>We will never share your key.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>App Secret</FormLabel>
          <Input type="text" value={youdao.appScrect} onChange={handleSecretInput} />
          <FormHelperText>We will never share your key.</FormHelperText>
        </FormControl>
      </CardBody>
    </Card>
  )
}

function DisabledDomain() {
  const [domain, setDomain] = useState("")
  const disabledDomain = useStorage(disabledDomainStorage)
  const toast = useToast()

  return (
    <Card id="disabled-domain">
      <CardHeader>
        <Heading size="md">设置需过滤的域名</Heading>
      </CardHeader>
      <CardBody>
        <FormControl display="flex" gap="2">
          <Input type="text" value={domain} onChange={e => setDomain(e.target.value)} />
          <Button
            onClick={() => {
              disabledDomainStorage.add(domain)
              toast({
                title: `添加成功`,
                position: "top",
                status: "success",
                duration: 1000,
                isClosable: true,
              })
            }}>
            添加
          </Button>
        </FormControl>
        <Box>
          {disabledDomain.map(domain => (
            <Flex key={domain} align="center" justify="space-between" my="2">
              <Text fontSize="md">{domain}</Text>
              <Button
                onClick={() => {
                  disabledDomainStorage.remove(domain)
                  toast({
                    title: `已删除`,
                    position: "top",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  })
                }}>
                <IconTrash />
              </Button>
            </Flex>
          ))}
        </Box>
      </CardBody>
    </Card>
  )
}
