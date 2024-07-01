const { resolve } = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8082', // bundle the client for webpack-dev-server and connect to the provided endpoint
    './src/index.tsx', // the entry point of our app
  ],
  devServer: {
    host: '0.0.0.0', // Allow access from external devices
    port: 8082,
    compress: true,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ],
    },
    client: {
      webSocketURL: 'ws://localhost:8080/ws', // Update this if needed
    },
    transportMode: {
      server: 'ws',
      client: 'ws',
    },
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/onlyLogo.png'],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
