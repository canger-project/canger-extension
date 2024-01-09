import { ChakraProvider } from "@chakra-ui/react"
import { Options } from "@pages/options/Options"
import "@pages/options/index.css"
import * as Sentry from "@sentry/browser"
import { createRoot } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

refreshOnUpdate("pages/options")

Sentry.init({
  dsn: "https://deeab7775ed015758561de371e06f1e9@o4505644310593536.ingest.sentry.io/4506536679768064",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  // release: "my-project-name@2.3.12",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost"],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

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
