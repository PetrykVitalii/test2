import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, EnvironmentPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { config } from 'dotenv';

config();

export default {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
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
        { from: 'netlify/_redirects', to: '_redirects', toType: 'file' },
      ],
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
    // plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
  },
} as Configuration;
