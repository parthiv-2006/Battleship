const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry point of your application
  entry: './src/index.js',

  // Where the bundled code will be output
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the /dist folder before each build
  },

  // Loaders tell webpack how to process different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Transpiles modern JavaScript
      },
    ],
  },

  // Plugins can be used to perform a wider range of tasks
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Use our HTML file as a template
    }),
  ],
};