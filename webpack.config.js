const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssLoader = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.[hash].js',
    chunkFilename: '[name].[hash].js',
    path: resolve('./public'),
    publicPath: '/',
  },
  resolve: {
    extensions: [ '.js', '.ts', '.tsx', '.css' ],
  },
  devtool: prod ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssLoader.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssLoader({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: '',
        },
      ],
    }),
  ],
  devServer: prod ? void 0 : {
    historyApiFallback: true,
  },
};
