const { withGradleProperties } = require('@expo/config-plugins');

/**
 * Config plugin to fix Expo SDK 50 Gradle compatibility issues:
 * 1. Fixes "useDefaultAndroidSdkVersions()" error in expo-file-system
 * 2. Fixes "release" SoftwareComponent error in ExpoModulesCorePlugin
 */
const withAndroidGradleFix = (config) => {
  return withGradleProperties(config, (config) => {
    // Ensure automatic component creation is enabled
    // This fixes the "release" SoftwareComponent error
    const existingProps = config.modResults || [];
    
    // Check if android.disableAutomaticComponentCreation is already set
    const hasDisableProp = existingProps.some(
      (prop) => prop.key === 'android.disableAutomaticComponentCreation'
    );
    
    if (!hasDisableProp) {
      // Add property to ensure components are created automatically
      config.modResults.push({
        type: 'property',
        key: 'android.disableAutomaticComponentCreation',
        value: 'false',
      });
    } else {
      // Update existing property to false
      const prop = existingProps.find(
        (p) => p.key === 'android.disableAutomaticComponentCreation'
      );
      if (prop) {
        prop.value = 'false';
      }
    }
    
    return config;
  });
};

module.exports = withAndroidGradleFix;
