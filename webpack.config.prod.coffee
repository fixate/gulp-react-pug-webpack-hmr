path      = require 'path'
webpack   = require 'webpack'

conf      = require('./gulp/gulpconfig')
webpackBase = require './webpack.config.base'

module.exports =
  entry:
    app: './src/assets/js/index.jsx',

  output: webpackBase.output

  externals: webpackBase.externals

  module:
    loaders: [
      {
        test: /\.jsx?$/
        exclude: /node_modules/
        loaders: ['babel']
      }
    ]

  plugins:
    [].concat.apply([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
      }),
    ], webpackBase.plugins)
