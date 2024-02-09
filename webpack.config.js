const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './index.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: ['npm run:dev']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
}