import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import { useEffect } from "react"
import { injectContentFlow } from "./injects/contentFlow"
import { injectTransInput } from "./injects/input"
import { injectTransParagraph } from "./injects/transParagraph"
import { injectTransWord } from "./injects/transWord"
import { isEnglishSite } from "./utils"

export default function App() {
  const disabledDomain = useStorage(disabledDomainStorage)

  useEffect(() => {
    console.info(`Canger loaded :)`)

    chrome.runtime.sendMessage({ type: "taburl", message: "" }, resp => {
      const currentUrl = resp.result
      const domain = new URL(currentUrl).hostname

      function inject() {
        injectContentFlow()
        // If it is an English website or a non-disabled domain, turn on
        // TODO: disableDomains or AllowedDomains
        if (isEnglishSite()) {
          // TODO: hightlight words
          // injectHighLightWords()
          injectTransWord()
          injectTransParagraph()
          injectTransInput()
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inject)
      } else {
        inject()
      }
    })
  }, [disabledDomain])

  return <div className=""></div>
}
