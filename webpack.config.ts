import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { InjectManifest } from 'workbox-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { config } from 'dotenv';

config();

export default {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.tsx'],
  output: {
    publicPath: '/',
    filename:
    process.env.NODE_ENV === 'development'
        ? '[name].[fullhash].js'
        : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './html/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets', noErrorOnMissing: true },
        { from: 'pwa/manifest.json', to: 'manifest.json' },
        { from: 'netlify/_redirects', to: '_redirects', toType: 'file' },
      ],
    }),
    new InjectManifest({
      swSrc: './pwa/service-worker.ts',
      swDest: 'service-worker.js',
      exclude: [/\.map$/, /manifest$/, /service-worker\.js$/],
    }),
    new EnvironmentPlugin({
      API_URL: process.env.API_URL,
      BASIN_URL: process.env.BASIN_URL,
      LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
      LOG_ERROR_TO_SENTRY: process.env.LOG_ERROR_TO_SENTRY || '0',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      { 
        test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ] 
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    hot: true,
    port: Number(process.env.PORT),
    publicPath: '/',
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
    },
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
  },
  // optimization: {
  //   moduleIds: 'deterministic',
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 0,
  //     maxInitialRequests: Infinity,
  //     cacheGroups: {
  //       preload: {
  //         name: 'preload',
  //         test: /preload\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //       // Based on https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module: { context: string; _buildHash: string; index: number }) {
  //           let packageName = /[\\/]node_modules[\\/](.*?)([\\/]|$)/.exec(
  //             module.context,
  //           )![1];
  //           packageName = packageName.replace('@', '');
  //           return `npm.${packageName}`;
  //         },
  //       },
  //     },
  //   },
  // }
} as Configuration;
