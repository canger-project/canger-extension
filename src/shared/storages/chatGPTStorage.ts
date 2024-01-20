import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

type ChatGPTApiStorage = BaseStorage<string> & {
  add: (key: string) => void
  delete: () => void
}

const storage = createStorage<string>("canger-chatgpt-key", "", {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const chatGPTApiStorage: ChatGPTApiStorage = {
  ...storage,
  add: (key: string) => {
    storage.set(key)
  },
  delete: () => {
    storage.set("")
  },
}

export default chatGPTApiStorage
