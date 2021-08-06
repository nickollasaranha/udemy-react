const wp = require('@cypress/webpack-preprocessor')

module.exports = wp({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  }
})
