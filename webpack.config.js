const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    extensions: [ '.js', '.ts', '.tsx' ],
  },
  devtool: prod ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [ 'babel-loader' ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: prod ? void 0 : {
    historyApiFallback: true,
  },
};
