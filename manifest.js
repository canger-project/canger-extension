import packageJson from "./package.json" assert { type: "json" }

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: "苍耳Canger",
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
    default_icon: "icons/icon128.png",
  },
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  icons: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png",
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
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icons/icon16.png",
        "icons/icon32.png",
        "icons/icon48.png",
        "icons/icon128.png",
        "icons/iconDark16.png",
        "icons/iconDark32.png",
        "icons/iconDark48.png",
        "icons/iconDark128.png",
      ],
      matches: ["*://*/*"],
    },
  ],
}

export default manifest
