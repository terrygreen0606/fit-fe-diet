/* config-overrides.js */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('react-scripts/config/paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const isEnvProduction = env === 'production';
  const isEnvDevelopment = env === 'development';

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

  let plugins = config.plugins;

  plugins[0] =
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          hash: true,
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    );

  if (isEnvProduction) {
    plugins[8] =
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
        navigateFallbackBlacklist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
      });

    plugins[5] =
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].chunk.css?v=[contenthash:8]',
      });
  }

  let output = config.output;

  output.filename = isEnvProduction
    ? 'static/js/[name].js'
    : isEnvDevelopment && 'static/js/bundle.js';
  // TODO: remove this when upgrading to webpack 5
  // There are also additional JS chunk files if you use code splitting.
  output.chunkFilename = isEnvProduction
    ? 'static/js/[name].chunk.js?v=[contenthash:8]'
    : isEnvDevelopment && 'static/js/[name].chunk.js';

  // output.libraryTarget = 'umd';
  // output.library = '[name]';
  // output.umdNamedDefine = false;

  return config;
}
