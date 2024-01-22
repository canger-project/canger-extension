import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import { DoubanContentFlow } from "../contentFlow/Douban"

/* 内容流背单词 */

export async function injectContentFlow() {
  const commonConfig = await commonStorage.get()
  commonConfig.wordLearnDensity
  chrome.runtime.sendMessage({ type: "taburl", message: "" }, resp => {
    const currentDomain = resp.result
    const doaminUrl = new URL(currentDomain)
    const host = doaminUrl.hostname.split(".").slice(-2).join(".")
    switch (host) {
      case "douban.com":
        DoubanContentFlow(currentDomain, commonConfig.wordLearnDensity)
        break
      default:
        break
    }
  })
}
