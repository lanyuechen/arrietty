const path = require('path');

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    entry: {
      index: './src/index.js'
    },
    output: {
      filename: 'arrietty.min.js',
      path: path.resolve(__dirname, 'lib'),
      library: 'arrietty',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: './src',
      host: '0.0.0.0',
      historyApiFallback: true
    },
    plugins: [],
    externals: {

    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  };
};
