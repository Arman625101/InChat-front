const merge = require('webpack-merge');
const PATHS = require('./PATHS');
const parts = require('./webpack.parts');
require('dotenv').config();

const production = merge(
  {
    plugins: [parts.extractSass],
  },
  parts.buildSetup('production'),
  parts.setMode('production'),
  parts.sourceMaps('source-map'),
  parts.styleLoader({
    use: parts.extractSass.extract({
      use: [
        {
          loader: 'css-loader',
          options: { minimaze: true },
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: PATHS.POSTCSS,
            },
          },
        },
      ],
      fallback: 'style-loader',
    }),
  }),
);

module.exports = production;
