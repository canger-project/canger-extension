import { ColorModeScript, theme } from "@chakra-ui/react"

import "@pages/newtab/index.css"
import Newtab from "@pages/newtab/Newtab"
import { ChakraUIProvider } from "@root/src/shared/ChakraProvider"
import "animate.css"
import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/newtab")

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
  const appContainer = document.querySelector("#canger-app")
  if (!appContainer) {
    throw new Error("Can not find #canger-app")
  }
  const root = createRoot(appContainer)

  root.render(<Root />)
}

init()
