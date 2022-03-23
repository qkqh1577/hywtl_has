const path = require('path');
const ROOT = './front';

module.exports = {
  mode: 'development',
  entry: `${ROOT}/index.tsx`,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
  },
  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        },
      },
      exclude: /node_modules/,
    }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [ROOT, './node_modules']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};

process.noDeprecation = true;