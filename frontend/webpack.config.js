const path = require("path");

module.exports = (env, argv) => {
  return {
    devtool: argv.mode == "development" ? "source-map" : false,

    output: {
      path: path.resolve(__dirname, "../static/js"),
      filename: "main.js",
    },
    entry: {
      main: path.resolve(__dirname, "src/index.js"),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
  };
};
