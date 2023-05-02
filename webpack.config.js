const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.[chunkhash].js",
    assetModuleFilename: "./assets/svg/[name][ext]",
  },
  plugins: [
    new HTMLPlugin({
      template: "./index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "month-table.html",
      template: "./src/month-table.html",
    }),
    new HtmlWebpackPlugin({
      filename: "week-table.html",
      template: "./src/week-table.html",
    }),
    new HtmlWebpackPlugin({
      filename: "year-table.html",
      template: "./src/year-table.html",
    }),
    new HtmlWebpackPlugin({
      filename: "sign-up.html",
      template: "./src/sign-up.html",
    }),
    new HtmlWebpackPlugin({
      filename: "sign-in.html",
      template: "./src/sign-in.html",
    }),
    new HtmlWebpackPlugin({
      filename: "add-new.html",
      template: "./src/add-new.html",
    }),
    new HtmlWebpackPlugin({
      filename: "add-theme.html",
      template: "./src/add-theme.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader",
      },
    ],
  },
};