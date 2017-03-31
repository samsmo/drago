var webpack = require('webpack');

module.exports = {
    cache: false,
    entry: './src/drago.js',
    output: {
        filename: 'index.js',
        path: __dirname,
        libraryTarget: 'umd',
    },
    module: {
        loaders: [{
          test: /\.(js)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['es2015', 'stage-0']
          }
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }
      ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'lib'],
        extensions: ['', '.js', '.jsx']
    },
    target: 'web',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
              screw_ie8: true
          },
          comments: false
      })
    ]
};
