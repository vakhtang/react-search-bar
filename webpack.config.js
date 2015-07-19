var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './example/app.js']
  },
  output: {
    path: './example/public/js',
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    contentBase: './example/public',
    hot: true,
    port: 5000
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
