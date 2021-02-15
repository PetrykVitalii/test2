import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    // },
    minimizer: [new OptimazeCssAssetPlugin(), new TerserWebpackPlugin()],
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
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   eslint: {
    //     files: "./src/**/*",
    //   },
    // }),
    new HtmlWebpackPlugin({ template: "./src/html/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/netlify/_redirects", to: "_redirects", toType: "file" },
      ],
    }),
  ],
};

export default config;