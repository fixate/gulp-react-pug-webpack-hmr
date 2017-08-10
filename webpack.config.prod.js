const path = require('path');
const webpack = require('webpack');

const conf = require('./gulp/gulpconfig');
const webpackBase = require('./webpack.config.base');

module.exports = {
  entry: {
    app: './src/assets/js/index.js',
  },

  output: webpackBase.output,

  externals: webpackBase.externals,

  resolve: webpackBase.resolve,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [].concat.apply(
    [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
    webpackBase.plugins
  ),
};
