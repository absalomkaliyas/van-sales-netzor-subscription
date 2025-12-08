// app.config.js - Supplier Mobile App Configuration
// Set environment variable to skip Metro externals (fixes Windows node:sea bug)
process.env.EXPO_NO_METRO_EXTERNALS = '1';

module.exports = {
  expo: {
    name: "VAN Sales NETZOR - Supplier",
    slug: "van-sales-netzor-supplier",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.netzor.vansales.supplier"
    },
    android: {
      package: "com.netzor.vansales.supplier",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA"
      ],
      compileSdkVersion: 34,
      targetSdkVersion: 34,
      buildToolsVersion: "34.0.0"
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            minSdkVersion: 23,
            buildToolsVersion: "34.0.0",
            javaVersion: "17"
          }
        }
      ],
      "expo-router",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow VAN Sales NETZOR to use your location for delivery tracking."
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow VAN Sales NETZOR to access your camera for scanning products."
        }
      ]
    ],
    scheme: "vansales-supplier",
    extra: {
      eas: {
        projectId: "307a5b40-8250-4e97-80e8-25bef212bd6e"
      }
    }
  }
};

