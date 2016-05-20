'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spawnSync = require('child_process').spawnSync;

var EmitTimestampPlugin = function () {
  function EmitTimestampPlugin() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$path = _ref.path;
    var path = _ref$path === undefined ? '' : _ref$path;
    var _ref$filename = _ref.filename;
    var filename = _ref$filename === undefined ? 'timestamp.json' : _ref$filename;
    var _ref$beautify = _ref.beautify;
    var beautify = _ref$beautify === undefined ? false : _ref$beautify;
    var _ref$log = _ref.log;
    var log = _ref$log === undefined ? 'localized' : _ref$log;
    var _ref$git = _ref.git;
    var git = _ref$git === undefined ? false : _ref$git;

    _classCallCheck(this, EmitTimestampPlugin);

    this.options = {
      path: path,
      filename: filename,
      beautify: beautify,
      log: log,
      git: git
    };
  }

  _createClass(EmitTimestampPlugin, [{
    key: '_getGitObject',
    value: function _getGitObject() {
      var git = this.options.git;

      var describe = git && git.describe ? spawnSync('git', 'describe,--tags,--long,--dirty=!'.split(',')).stdout.toString().trim() : void 0;
      var status = git && git.status ? spawnSync('git', 'status,--porcelain,-b'.split(',')).stdout.toString().trim() : void 0;
      return { describe: describe, status: status };
    }
  }, {
    key: '_getTimestampObject',
    value: function _getTimestampObject() {
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
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('emit', function (compilation, callback) {
        var options = _this.options;
        var _getGitObject = _this._getGitObject;
        var _getTimestampObject = _this._getTimestampObject;

        var oResult = _getTimestampObject();
        if (options.git && options.git.enabled) {
          oResult = _extends({}, oResult, _getGitObject());
        }

        var result = JSON.stringify(oResult, false, options.beautify ? 2 : false);
        // Insert this list into the Webpack build as a new file asset:
        compilation.assets[options.path + options.filename] = {
          source: function source() {
            return result;
          },
          size: function size() {
            return result.length;
          }
        };
        if (options.log) {
          //eslint-disable-next-line
          console.log('EmitTimestampPlugin - Emit', result[options.log] || 'N/A');
        }
        callback();
      });
    }
  }]);

  return EmitTimestampPlugin;
}();

exports.default = EmitTimestampPlugin;