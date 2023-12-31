import React from "react"
import "@pages/options/Options.css"
import {
  Box,
  Button,
  Text,
  Flex,
  FormLabel,
  FormControl,
  FormHelperText,
  Divider,
  Heading,
  Grid,
  GridItem,
  Input,
  Card,
  CardHeader,
  CardBody,
  useToast,
} from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import { IconTrash } from "@tabler/icons-react"
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom"
import chatGPTApiStorage from "@root/src/shared/storages/chatGPTStorage"

const ROUTER_MAP = new Map([
  ["/", "设置"],
  ["/about", "关于"],
])

export const Options: React.FC = () => {
  return (
    <Box my="8">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  )
}

const Layout: React.FC = () => {
  const location = useLocation()

  return (
    <Grid gap={8} templateColumns="repeat(5, 1fr)" h={"200px"}>
      <GridItem rowSpan={2} colSpan={1} colStart={2} colEnd={3}>
        <Text fontSize={"xl"} mb="8" textAlign={"center"}>
          苍耳单词
        </Text>
        <Flex direction={"column"} gap={2}>
          <Button>
            <Link to={`/`}>设置</Link>
          </Button>
          <Button>
            <Link to={`/about`}>关于</Link>
          </Button>
        </Flex>
      </GridItem>

      <GridItem colSpan={2} colStart={3} colEnd={5} pl="2">
        <Text fontSize={"xl"}>{ROUTER_MAP.get(location.pathname)}</Text>
        <Divider my="4" />
        <Outlet />
      </GridItem>
    </Grid>
  )
}

function Settings() {
  return (
    <Flex gap="4" direction="column">
      <ChatGPT />
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

function DisabledDomain() {
  const [domain, setDomain] = React.useState("")
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

const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

function About() {
  return <div>This is about</div>
}
