import { ColorModeScript, theme } from "@chakra-ui/react"
import Popup from "@pages/popup/Popup"
import "@pages/popup/index.css"
import { ChakraUIProvider } from "@root/src/shared/ChakraProvider"
import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/popup")

function App() {
  return (
    <ChakraUIProvider>
      <Popup />
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
