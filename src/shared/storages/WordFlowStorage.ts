import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

type WordFlowStorage = BaseStorage<string[]> & {
  add: (domain: string) => void
  delete: (domain: string) => void
}

const storage = createStorage<string[]>("wordflow-storage-key", [], {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const wordflowStorage: WordFlowStorage = {
  ...storage,
  add: (domain: string) => {
    storage.set(currentDomain => {
      return [...currentDomain, domain]
    })
  },

  delete: (domain: string) => {
    storage.set(currentDomain => {
      return currentDomain.filter(d => d !== domain)
    })
  },
}

export default wordflowStorage
