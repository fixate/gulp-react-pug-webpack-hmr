const path      = require('path');
const webpack   = require('webpack');

const conf      = require('./gulp/gulpconfig');
const webpackBase = require('./webpack.config.base');

module.exports = {
  entry: {
    app: './src/assets/js/index.js',
  },

  output: webpackBase.output,

  externals: webpackBase.externals,

  resolve: webpackBase.resolve,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      }
    ],
  },

  plugins: [].concat.apply([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ], webpackBase.plugins),
};
