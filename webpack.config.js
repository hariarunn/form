// Generated using webpack-cli https://github.com/webpack/webpack-cli

const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const PostCSSpresetEnv = require("postcss-preset-env");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const NodeExternals = require("webpack-node-externals");
const pkg = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");
const { BannerPlugin } = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/react-wizardry.ts",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: pkg.name + ".js",
    library: {
      name: pkg.name,
      type: "umd",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: pkg.name + ".css",
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: "static",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "README.md",
          to: "README.md",
        },
      ],
    }),
    new BannerPlugin({
      banner: `${pkg.name} v${pkg.version}`,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  externals: [
    NodeExternals({
      allowlist: ["nanoid", "classnames", "use-debounce"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              target: "es2020",
              loader: "tsx",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer(), PostCSSpresetEnv()],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
