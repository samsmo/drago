module.exports = {
    cache: false,
    entry: './libs/main',
    output: {
        filename: 'bundle.js',
        path: __dirname,
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
    }
};
