const path = require('path');

module.exports = {
  entry: './ev3_source.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stdlib.js',
    libraryTarget: 'commonjs2',
  },
  target: "node",
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  }
};
