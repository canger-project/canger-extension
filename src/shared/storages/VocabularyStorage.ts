import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

export type Vocabulary = {
  word: string
  o: number
  detail: any
}

type VocabularyStorage = BaseStorage<Vocabulary[]> & {
  add: (word: Vocabulary) => void
  find: (word: string) => Promise<Vocabulary> | undefined
}

const storage = createStorage<Vocabulary[]>("vocabulary-storage-key-test3", [], {
  storageType: StorageType.Sync,
  liveUpdate: true,
})

const vocabularyStorage: VocabularyStorage = {
  ...storage,
  add: (word: Vocabulary) => {
    storage.get().then(words => {
      const index = words.findIndex(w => w.word === word.word)
      if (index !== -1) {
        words[index] = word
      } else {
        words.push(word)
      }
      storage.set(words)
    })
  },
  find: (word: string) => {
    return storage.get().then(words => words.find(w => w.word === word))
  },
}

export default vocabularyStorage
