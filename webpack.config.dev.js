const webpack = require('webpack');
const config = require('./webpack.config');

config.entry.app.unshift('webpack/hot/dev-server');

config.devServer = {
  contentBase: './demo/public',
  hot: true,
  noInfo: true,
  port: 5000
};

config.plugins = [new webpack.HotModuleReplacementPlugin()];

module.exports = config;
