path = require 'path'

conf = require './gulp/gulpconfig'

module.exports =
  output:
    path: path.join(__dirname, conf.path.dist.js)
    publicPath: '/assets/js/'
    filename: '[name].bundle.js'

  externals:
    'google': 'google'

  plugins: []
