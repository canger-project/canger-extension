import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react"
import "@pages/popup/Popup.css"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary"
import withSuspense from "@src/shared/hoc/withSuspense"
import useStorage from "@src/shared/hooks/useStorage"
import { IconExternalLink, IconSettings } from "@tabler/icons-react"
import React, { ChangeEvent, useEffect, useState } from "react"

const Popup: React.FC = () => {
  const disabledDomain = useStorage(disabledDomainStorage)
  const [currentDomain, setCurrentDomain] = useState("")
  const [allow, setAllow] = useState(true)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, function (response) {
      const currentDomain = response.result
      const domainOrigin = new URL(currentDomain).origin
      setCurrentDomain(domainOrigin)

      if (disabledDomain.includes(domainOrigin)) {
        setAllow(false)
      }
    })
  }, [disabledDomain])

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    chrome.runtime.sendMessage({ type: "taburl", message: "" }, function (response) {
      const currentDomain = response.result
      const domainOrigin = new URL(currentDomain).origin
      if (event.target.checked) {
        disabledDomainStorage.add(domainOrigin)
        setAllow(false)
      } else {
        disabledDomainStorage.remove(domainOrigin)
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
        <IconButton
          icon={<IconSettings />}
          aria-label="settings"
          onClick={handleSettings}
          variant="solid"
          isRound={true}
          size="sm"
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
