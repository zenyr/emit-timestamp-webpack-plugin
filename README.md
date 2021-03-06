# emit-timestamp-webpack-plugin

```
A Webpack plugin which properly emits a JSON file on the fly.
```

# Webpack@2 notice

This plugin was built for `webpack@1` and not yet tested throughly for the latest `webpack@2`, which is the default at this moment.
It was not even a thing back then.. :D

While I have succesfully ran a test on `webpack@2` with `emit-timestamp-webpack-plugin@0.3.2`, there is a report(issue #1) that this plugin may not work as intended. Any sort of PR is welcomed.

# Changelog

- `2016-05-25` **v0.3.1**
  - Fixed ES5 compatibility
- `2016-05-20` **v0.3.0**
  - Added `{..., git:{status:true, describe:true}}` option (default: false)

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
  string: 'Thu Apr 07 2016 20:11:11 GMT+0900 (대한민국 표준시)'
  describe: 'v0.2.0-1-g6e3feef!',
  status: '## master...origin/master\n M .babelrc\n M .jsbeautifyrc\n M README.md\n M dist/index.js\n M package.json\n M src/index.jsx\n M test/mocha.jsx' }

}
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
  const yourGitDescribe = tsObj.describe; // requires git:{describe:true} in options. requires a proper git repo.
  alert(`This was compiled at ${formattedTime}. Or... ${yourDatetime.toString()}. Git describe: ${yourGitDescribe}`);
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
logs given field to webpack builder. set  to '' or false to disable. default: `false`

## `git` : object {status:boolean, describe:boolean} or false
sets whether to include `status` and `describe` field. Requires `git` in your project's `PATH`. false to disable. default: `false`

# License
WTFPL
