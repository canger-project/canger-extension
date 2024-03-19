import { commonStorage } from "@root/src/shared/storages/CommonStorage"
import { vocabularyStorage } from "@root/src/shared/storages/VocabularyStorage"
import BiliBiliContentFlow from "../contentFlow/Bilibili"
import { DoubanContentFlow } from "../contentFlow/Douban"
import { V2exContentFlow } from "../contentFlow/V2ex"

/* 内容流背单词 */

export async function injectContentFlow() {
  const commonConfig = await commonStorage.get()
  const density = commonConfig.wordLearnDensity
  const words = await vocabularyStorage.getsNewWord(commonConfig.dailyWordNum)

  chrome.runtime.sendMessage({ type: "taburl", message: "" }, resp => {
    const currentDomain = resp.result
    const doaminUrl = new URL(currentDomain)
    const host = doaminUrl.hostname.split(".").slice(-2).join(".")
    switch (host) {
      case "douban.com":
        DoubanContentFlow(currentDomain, words, density)
        break
      case "bilibili.com":
        BiliBiliContentFlow(currentDomain)
        break
      case "v2ex.com":
        V2exContentFlow(currentDomain, words, density)
        break
      default:
        break
    }
  })
}
