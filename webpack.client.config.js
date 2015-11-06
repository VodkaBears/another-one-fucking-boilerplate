'use strict';

let path = require('path');
let webpack = require('webpack');
let cssnext = require('cssnext');
let optimize = webpack.optimize;
let DefinePlugin = webpack.DefinePlugin;
let AssetsPlugin = require('assets-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'client'),

  output: {
    path: path.resolve(__dirname, 'build', 'public', 'assets'),
    filename: 'bundle_[hash].js'
  },

  cache: IS_DEBUG,

  debug: IS_DEBUG,

  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new AssetsPlugin({
      path: path.resolve(__dirname, 'build'),
      filename: 'assets.json'
    }),
    new ExtractTextPlugin('bundle_[hash].css'),
    new optimize.DedupePlugin(),
    new optimize.OccurenceOrderPlugin(),
    new optimize.AggressiveMergingPlugin(),
    new optimize.UglifyJsPlugin({ comments: false })
  ],

  postcss: [
    cssnext({
      browsers: '> 0.1%',
      url: false
    })
  ],

  devtool: IS_DEBUG ? 'source-map' : '',

  resolve: {
    root: path.resolve(__dirname, 'src')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&minimize!postcss-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=32768!image-webpack'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=32768'
      }
    ]
  }
};
