var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app.js']
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
    contentBase: './public',
    hot: true,
    noInfo: true,
    port: 5000
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
