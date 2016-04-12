path      = require 'path'
webpack   = require 'webpack'

conf        = require './gulp/gulpconfig'
webpackBase = require './webpack.config.base'

module.exports =
  entry:
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './src/assets/js/index.jsx',
    ]

  output:
    path: path.join(__dirname, '../', conf.path.dist.js)
    publicPath: webpackBase.output.publicPath
    filename: webpackBase.output.filename

  externals: webpackBase.externals

  devtool: 'source-map'

  module:
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },
    ]

  plugins:
    [].concat.apply([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ], webpackBase.plugins)
