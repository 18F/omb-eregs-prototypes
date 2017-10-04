const path = require('path');

module.exports = {
  devtool: 'sourcemap',
  entry: ['babel-polyfill', path.join(__dirname, 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'editor.js',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
