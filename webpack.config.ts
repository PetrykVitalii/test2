/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import TerserWebpackPlugin from 'terser-webpack-plugin';
// import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config = {
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
        { from: "assets", to: "assets", noErrorOnMissing: true },
        { from: "netlify/_redirects", to: "_redirects", toType: "file" },
        { from: "robots.txt", to: "robots.txt", toType: "file" },
      ],
    }),
  ],
};

export default config;