const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Helps with debugging by mapping compiled code back to original source code

  // Webpack dev server configuration
  devServer: {
    static: './dist',
    hot: true, // Enables Hot Module Replacement
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Injects CSS directly into the DOM
      },
    ],
  },
});