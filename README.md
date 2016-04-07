# emit-timestamp-webpack-plugin

```
A Webpack plugin which properly emits a JSON file on the fly.
```

# Example

```javascript
{ now: 1460025823843,
  YYYY: 2016,
  M: 4,
  D: 19,
  H: 7,
  m: 43,
  s: 843,
  SSS: '1460025823',
  X: 1460025823843,
  x: undefined,
  YY: 16,
  MM: '04',
  DD: '19',
  HH: '07',
  hh: '43',
  mm: '43',
  ss: '843',
  A: 'AM',
  a: 'am',
  localized: '4/7/2016, 7:43:43 PM',
  iso: '2016-04-07T10:43:43.843Z',
  gmt: 'Thu, 07 Apr 2016 10:43:43 GMT' }
```

# Install

```
npm i --save-dev emit-timestamp-webpack-plugin
```

# Usage

```javascript

var EmitTimestampPlugin = require( 'emit-timestamp-webpack-plugin' );
module.exports = {
  /*...*/
  plugins: [
    new EmitTimestampPlugin( [options] ),
    /*...*/
  ]
  /*...*/
};
```

# Options
## `path` : string
sets path prefix for a .json file. default: `''`

## `filename` : string
sets .json filename. default: `'timestamp.json'`

## `beautify` : boolean
sets whether to emit a formatted JSON file. default: `false`

# License
WTFPL
