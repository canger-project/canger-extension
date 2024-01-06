export type DomainSelector = {
  pattern: string
  selectors: string[]
}

export const DEFAULT_DOMAINS_SELECTOR: DomainSelector["selectors"] = ["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"]

/**
 * 自定义翻译按钮匹配规则
 */
export const DOMAINS_SELECTOR: DomainSelector[] = [
  {
    pattern: "https://news.ycombinator.com/*",
    selectors: [".titleline", ".commtext"],
  },
  {
    pattern: "https://github.com/*",
    selectors: ["task-lists p", "p"],
  },
]
