export default {
  name: "mabell",
  version: "0.0.2",
  slug: "mabell",
  orientation: "portrait",
  icon: "./assets/icon.jpg",
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.makeup.mabell",
    buildNumber: "0.0.2"
  },
  web: {
    favicon: "./assets/favicon.jpg"
  },
  // expoで使用する環境変数を設定する
  extra: {
    // eslint-disable-next-line no-undef
    env: process.env.NODE_ENV !== "production" ? "development" : "production"
    
  }
}