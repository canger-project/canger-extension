/**
 * For some special domains, we can apply custom selectors to translate the paragraph.
 * It's better to automate recognizing the paragraph and translating it.
 */

export type DomainSelector = {
  pattern: string
  selectors: string[]
}

export const DEFAULT_DOMAINS_SELECTOR: DomainSelector["selectors"] = ["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"]

export const DOMAINS_SELECTOR: DomainSelector[] = [
  {
    pattern: "https://news.ycombinator.com/*",
    selectors: [".titleline", ".commtext"],
  },
  {
    pattern: "https://github.com/*",
    selectors: ["task-lists p"],
  },
  {
    pattern: "https://twitter.com/*",
    selectors: ["div[lang='en']"],
  },
]
