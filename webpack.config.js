const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
      minify: {
        minifyCSS: true,
        minifyJS: true
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        use: [
          {
            loader: 'file-loader?name=assets/fonts/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset"
      },
      {
        test: /\.(svg)$/i,
        type: "asset/source"
      },
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  }
}
