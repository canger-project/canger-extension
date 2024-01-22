import useStorage from "@root/src/shared/hooks/useStorage"
import disabledDomainStorage from "@root/src/shared/storages/DisabledDomainStorage"
import { useEffect } from "react"
import { injectContentFlow } from "./injects/contentFlow"
import { injectTransInput } from "./injects/input"
import { injectTransParagraph } from "./injects/transParagraph"
import { injectTransWord } from "./injects/transWord"

export default function App() {
  const disabledDomain = useStorage(disabledDomainStorage)

  useEffect(() => {
    console.info(`Canger loaded :)`)

    chrome.runtime.sendMessage({ type: "taburl", message: "" }, resp => {
      const currentUrl = resp.result
      const domain = new URL(currentUrl).hostname
      window.addEventListener("load", () => {
        injectContentFlow()
        // 英文网站或者非禁用域名开启段落翻译和写作优化
        if (!disabledDomain.includes(domain)) {
          // TODO: 提供是否开启高亮的选项
          // injectHighLightWords()
          injectTransParagraph()
          injectTransInput()
        }
        injectTransWord()
      })
    })
  }, [disabledDomain])

  return <div className=""></div>
}
