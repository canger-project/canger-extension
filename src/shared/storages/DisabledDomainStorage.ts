import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

/**
 * AllowedDomainStorage
 * 黑名单域名存储
 */

type disabledDomain = string[]

type disabledDomainStorage = BaseStorage<disabledDomain> & {
  add: (domain: string) => void
  remove: (domain: string) => void
  exists: (domain: string) => Promise<boolean>
}

const DEFAULT_DOMAINS = ["www.baidu.com", "www.google.com", "www.bing.com"]

const storage = createStorage<disabledDomain>("disabled-domain-storage-key", DEFAULT_DOMAINS, {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const disabledDomainStorage: disabledDomainStorage = {
  ...storage,
  add: (domain: string) => {
    storage.set(currentDomain => {
      return [...currentDomain, domain]
    })
  },
  remove: (domain: string) => {
    storage.set(currentDomain => {
      return currentDomain.filter(d => d !== domain)
    })
  },
  exists: async (domain: string) => {
    const disabledDomains = await storage.get()
    return disabledDomains.includes(domain)
  },
}

export default disabledDomainStorage
