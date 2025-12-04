// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Windows path issues with node-sea
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false, // Disable to avoid node-sea issue
};

// Workaround for Windows directory creation issue
config.watchFolders = [path.resolve(__dirname)];

module.exports = config;
