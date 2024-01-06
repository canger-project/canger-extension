import App from "@pages/content/ui/app"
import { render, screen } from "@testing-library/react"
import { describe, test } from "vitest"

describe("appTest", () => {
  test("render text", () => {
    // given
    const text = "content view"

    // when
    render(<App />)

    // then
    screen.getByText(text)
  })
})
