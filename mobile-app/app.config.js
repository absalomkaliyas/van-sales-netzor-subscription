// app.config.js - Minimal working configuration
module.exports = {
  expo: {
    name: "VAN Sales NETZOR",
    slug: "van-sales-netzor",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.netzor.vansales"
    },
    android: {
      package: "com.netzor.vansales",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA"
      ]
    },
    plugins: [
      "expo-router"
    ],
    scheme: "vansales",
    extra: {
      eas: {
        projectId: "307a5b40-8250-4e97-80e8-25bef212bd6e"
      }
    }
  }
}

