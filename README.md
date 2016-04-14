# emit-timestamp-webpack-plugin

```
A Webpack plugin which properly emits a JSON file on the fly.
```

# Example

```javascript
{ now: 1460027471371,
  YYYY: 2016,
  M: 4,
  D: 7,
  H: 20,
  h: 8,
  m: 11,
  s: 11,
  sss: 371,
  X: 1460027471,
  x: 1460027471371,
  YY: 16,
  MM: '04',
  DD: '07',
  HH: '20',
  hh: '08',
  mm: '11',
  ss: '11',
  SSS: '371',
  A: 'PM',
  a: 'pm',
  localized: '4/7/2016, 8:11:11 PM',
  iso: '2016-04-07T11:11:11.371Z',
  gmt: 'Thu, 07 Apr 2016 11:11:11 GMT',
  string: 'Thu Apr 07 2016 20:11:11 GMT+0900 (대한민국 표준시)' }
```
note that `string` and `localized` field depends on your `node` environment.

# Install

```
npm i --save-dev emit-timestamp-webpack-plugin
```

# Usage

`webpack.config.js`
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

`your_script.js`
```javascript
import getJson from 'your-ajax-library-such-as-fetch-or-jquery-whatever';

getJson('timestamp.json').then((tsObj)=>{
  // do your thing
  const formattedTime = `${tsObj.YYYY}-${tsObj.MM}-${tsObj.DD} ${tsObj.HH}:${tsObj.mm}:${tsObj.ss}`;
  const yourDatetime = new Date(tsObj.now); // beware of timezone offset quirks.
  alert(`This was compiled at ${formattedTime}. Or... ${yourDatetime.toString()}.`);
}).catch((err)=>{
  // duh
  alert(`emit-timestamp-webpack-plugin sucks. It's not working!`);
});
```

# Options
## `path` : string
sets path prefix for a .json file. default: `''`

## `filename` : string
sets .json filename. default: `'timestamp.json'`

## `beautify` : boolean
sets whether to emit a formatted JSON file. default: `false`

## `log` : string
logs given field to webpack builder. set  to '' or false to disable. default: `'localized'`

# License
WTFPL
