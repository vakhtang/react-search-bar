const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

module.exports = {
  entry: path.resolve(__dirname, 'demo.js'),
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ]
  },
  devServer: {
    contentBase: publicPath,
    noInfo: true
  },
  devtool: 'source-map'
};
