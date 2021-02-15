import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/html/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/netlify/_redirects", to: "_redirects", toType: "file" },
      ],
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
};

export default config;