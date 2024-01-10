import { describe, expect, test } from "vitest"
import { isValidWord } from "./utils"

describe("UtilsTest", () => {
  test.each([
    ["hello", true],
    ["hello ", true],
    [" hello ", true],
    [" ", false],
    ["你好", false],
    ["how are you", false],
  ])("isValidWord(%s)", (word, expected) => {
    const result = isValidWord(word)
    expect(result).toBe(expected)
  })
})
