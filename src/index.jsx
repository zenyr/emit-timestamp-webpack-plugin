// # EmitTimestampPlugin
// There were some plugins that intends to fix the same issue
// but none of them were emitting the result properly, per spec.
function EmitTimestampPlugin( {
  path = '',
  filename = 'timestamp.json',
  beautify = false,
} = {} ) {
  this.options = {
    path,
    filename,
    beautify,
  };
}
// # private: `_getTimestampObject`
// Make an object we desire
EmitTimestampPlugin.prototype._getTimestampObject = function () {
  const fnZero = ( n, len = 2 ) => '0'.repeat( Math.max( 0, len - String( n ).length ) ) + n;
  const dtNow = new Date();
  const now = Date.now();
  const [
    YYYY, M, D,
    H, h, m, s, sss,
    X, x,
  ] = [
    dtNow.getFullYear(), dtNow.getMonth() + 1, dtNow.getDate(),
    dtNow.getHours(), dtNow.getHours() % 12, dtNow.getMinutes(), dtNow.getSeconds(), dtNow.getMilliseconds(),
    Math.floor( now / 1000 ), now,
  ];
  const oResult = {
    now,
    YYYY,
    M,
    D,
    H,
    h,
    m,
    s,
    sss,
    X,
    x,
    YY: YYYY % 100,
    MM: fnZero( M ),
    DD: fnZero( D ),
    HH: fnZero( H ),
    hh: fnZero( h ),
    mm: fnZero( m ),
    ss: fnZero( s ),
    SSS: fnZero( sss, 3 ),
    A: H < 12 ? 'AM' : 'PM',
    a: H < 12 ? 'am' : 'pm',
    localized: dtNow.toLocaleString(),
    iso: dtNow.toISOString(),
    gmt: dtNow.toGMTString(),
    string: dtNow.toString(),
  };
  return oResult;
};

// # public: `apply`
// Webpack will ask EmitTimestampPlugin.apply to plug a callback before processing.
EmitTimestampPlugin.prototype.apply = function ( compiler ) {
  compiler.plugin( 'emit', ( compilation, callback ) => {
    const result = JSON.stringify( this._getTimestampObject(), false, this.options.beautify ? 2 : false );
    // Tells webpack to include `path`+`filename` asset, as in spec.
    compilation.assets[ this.options.path + this.options.filename ] = {
      source: () => result,
      size: () => result.length,
    };
    callback();
  } );
};
module.exports = EmitTimestampPlugin;
