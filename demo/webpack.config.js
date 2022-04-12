const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'demo.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    static: './demo/public'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  }
};
