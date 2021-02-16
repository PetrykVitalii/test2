/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, EnvironmentPlugin } from 'webpack';
// import TerserWebpackPlugin from 'terser-webpack-plugin';
// import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { config } from 'dotenv';

config();

export default {
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
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  //   minimizer: [new OptimazeCssAssetPlugin(), new TerserWebpackPlugin()],
  // },
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
    // plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./html/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "netlify/_redirects", to: "_redirects", toType: "file" },
      ],
    }),
    new EnvironmentPlugin({
      API_URL: process.env.API_URL,
      SELL_APP_URL: process.env.SELL_APP_URL
    }),
  ],
} as Configuration;