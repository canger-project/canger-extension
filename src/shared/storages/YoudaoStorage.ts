import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

type YoudaoApp = {
  appId: string
  appScrect: string
}

type YoudaoStorage = BaseStorage<YoudaoApp> & {
  add: (app: YoudaoApp) => void
  delete: () => void
}

const storage = createStorage<YoudaoApp>(
  "youdao-storage-key",
  {
    appId: "",
    appScrect: "",
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
)

const youdaoStorage: YoudaoStorage = {
  ...storage,
  add: (app: YoudaoApp) => {
    storage.set(app)
  },
  delete: () => {
    storage.set({
      appId: "",
      appScrect: "",
    })
  },
}

export default youdaoStorage
