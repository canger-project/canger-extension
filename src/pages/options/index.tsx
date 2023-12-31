import React from "react"
import { createRoot } from "react-dom/client"
import { Options } from "@pages/options/Options"
import "@pages/options/index.css"
import refreshOnUpdate from "virtual:reload-on-update-in-view"
import { ChakraProvider } from "@chakra-ui/react"
import { MemoryRouter } from "react-router-dom"

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
