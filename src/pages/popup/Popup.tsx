import React, { ChangeEvent, useState, useEffect } from "react"
import "@pages/popup/Popup.css"
import useStorage from "@src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import withSuspense from "@src/shared/hoc/withSuspense"
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary"
import { IconSettings, IconExternalLink } from "@tabler/icons-react"
import { Box, Text, Flex, Switch, FormLabel, FormControl, Divider, Heading, Link, Icon, Image } from "@chakra-ui/react"

const Popup: React.FC = () => {
  const disabledDomain = useStorage(disabledDomainStorage)
  const [currentDomain, setCurrentDomain] = useState("")
  const [allow, setAllow] = useState(true)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, function (response) {
      const currentDomain = response.result

      setCurrentDomain(currentDomain)

      if (disabledDomain.includes(currentDomain)) {
        setAllow(false)
      }
    })
  }, [])

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, function (response) {
      const currentDomain = response.result
      if (event.target.checked) {
        disabledDomainStorage.add(currentDomain)
        setAllow(false)
      } else {
        disabledDomainStorage.remove(currentDomain)
        setAllow(true)
      }
    })
  }

  const handleSettings = event => {
    event.preventDefault()

    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL("options.html"))
    }
  }

  return (
    <Box>
      <Flex m="2" alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems="center">
          <Image src="/logo.svg" boxSize={6} />
          <Text fontSize="md">苍耳</Text>
        </Flex>
        <Icon
          as={IconSettings}
          boxSize={6}
          onClick={handleSettings}
          color="#1e293b"
          _hover={{
            color: "#020617",
          }}
        />
      </Flex>
      <Divider />
      <Box m="2" pb="2">
        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="canger-domain-allow" mb="0">
            <Text size="sm">允许在该网站运行</Text>
            <Link fontSize="xs" isExternal display={"flex"} alignItems={"center"} onClick={handleSettings}>
              设置更多网站
              <Icon as={IconExternalLink} />
            </Link>
          </FormLabel>
          <Switch id="canger-domain-allow" onChange={handleToggle} isChecked={allow} />
        </FormControl>
      </Box>
    </Box>
  )
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>)
