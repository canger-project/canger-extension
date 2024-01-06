import { Card, CardBody, CardHeader, Link as ChakraLink, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { IconBrandGithub } from "@tabler/icons-react"

export default function About() {
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
