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
  InputGroup,
  InputRightElement,
  Switch,
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
      <DisableCNDomain />
      {/* TODO: 或许在高级设置中可以自定义？ */}
      {/* <ChatGPT /> */}
      {/* <Youdao /> */}
      <DisabledDomain />
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
        <Heading size="md">ChatGPT</Heading>
        <Text fontSize="sm">段落翻译和输入优化功能依赖于 ChatGPT, 请填入对应的秘钥。</Text>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>API Key</FormLabel>
          <SecretInput value={chatgptapi} handleChange={handleKeyInput} />
          <FormHelperText>您的秘钥会被存储在本地。</FormHelperText>
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
        <Heading size="md">有道词典</Heading>
        <Text fontSize="sm">划词翻译功能使用的是有道词典，请自行搜索相关教程，获取应用 ID 和秘钥。</Text>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>App ID</FormLabel>
          <SecretInput value={youdao.appId} handleChange={handleIDInput} />
        </FormControl>
        <FormControl>
          <FormLabel>App Secret</FormLabel>
          <SecretInput value={youdao.appScrect} handleChange={handleSecretInput} />
          <FormHelperText>您的秘钥会被存储在本地。</FormHelperText>
        </FormControl>
      </CardBody>
    </Card>
  )
}

function SecretInput(props: { value: string; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const { value, handleChange } = props
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={value}
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

function DisabledDomain() {
  const [domain, setDomain] = useState("")
  const disabledDomain = useStorage(disabledDomainStorage)
  const toast = useToast()

  function handleClick(e) {
    e.preventDefault()

    let domainOrigin: string
    try {
      domainOrigin = new URL(domain).origin
      disabledDomainStorage.add(domainOrigin)
      toast({
        title: `添加成功`,
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: `请检查域名是否正确`,
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    }
  }

  return (
    <Card id="disabled-domain">
      <CardHeader>
        <Heading size="md">网站黑名单</Heading>
        <Text pt="2" fontSize="sm">
          您可以在此处添加域名，来禁止在该网站运行（内容流背单词功能不会被关闭）。比如：https://douban.com。
        </Text>
      </CardHeader>
      <CardBody>
        <FormControl display="flex" gap="2">
          <Input type="text" value={domain} onChange={e => setDomain(e.target.value)} />
          <Button onClick={handleClick}>添加</Button>
        </FormControl>
        <Box>
          {disabledDomain.length > 0 ? (
            disabledDomain.map(domain => (
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
            ))
          ) : (
            <Text fontSize="md" textAlign="center" my="12">
              暂无黑名单
            </Text>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}

function DisableCNDomain() {
  function handleSwitch(e) {}
  return (
    <Card>
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading size="md">仅英文网站</Heading>
            <Text fontSize="sm">仅在目标网页为英文时才开启（背词模式不受影响）</Text>
          </Box>
          <Switch onChange={e => handleSwitch(e)} isChecked={false} />
        </Flex>
      </CardBody>
    </Card>
  )
}
