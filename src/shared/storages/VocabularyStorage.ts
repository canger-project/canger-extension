import { BaseStorage, createStorage, StorageType } from "@src/shared/storages/base"

export type Vocabulary = {
  word: string
  o: number
  detail: any
}

type VocabularyStorage = BaseStorage<Vocabulary[]> & {
  add: (word: Vocabulary) => Promise<void>
  find: (word: string) => Promise<Vocabulary> | undefined
  getsAllNewWord: () => Promise<Vocabulary[]>
  getTopNewWord: () => Promise<Vocabulary>
  newWordsTotal: () => Promise<number>
}

const storage = createStorage<Vocabulary[]>("canger-vocabulary-key", [], {
  storageType: StorageType.Local,
  liveUpdate: true,
})

const vocabularyStorage: VocabularyStorage = {
  ...storage,
  add: async (word: Vocabulary) => {
    const words = await storage.get()
    const index = words.findIndex(w => w.word === word.word)
    if (index !== -1) {
      words[index] = word
    } else {
      words.push(word)
    }
    storage.set(words)
  },
  find: (word: string) => {
    return storage.get().then(words => words.find(w => w.word === word))
  },

  getsAllNewWord: () => {
    // filter o != 0 and order by o desc
    return storage.get().then(words => words.filter(w => w.o !== 0).sort((a, b) => b.o - a.o))
  },

  getTopNewWord: () => {
    return storage.get().then(words => words.filter(w => w.o !== 0).sort((a, b) => b.o - a.o)[0])
  },

  newWordsTotal: () => {
    return storage.get().then(words => words.filter(w => w.o !== 0).length)
  },
}

export default vocabularyStorage
