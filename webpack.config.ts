import path from "path";

const mode = process.env.NODE_ENV || "development";

const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: path.join(__dirname, "src", "index.js"), //enter point
  output: {
    // output point
    path: path.join(__dirname, "dist"),
    clean: true,
    filename: "index.[contenthash].js",
    assetModuleFilename: "assets/[name][ext]", // directory for all assets
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  // devServer: {
  //   //server online
  //   watchFiles: path.join(__dirname, "index.js"),
  //   hot: true,
  //   open: true,
  //   port: 9000,
  // },
};
