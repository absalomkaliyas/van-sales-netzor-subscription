// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Windows node:sea bug
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
};

module.exports = config;

