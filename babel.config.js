module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  // Disable NativeWind in test environment
  if (process.env.NODE_ENV === 'test') {
    return {
      presets: ['babel-preset-expo'],
      plugins,
    };
  }

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};
