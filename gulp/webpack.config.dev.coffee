HappyPack = require 'happypack'
path      = require 'path'
webpack   = require 'webpack'

conf      = require('./gulpconfig')

module.exports =
  entry: [
    'webpack/hot/dev-server'
    'webpack-hot-middleware/client',
    './src/assets/js/index.jsx'
  ]

  output:
    path: path.join(__dirname, '../', conf.path.dist.js)
    publicPath: '/assets/js/'
    filename: 'app.bundle.js'

  module:
    loaders: [
      {
        test: /\.jsx?$/
        exclude: /node_modules/
        loaders: ['react-hot', 'babel']
      }
      # {
      #   test: /\.jsx?$/
      #   exclude: /node_modules/
      #   loader: 'happypack/loader'
      # }
    ]

  devtool: 'source-map'

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
    # new HappyPack({
    #   loaders: [{
    #     path: path.resolve(__dirname, '../node_modules/babel-loader/index.js'),
    #     query: '?presets[]=es2015,presets[]=react'
    #   }]
    # })
  ]
