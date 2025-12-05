// app.config.js - Dynamic configuration
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
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.netzor.vansales"
    },
    android: {
      package: "com.netzor.vansales",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    web: {},
    plugins: [
      "expo-router",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow VAN Sales to use your location for route tracking and attendance."
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow VAN Sales to access your camera for taking photos of deliveries and receipts."
        }
      ]
    ],
    scheme: "vansales",
    extra: {
      eas: {
        projectId: "307a5b40-8250-4e97-80e8-25bef212bd6e"
      }
    }
  }
}

