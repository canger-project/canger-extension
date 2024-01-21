import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

export interface Common {
  // 仅英文站开启
  onlyEnSite: boolean
  // 单词面板在各网站出现的密度
  wordLearnDensity: "low" | "medium" | "high"
  // 每日单词数
  dailyWordNum: number
  // 记录背单词日期
  dailyLearnedWordNum: Record<string, any>
}

type CommonStorage = BaseStorage<Common> & {
  add: (key: string, value: any) => Promise<void>
}

const DEFAULT_COMMON: Common = {
  onlyEnSite: false,
  wordLearnDensity: "low",
  dailyWordNum: 10,
  dailyLearnedWordNum: {},
}

const storage = createStorage<Common>("canger-common-key", DEFAULT_COMMON, {
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
