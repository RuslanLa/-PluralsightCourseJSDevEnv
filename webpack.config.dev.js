import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: "eval-source-map",
  entry: [path.resolve(__dirname, "src/index")],
  target: "web",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] }
    ]
  }
};
