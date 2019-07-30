const path = require('path')

const pkgPath = path.join(__dirname, '..')
const srcPath = path.join(pkgPath, 'src')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  mode: 'none',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: require('./babelOptions')
          }
        ]
      }
    ]
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },

  output: {
    filename: 'js/[name].js',
    path: path.join(pkgPath, '__build__'),
    pathinfo: false,
    publicPath: '/'
  },

  plugins: [],

  resolve: {
    modules: [srcPath, 'node_modules']
  },

  stats: {
    colors: true
  }
}
