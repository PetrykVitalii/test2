/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import TerserWebpackPlugin from 'terser-webpack-plugin';
// import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'; 
import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();
const configT = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: {
    bundle: "./index.tsx",
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    inline: true,
    hot: true,
    port: Number(process.env.PORT),
    publicPath: "/",
    host: "0.0.0.0",
    historyApiFallback: {
      index: "/",
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 850000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [createStyledComponentsTransformer()],
          }),
        },
      },
      { 
        test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ] 
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./html/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets", noErrorOnMissing: true },
        { from: "netlify/_redirects", to: "_redirects", toType: "file" },
      ],
    }),
    new EnvironmentPlugin({
      API_URL: process.env.API_URL,
      SELL_APP_URL: process.env.SELL_APP_URL,
    }),
  ],
};

export default configT;