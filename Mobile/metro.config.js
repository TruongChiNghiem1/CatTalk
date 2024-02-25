const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);
const mergedConfig = Object.assign({}, defaultConfig, {
  resolver: {
    extraNodeModules: require('node-libs-browser')
  }
});

module.exports = mergedConfig;