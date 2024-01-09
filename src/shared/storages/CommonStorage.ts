import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

export interface Common {
  // 仅英文站开启
  onlyEnSite: boolean
  // 单词面板在各网站出现的密度
  wordLearnDensity: "low" | "medium" | "high"
}

type CommonStorage = BaseStorage<Common> & {
  add: (key: string, value: any) => Promise<void>
}

const DEFAULT_COMMON: Common = {
  onlyEnSite: false,
  wordLearnDensity: "low",
}

const storage = createStorage<Common>("common-storage-key", DEFAULT_COMMON, {
  storageType: StorageType.Local,
  liveUpdate: true,
})

export const commonStorage: CommonStorage = {
  ...storage,
  add: async (key: string, value: any) => {
    const commonItems = await storage.get()
    commonItems[key] = value
    storage.set(commonItems)
  },
}
