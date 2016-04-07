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
  var _ref2 = [dtNow.getFullYear(), dtNow.getMonth() + 1, dtNow.getHours(), dtNow.getHours() % 12, dtNow.getMinutes(), dtNow.getSeconds(), dtNow.getMilliseconds(), Math.floor(now / 1000), now];
  var YYYY = _ref2[0];
  var M = _ref2[1];
  var D = _ref2[2];
  var H = _ref2[3];
  var h = _ref2[4];
  var m = _ref2[5];
  var s = _ref2[6];
  var SSS = _ref2[7];
  var X = _ref2[8];
  var x = _ref2[9];

  var oResult = {
    now: now,
    YYYY: YYYY,
    M: M,
    D: D,
    H: H,
    m: m,
    s: s,
    SSS: fnZero(SSS, 3),
    X: X,
    x: x,
    YY: YYYY % 100,
    MM: fnZero(M),
    DD: fnZero(D),
    HH: fnZero(H),
    hh: fnZero(h),
    mm: fnZero(m),
    ss: fnZero(s),
    A: H < 12 ? 'AM' : 'PM',
    a: H < 12 ? 'am' : 'pm',
    localized: dtNow.toLocaleString(),
    iso: dtNow.toISOString(),
    gmt: dtNow.toGMTString()
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