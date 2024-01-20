import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import "@pages/newtab/index.css"
import Newtab from "@pages/newtab/Newtab"
import "animate.css"
import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/newtab")

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
}

const theme = extendTheme({ config })

const ChakraUIProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

function App() {
  return (
    <ChakraUIProvider>
      <Newtab />
    </ChakraUIProvider>
  )
}

function Root() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </>
  )
}

function init() {
  const appContainer = document.querySelector("#app-container")
  if (!appContainer) {
    throw new Error("Can not find #app-container")
  }
  const root = createRoot(appContainer)

  root.render(<Root />)
}

init()
