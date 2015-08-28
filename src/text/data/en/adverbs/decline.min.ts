declare var zip:any;
zip = [ [ 'wholly', 'whole' ],
  [ 'idly', 'idle' ],
  [ '=y', 'full' ],
  [ '=ly', 'practical' ],
  [ '=ly', 'theoretical' ],
  [ '=ally', 'sporadic' ],
  [ '=ally', 'basic' ],
  [ '=ly', 'grammatical' ],
  [ '=ly', 'alphabetical' ],
  [ '=ly', 'economical' ],
  [ '=ly', 'conical' ],
  [ '=ly', 'political' ],
  [ '=ly', 'vertical' ],
  [ '=ly', 'critical' ],
  [ '=ally', 'fantastic' ],
  [ '=ly', 'mystical' ],
  [ '=ally', 'pornographic' ],
  [ '=', 'jolly' ] ]

export = (function () {
    var o = {};
    zip.forEach(function(a) {
      o[a[0].replace('=', a[1])] = a[1];
    });
    return o;
  })();