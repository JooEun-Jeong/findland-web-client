const { resolve } = require('path');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const commonConfig = require('./webpack.common.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

const smp = new SpeedMeasurePlugin();

const config = merge(commonConfig, {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info'], // Delete console
          },
        },
      }),
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     // Lossless optimization with custom option
      //     // Feel free to experiment with options for better result for you
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         [
      //           'svgo',
      //           {
      //             plugins: [
      //               {
      //                 name: 'removeViewBox',
      //                 active: false,
      //               },
      //             ],
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // }),
    ],
  },
  plugins: [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
      },
      [],
    ),
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
  ],
});

module.exports = smp.wrap(config);
