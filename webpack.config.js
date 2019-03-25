const path = require('path')

const config = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },
}

module.exports = config
