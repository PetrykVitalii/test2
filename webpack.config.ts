import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: "./index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new OptimazeCssAssetPlugin(), new TerserWebpackPlugin()],
  },
  devServer: {
    port: 3333,
    hot: false,
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   eslint: {
    //     files: "./src/**/*",
    //   },
    // }),
    new HtmlWebpackPlugin({ template: "./html/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./netlify/_redirects", to: "_redirects", toType: "file" },
      ],
    }),
  ],
  resolve: {
    // plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};

export default config;