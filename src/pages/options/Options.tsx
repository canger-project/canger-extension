import React from "react"
import "@pages/options/Options.css"
import {
  Box,
  Button,
  ButtonGroup,
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
  Spacer,
  Image,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react"
import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import { IconTrash, IconBrandGithub } from "@tabler/icons-react"
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom"
import chatGPTApiStorage from "@root/src/shared/storages/chatGPTStorage"
import brand from "@assets/img/brand.jpg"
import logo from "@assets/img/logo.svg"

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
        <Flex alignItems="center" justifyContent="center" gap="2" mb="12px">
          <Image src={logo} alt="canger" boxSize="32px" />
          <Text fontSize={"xl"}>苍耳 Canger</Text>
        </Flex>
        <Flex
          direction={"column"}
          justifyContent="space-between"
          style={{
            minHeight: "calc(100vh - 120px)",
          }}>
          <Box display="flex" flexDirection="column" gap="2">
            <Button>
              <Link to={`/`}>设置</Link>
            </Button>
            <Button>
              <Link to={`/about`}>关于</Link>
            </Button>
          </Box>
          <Flex alignItems="center" gap="2" justifyContent="center" textAlign="center">
            <Image src={brand} boxSize="32px"></Image>
            <Text fontSize="sm">山小出品</Text>
          </Flex>
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
  return (
    <Flex gap="4" direction="column">
      <Card>
        <CardHeader>
          <Heading size="md">苍耳的来历</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="md">
            在我小时候的记忆里，苍耳是一种恼人的叫不出名字的植物，但你几乎可以在任何地方看到它的身影。
            每次从田埂里穿过之后，身上便会挂满这种植物，那时候我尽力想把它们清理干净，却怎么也想不到长大后有些东西你怎么拼命也抓不住。
          </Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading size="md">参与苍耳</Heading>
        </CardHeader>
        <CardBody>
          <Flex direction="column" gap="2">
            <Text fontSize="md">
              苍耳旨在帮助你用更好的方式学习英语，在浏览网页的任何时候，你都可以使用苍耳来帮助你翻译、交流、优化你的表达，提升你的英语水平。
              希望它成为你趁手且不可获取的工具。
            </Text>
            <Text fontSize="md">本项目完全开源，如果你觉得做的还不错，欢迎 Star 和贡献。</Text>
            <ChakraLink href="https://github.com/ischaojie/canger-extension" target="_blank">
              <Icon as={IconBrandGithub} boxSize="32px" />
            </ChakraLink>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
