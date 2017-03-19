const EmitTimestampPlugin = require('emit-timestamp-webpack-plugin').default;
/**
 Note: .default may or may not be required with CommonJS system, depending on your tooling, mostly it should.

 basically

 (ES6) import { EmitTimestampPlugin } from 'emit-timestamp-webpack-plugin';
  ===
 (CommonJS) const EmitTimestampPlugin = require('emit-timestamp-webpack-plugin').default;

 However, when it is misplaced it should generate a very visible error everytime like
 "TypeError: EmitTimestampPlugin is not a constructor"
 or such.
**/

// very basic webpack2 config
const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'output.js',
  },
  plugins: [new EmitTimestampPlugin()],
};
