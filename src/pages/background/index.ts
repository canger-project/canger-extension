import youdaoStorage from "@root/src/shared/storages/YoudaoStorage"
import chatGPTApiStorage from "@root/src/shared/storages/chatGPTStorage"
import CryptoJS from "crypto-js"
import reloadOnUpdate from "virtual:reload-on-update-in-background-script"
import "webextension-polyfill"

const BG_PREFIX = "[background]"
const CHATGPT_API = "https://api.openai.com/v1/chat/completions"
const YOUDAO_API = "https://openapi.youdao.com/api"

reloadOnUpdate("pages/background")

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss")

console.info(`${BG_PREFIX} loaded :)`)

chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.info(`${BG_PREFIX} receive message: ${request.message}`)

  switch (request.type) {
    case "chatgpt":
      askChatGPT(request.message.sentence, request.message.kind).then(res => {
        console.info(`${BG_PREFIX} ChatGPT result: ${res}`)
        sendResponse({ result: res })
      })
      break
    case "taburl":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        sendResponse({ result: tabs[0].url })
      })
      break
    case "colormode":
      chrome.action.setIcon({
        path: request.message === "dark" ? "/icons/iconDark128.png" : "/icons/icon128.png",
      })
      break
    case "dictionary":
      getDictionary(request.message).then(res => {
        console.info(`${BG_PREFIX} dictionary result: ${res.errorCode}`)
        sendResponse({ result: res })
      })
      break
    default:
      sendResponse({ result: "I'm groot." })
      break
  }

  return true
})

type PromptKind = "translator" | "writer" | "dictionary"

interface Prompt {
  kind: PromptKind
  prompt: string
}

const PROMPTS: Prompt[] = [
  {
    kind: "writer",
    prompt: `I want you to act as an English translator, spelling corrector and improver.
        I will speak to you in any language and you will detect the language,
        translate it and answer in the corrected and improved version of my text, in English.
        I want you to replace my simplified A0-level words and sentences with more beautiful and elegant,
        upper level English words and sentences. Keep the meaning same, but make them more literary.
        I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is: `,
  },
  {
    kind: "translator",
    prompt: `I want you to act as an Language translator, I will speak to you in English language and you will detect the language,
    translate it to Chinese. I want you to only reply the correction, do not write explanations. My sentence is:`,
  },
]

// ask ChatGPT
const askChatGPT = async (sentence: string, kind: PromptKind) => {
  const key = await chatGPTApiStorage.get()
  const response = await fetch(CHATGPT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: PROMPTS.find(p => p.kind === kind)?.prompt + sentence }],
      temperature: 1,
    }),
  })
  const data = await response.json().catch(err => {
    console.error(err)
  })
  return data.choices[0].message.content
}
async function getDictionary(word: string) {
  const appKey = (await youdaoStorage.get()).appId
  const key = (await youdaoStorage.get()).appScrect
  const salt = new Date().getTime()
  const curtime = Math.round(new Date().getTime() / 1000)
  const sign = CryptoJS.SHA256(appKey + word + salt + curtime + key).toString(CryptoJS.enc.Hex)

  const params = new Map([
    ["q", word],
    ["from", "auto"],
    ["to", "zh-CHS"],
    ["appKey", appKey],
    ["salt", salt.toString()],
    ["sign", sign],
    ["signType", "v3"],
    ["curtime", curtime.toString()],
  ])
  const url = new URL(YOUDAO_API)
  params.forEach((value, key) => {
    url.searchParams.append(key, value)
  })
  return await fetch(url.toString(), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}
