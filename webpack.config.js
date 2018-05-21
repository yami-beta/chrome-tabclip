const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

let mode = process.env.NODE_ENV || "production";
let publicPath = "/";

module.exports = {
  mode,
  entry: {
    background: [path.join(__dirname, "src", "background.js")]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  devtool: mode === "development" ? "inline-source-map" : false,
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/images/", to: "images/" },
      { from: "src/manifest.json", to: "manifest.json" }
    ])
  ]
};
