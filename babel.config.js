module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // This must be inside the options object for 'babel-preset-expo'
          unstable_transformImportMeta: true,
        },
      ],
    ],
  };
};