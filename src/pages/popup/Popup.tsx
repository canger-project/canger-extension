import React, { ChangeEvent } from "react"
import "@pages/popup/Popup.css"
import useStorage from "@src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import withSuspense from "@src/shared/hoc/withSuspense"
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary"
import { IconSettings, IconExternalLink } from "@tabler/icons-react"
import { Box, Text, Flex, Switch, FormLabel, FormControl, Divider, Heading, Link, Icon } from "@chakra-ui/react"

const Popup: React.FC = () => {
  const disabledDomain = useStorage(disabledDomainStorage)
  const currentDomain = ""

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.target.checked ? disabledDomainStorage.add(currentDomain) : disabledDomainStorage.remove(currentDomain)
  }

  const checkDomainExisted = async () => {
    return await disabledDomainStorage.exists(currentDomain)
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
        <Text fontSize="xl">苍耳英语</Text>
        <Icon
          as={IconSettings}
          boxSize={6}
          onClick={handleSettings}
          _hover={{
            color: "red",
          }}
        />
      </Flex>
      <Divider />
      <Box m="2" pb="2">
        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="canger-domain-allow" mb="0">
            <Heading size="sm">允许在该网站运行</Heading>
            <Link fontSize="xs" isExternal display={"flex"} alignItems={"center"}>
              设置更多网站
              <Icon as={IconExternalLink} />
            </Link>
          </FormLabel>
          <Switch id="canger-domain-allow" onChange={handleToggle} />
        </FormControl>
      </Box>
    </Box>
  )
}

function getCurrentTabUrl() {
  return getCurrentTab().then(tab => tab.url)
}

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>)
