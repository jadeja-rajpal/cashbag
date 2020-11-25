const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env) => {
  const { BUILD_ENV } = env;

  return {
    entry: ["babel-polyfill", "./src/index.js"],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "eslint-loader",
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "img/[name].[ext]",
              },
            },
            {
              loader: "img-loader",
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: ["./src"],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devServer: {
      host: "0.0.0.0",
      allowedHosts: ["cashbag-admin", "cashbag-admin.cloudzmall.com"],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          BUILD_ENV: JSON.stringify(BUILD_ENV),
          REACT_APP_DEV_API: JSON.stringify(
            "https://cashbag-api.cloudzmall.com"
          ),
          REACT_APP_PROD_API: JSON.stringify(
            "http://www.todo-production-api.com"
          ),
          REACT_APP_STAG_API: JSON.stringify("http://www.todo-STAGING-api.com"),
          REACT_APP_API_SITE_ID: JSON.stringify(
            "fd000317-54cb-498b-a7d1-485f07b90405"
          ),
          REACT_APP_PLATFORM: JSON.stringify("web"),
          REACT_APP_VERSION: JSON.stringify("1.0"),
        },
      }),
      new HtmlWebPackPlugin({
        template: "src/index.html",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  };
};
