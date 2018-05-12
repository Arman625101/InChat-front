const path = require('path');

module.exports = {
  SRC: path.resolve('src'),
  APP: path.resolve('src/index.jsx'),
  DIST: path.resolve('dist'),
  TEMPLATE: path.resolve('webpack/template.html'),
  POSTCSS: path.resolve('postcss.config.js'),
};
