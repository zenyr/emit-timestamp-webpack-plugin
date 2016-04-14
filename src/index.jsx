function EmitTimestampPlugin( {
  path = '',
  filename = 'timestamp.json',
  beautify = false,
  log = 'localized',
} = {}) {
  this.options = {
    path,
    filename,
    beautify,
    log,
  };
}

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

EmitTimestampPlugin.prototype.apply = function ( compiler ) {
  compiler.plugin( 'emit', ( compilation, callback ) => {
    const result = JSON.stringify( this._getTimestampObject(), false, this.options.beautify ? 2 : false );
    // Insert this list into the Webpack build as a new file asset:
    compilation.assets[ this.options.path + this.options.filename ] = {
      source: () => result,
      size: () => result.length,
    };
    if (this.options.log) {
      console.log( 'EmitTimestampPlugin - Emit', result[ this.options.log ] || 'N/A' );
    }
    callback();
  } );
};

module.exports = EmitTimestampPlugin;
