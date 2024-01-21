import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

/* 存储开启内容流背单词模式的网站 */

interface Domain {
  name: string
  hostname: string
  checked: boolean
}

type WordFlowStorage = BaseStorage<Domain[]> & {
  add: (domain: Domain) => void
}

// 支持的网站列表
const SupportedDomains = [
  {
    name: "douban",
    hostname: "www.douban.com",
    checked: true,
  },
]

const storage = createStorage<Domain[]>("canger-wordflow-key", SupportedDomains, {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const wordflowStorage: WordFlowStorage = {
  ...storage,
  add: (domain: Domain) => {
    storage.get().then(domains => {
      const i = domains.findIndex(d => d.name == domain.name)
      if (i !== -1) {
        domains[i] = domain
      }
      storage.set(domains)
    })
  },
}

export default wordflowStorage
