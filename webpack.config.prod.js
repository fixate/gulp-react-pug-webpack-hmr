const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const conf = require('./gulp/gulpconfig');
const webpackBase = require('./webpack.config.base');

module.exports = {
  entry: {
    app: './src/assets/js/index.js',
  },

  output: webpackBase.output,

  externals: webpackBase.externals,

  resolve: webpackBase.resolve,

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      })
    ],
  },

  plugins: [].concat.apply(
    [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
    webpackBase.plugins
  ),
};
