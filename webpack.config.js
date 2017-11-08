var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var candelaLoaders = require('candela/webpack');

module.exports = candelaLoaders({
  devtool: 'cheap-module-source-eval',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.template.ejs',
      title: 'Jobmock Vis',
      chunks: [
        'index'
      ]
    })
  ]
});
