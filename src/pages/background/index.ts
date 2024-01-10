import reloadOnUpdate from "virtual:reload-on-update-in-background-script"
import "webextension-polyfill"

const BG_PREFIX = "[background]"
const CANGER_API = "https://canger.shanxiao.store/api"

reloadOnUpdate("pages/background")

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss")

console.info(`${BG_PREFIX} loaded :)`)

// 安装后打开 option 页
chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.info(`${BG_PREFIX} receive message: ${request.message}`)

  switch (request.type) {
    case "chatgpt":
      askChatGPT(request.message.sentence, request.message.kind).then(res => {
        sendResponse({ result: res })
      })
      break
    // 获取当前 tab url
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
      wordTranslate(request.message).then(res => {
        sendResponse({ result: res })
      })
      break
    case "sentence":
      sentenceTranslate(request.message).then(res => {
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
  const response = await fetch(`${CANGER_API}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: PROMPTS.find(p => p.kind === kind)?.prompt + sentence,
    }),
  })
  const data = await response.json().catch(err => {
    console.error(err)
  })
  return data.content
}
async function wordTranslate(word: string) {
  return await fetch(`${CANGER_API}/translate/word?word=${word}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}

async function sentenceTranslate(sentence: string) {
  return await fetch(`${CANGER_API}/translate/sentence?sentence=${sentence}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
}
