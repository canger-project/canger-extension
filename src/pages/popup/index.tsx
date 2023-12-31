import React from "react"
import { createRoot } from "react-dom/client"
import "@pages/popup/index.css"
import Popup from "@pages/popup/Popup"
import refreshOnUpdate from "virtual:reload-on-update-in-view"
import { ChakraBaseProvider, ChakraProvider, extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react"

refreshOnUpdate("pages/popup")

const { Button, FormLabel, Switch, Divider, Heading } = chakraTheme.components
const theme = extendBaseTheme({
  components: {
    Button,
    FormLabel,
    Switch,
    Divider,
    Heading,
  },
})

function App() {
  return (
    <ChakraProvider>
      <Popup />
    </ChakraProvider>
  )
}

function init() {
  const appContainer = document.querySelector("#app-container")
  if (!appContainer) {
    throw new Error("Can not find #app-container")
  }
  const root = createRoot(appContainer)
  root.render(<App />)
}

init()
