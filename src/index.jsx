const spawnSync = require( 'child_process' ).spawnSync;

class EmitTimestampPlugin {
  constructor( {
    path = '',
    filename = 'timestamp.json',
    beautify = false,
    log = 'localized',
    git = false,
  } = {} ) {
    this.options = {
      path,
      filename,
      beautify,
      log,
      git,
    };
  }
  _getGitObject() {
    const { git } = this.options;
    const describe = (
      git && git.describe ?
      spawnSync( 'git', 'describe,--tags,--long,--dirty=!'.split( ',' ) ).stdout.toString().trim() :
      void 0
    );
    const status = (
      git && git.status ?
      spawnSync( 'git', 'status,--porcelain,-b'.split( ',' ) ).stdout.toString().trim() :
      void 0
    );
    return { describe, status };
  }
  _getTimestampObject() {
    const fnZero = ( n, len = 2 ) => '0'.repeat( Math.max( 0, len - String( n ).length ) ) + n;
    const dtNow = new Date();
    const now = Date.now();
    const [
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
    ] = [
      dtNow.getFullYear(), dtNow.getMonth() + 1,
      dtNow.getDate(),
      dtNow.getHours(),
      dtNow.getHours() % 12,
      dtNow.getMinutes(),
      dtNow.getSeconds(),
      dtNow.getMilliseconds(),
      Math.floor( now / 1000 ),
      now,
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
  }
  apply( compiler ) {
    compiler.plugin( 'emit', ( compilation, callback ) => {
      const { options, _getGitObject, _getTimestampObject } = this;
      let oResult = _getTimestampObject();
      if ( options.git && options.git.enabled ) {
        oResult = {
          ...oResult,
          ..._getGitObject(),
        };
      }

      const result = JSON.stringify( oResult, false, options.beautify ? 2 : false );
      // Insert this list into the Webpack build as a new file asset:
      compilation.assets[ options.path + options.filename ] = {
        source: () => result,
        size: () => result.length,
      };
      if ( options.log ) {
        //eslint-disable-next-line
        console.log( 'EmitTimestampPlugin - Emit', result[ options.log ] || 'N/A' );
      }
      callback();
    } );
  }
}

export default EmitTimestampPlugin;
