import _ = require("../../../nlp/_");

var types:any;
declare var zip:any;
zip = { which: 
   { comparative: { matches: /..er$/, tag: 'JJR' },
     superlative: { matches: /..est$/, tag: 'JJS' } },
  adverb: 
   { to: 
      [ [ /al$/i, 'ally' ],
        [ /ly$/i, 'ly' ],
        [ /(.{3})y$/i, '$1ily' ],
        [ /que$/i, 'quely' ],
        [ /ue$/i, 'uly' ],
        [ /ic$/i, 'ically' ],
        [ /ble$/i, 'bly' ],
        [ /l$/i, 'ly' ] ],
     no: [ /airs$/, /ll$/, /ee.$/, /ile$/ ],
     fallback: function (word) {
				return [word,'ly'].join('');
			} },
  comparative: 
   { to: 
      [ [ /y$/i, 'ier' ],
        [ /([aeiou])t$/i, '$1tter' ],
        [ /([aeou])de$/i, '$1der' ],
        [ /nge$/i, 'nger' ] ],
     no: [ /ary$/, /ous$/ ],
     fn: function (word) {
				return [word,(word.match(/e$/) ? 'r' : 'er')].join('');
			},
     regular: 
      [ /ght$/,
        /nge$/,
        /ough$/,
        /ain$/,
        /uel$/,
        /[au]ll$/,
        /ow$/,
        /old$/,
        /oud$/,
        /e[ae]p$/ ],
     fallback: function (word) {
				return ['more', word].join(' ');
			} },
  superlative: 
   { to: 
      [ [ /y$/i, 'iest' ],
        [ /([aeiou])t$/i, '$1ttest' ],
        [ /([aeou])de$/i, '$1dest' ],
        [ /nge$/i, 'ngest' ] ],
     no: [ /ary$/ ],
     fn: function (word) {
				if (word.match(/e$/)) {
					return [word,'st'].join('');
				} else {
					return [word,'est'].join('');
				}
			},
     regular: 
      [ /ght$/,
        /nge$/,
        /ough$/,
        /ain$/,
        /uel$/,
        /[au]ll$/,
        /ow$/,
        /oud$/,
        /...p$/ ],
     fallback: function (word) {
				return ['most', word].join(' ');
			} },
  noun: 
   { to: 
      [ [ /y$/, 'iness' ],
        [ /le$/, 'ility' ],
        [ /ial$/, 'y' ],
        [ /al$/, 'ality' ],
        [ /ting$/, 'ting' ],
        [ /ring$/, 'ring' ],
        [ /bing$/, 'bingness' ],
        [ /sing$/, 'se' ],
        [ /ing$/, 'ment' ],
        [ /ess$/, 'essness' ],
        [ /ous$/, 'ousness' ] ],
     no: [ /\s$/, /w$/, /s$/ ],
     fallback: function (word) {
				return [word,'ness'].join('');
			} } }

export = (function () {
    var m = 'matches', r = 'replacer', rt = 'returns';
    [['adverb', 'to', [m, r]], ['adverb', 'no', [m]],
     ['comparative','to',[m, r]], ['comparative','no',[m]], ['comparative','regular',[m]],
     ['superlative','to',[m, r]], ['superlative','no',[m]],  ['superlative','regular',[m]],
     ['noun','to',[m, r]], ['noun','no',[m]],
     ['which', [m, rt]]].forEach(function(a:any){
      types = a;
      var objKeys = a.pop();
      if (a[1]) { zip[a[0]][a[1]] = _.toObjDeep(zip[a[0]][a[1]], objKeys); }
      _.setObjKey(a, _.tokenFn(zip, a, 1), zip);
    });
    return zip;
  })();