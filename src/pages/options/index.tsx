import { ChakraProvider } from "@chakra-ui/react"
import { Options } from "@pages/options/Options"
import "@pages/options/index.css"
import { createRoot } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/options")

function Root() {
  return (
    <ChakraProvider>
      <MemoryRouter>
        <Options />
      </MemoryRouter>
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
