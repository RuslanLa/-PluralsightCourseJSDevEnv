import webpack from "webpack";
import path from "path";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  devtool: "source-map",
  entry: {
    vendor: path.resolve(__dirname, "src/vendor"),
    main: path.resolve(__dirname, "src/index")
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /vendor.js/, // you may add "vendor.js" here if you want to
          name: "vendor",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new ExtractTextPlugin("[name].[contenthash].css"),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      trackJSToken: 'f4a4a1372b824df2859ab1be5617b46c',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebpackMd5Hash()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  }
};
