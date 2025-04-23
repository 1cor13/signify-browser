const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'MyApp', // optional: exposes global variable (window.MyApp)
    libraryTarget: 'var', // needed to attach it to window
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      // Polyfills for Node modules
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      vm: require.resolve('vm-browserify'),
      process: require.resolve('process/browser'), // Add this line

    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  mode: 'production',
};