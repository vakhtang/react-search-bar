var path = require('path');

module.exports = {
  entry: './demo/demo.js',
  output: {
    path: path.resolve(__dirname, './demo'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:  /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './demo'),
    hot: true,
    noInfo: true
  },
  devtool: 'source-map'
};
