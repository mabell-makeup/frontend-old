export default {
  name: "mabell",
  version: "1.3.0",
  slug: "mabell",
  orientation: "portrait",
  icon: "./assets/icon.png",
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.makeup.mabell",
    buildNumber: "1.3.0"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  // expoで使用する環境変数を設定する
  extra: {
    // eslint-disable-next-line no-undef
    env: process.env.NODE_ENV !== "production" ? "development" : "production"
    
  }
}