/* config-overrides.js */

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  let rules = config.module.rules[2].oneOf;

  rules[0] = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: imageInlineSizeLimit,
      name: 'static/media/[folder]/[name].[ext]',
    },
  };

  rules[rules.length - 1] = {
    loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
    options: {
      name: 'static/media/[folder]/[name].[ext]',
    },
  };

  return config;
}
