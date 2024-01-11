import { ChakraProvider } from "@chakra-ui/react"
import Newtab from "@pages/newtab/Newtab"
import "@pages/newtab/index.css"
import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/newtab")

function Root() {
  return (
    <ChakraProvider>
      <Newtab />
    </ChakraProvider>
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
