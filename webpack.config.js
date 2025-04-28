const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'signify-browser.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'signify-browser', // optional: exposes global variable (window.MyApp)
    libraryTarget: 'umd', // needed to attach it to window
    globalObject: 'this', // needed for UMD to work in Node.js and browser
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