import packageJson from "./package.json" assert { type: "json" }

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: "苍耳英语",
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage", "sidePanel", "tabs"],
  host_permissions: ["https://api.openai.com/"],
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon32.png",
  },
  icons: {
    16: "icon16.png",
    32: "icon32.png",
    48: "icon48.png",
    128: "icon128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
      run_at: "document_start",
    },
  ],
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon16.png", "icon32.png", "icon48.png", "icon128.png"],
      matches: ["*://*/*"],
    },
  ],
}

export default manifest
