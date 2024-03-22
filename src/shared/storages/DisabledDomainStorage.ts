import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

/**
 * DisableDomainStorage
 */

type disabledDomain = string[]

type disabledDomainStorage = BaseStorage<disabledDomain> & {
  add: (domain: string) => void
  remove: (domain: string) => void
  exists: (domain: string) => Promise<boolean>
}

const storage = createStorage<disabledDomain>("canger-disabled-domain-key", [], {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const disabledDomainStorage: disabledDomainStorage = {
  ...storage,
  add: (domain: string) => {
    storage.get().then(domains => {
      domains.find(d => d === domain) || domains.push(domain)
      storage.set(domains)
    })
  },
  remove: (domain: string) => {
    storage.set(currentDomain => {
      return currentDomain.filter(d => d !== domain)
    })
  },
  exists: (domain: string) => {
    return storage.get().then(d => {
      return d.includes(domain)
    })
  },
}

export default disabledDomainStorage
