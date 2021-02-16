import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import TerserWebpackPlugin from 'terser-webpack-plugin';
// import OptimazeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
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
  ],
};

export default config;