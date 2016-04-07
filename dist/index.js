'use strict';

function EmitTimestampPlugin() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$path = _ref.path;
  var path = _ref$path === undefined ? '' : _ref$path;
  var _ref$filename = _ref.filename;
  var filename = _ref$filename === undefined ? 'timestamp.json' : _ref$filename;
  var _ref$beautify = _ref.beautify;
  var beautify = _ref$beautify === undefined ? false : _ref$beautify;

  this.options = {
    path: path,
    filename: filename,
    beautify: beautify
  };
}

EmitTimestampPlugin.prototype._getTimestampObject = function () {
  var fnZero = function fnZero(n) {
    var len = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
    return '0'.repeat(Math.max(0, len - String(n).length)) + n;
  };
  var dtNow = new Date();
  var now = Date.now();
  var YYYY = dtNow.getFullYear();
  var M = dtNow.getMonth() + 1;
  var D = dtNow.getDate();
  var H = dtNow.getHours();
  var h = dtNow.getHours() % 12;
  var m = dtNow.getMinutes();
  var s = dtNow.getSeconds();
  var sss = dtNow.getMilliseconds();
  var X = Math.floor(now / 1000);
  var x = now;

  var oResult = {
    now: now,
    YYYY: YYYY,
    M: M,
    D: D,
    H: H,
    h: h,
    m: m,
    s: s,
    sss: sss,
    X: X,
    x: x,
    YY: YYYY % 100,
    MM: fnZero(M),
    DD: fnZero(D),
    HH: fnZero(H),
    hh: fnZero(h),
    mm: fnZero(m),
    ss: fnZero(s),
    SSS: fnZero(sss, 3),
    A: H < 12 ? 'AM' : 'PM',
    a: H < 12 ? 'am' : 'pm',
    localized: dtNow.toLocaleString(),
    iso: dtNow.toISOString(),
    gmt: dtNow.toGMTString(),
    string: dtNow.toString()
  };
  return oResult;
};

EmitTimestampPlugin.prototype.apply = function (compiler) {
  var _this = this;

  compiler.plugin('emit', function (compilation, callback) {
    var result = JSON.stringify(_this._getTimestampObject(), false, _this.options.beautify ? 2 : false);

    // Insert this list into the Webpack build as a new file asset:
    compilation.assets[_this.options.path + _this.options.filename] = {
      source: function source() {
        return result;
      },
      size: function size() {
        return result.length;
      }
    };

    callback();
  });
};

module.exports = EmitTimestampPlugin;