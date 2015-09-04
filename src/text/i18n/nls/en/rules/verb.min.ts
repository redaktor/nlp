import _ = require("../../../nlp/_");

declare var r:any;
declare var setToken:any;
declare var countStart:any;
declare var noFallback:any;
declare var zip:any;
zip = { conjugate: '{"infinitive":[{"reg":{},"repl":{"infinitive":0,"present":"_","gerund":"!","past":"&d","doer":"&r"}},{"reg":{},"repl":{"infinitive":0,"present":"$1$2s","gerund":"$1$2%","past":"$1pt","doer":"$1$2er"}},{"reg":{},"repl":{"infinitive":0,"present":"&s","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"$1ies","gerund":"$1y%","past":"$1ied","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"_","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"&s","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"&s","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"_","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"&s","gerund":"!","past":"ame","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"$1$2s","gerund":"$1$2$2%","past":"$1$2","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"_","gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":0,"present":"_","gerund":"!","past":"&d","doer":0}}],"present":[{"reg":{},"repl":{"infinitive":"y","present":0,"gerund":"y%","past":"ied","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"&","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"!","past":"ew","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"$1p%","past":"$1ped","doer":0}},{"reg":{},"repl":{"infinitive":"$1t","present":0,"gerund":"$1tt%","past":"$1tted","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":0,"gerund":"$1l%","past":"$1led","doer":0}},{"reg":{},"repl":{"infinitive":"&","present":0,"gerund":"!","past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"ss","present":0,"gerund":"ss%","past":"ssed","doer":0}},{"reg":{},"repl":{"infinitive":"","present":0,"gerund":"%","past":"ed","doer":0}}],"gerund":[{"reg":{},"repl":{"infinitive":"p","present":"ps","gerund":0,"past":"pped","doer":0}},{"reg":{},"repl":{"infinitive":"ll","present":"lls","gerund":0,"past":"lled","doer":0}},{"reg":{},"repl":{"infinitive":"t","present":"ts","gerund":0,"past":"t","doer":0}},{"reg":{},"repl":{"infinitive":"ss","present":"sses","gerund":0,"past":"ssed","doer":0}},{"reg":{},"repl":{"infinitive":"g","present":"gs","gerund":0,"past":"gged","doer":0}},{"reg":{},"repl":{"infinitive":"$1y","present":"$1ies","gerund":0,"past":"$1ied","doer":"$1ier"}},{"reg":{},"repl":{"infinitive":"&","present":"&s","gerund":0,"past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"&","present":"&s","gerund":0,"past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":"&s","gerund":0,"past":"&d","doer":0}},{"reg":{},"repl":{"infinitive":"$1","present":"_","gerund":0,"past":"&d","doer":0}}],"past":[{"reg":{},"repl":{"infinitive":0,"present":"ues","gerund":"u%","past":"ued","doer":"uer"}},{"reg":{},"repl":{"infinitive":0,"present":"$1lls","gerund":"$1ll%","past":"$1lled","doer":"$1ller"}},{"reg":{},"repl":{"infinitive":"$1","present":"&s","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"&","present":"&s","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"$1","present":"&s","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"p","present":"ps","gerund":"pp%","past":0,"doer":"pper"}},{"reg":{},"repl":{"infinitive":"t","present":"ts","gerund":"tt%","past":0,"doer":"tter"}},{"reg":{},"repl":{"infinitive":"g","present":"gs","gerund":"gg%","past":0,"doer":"gger"}},{"reg":{},"repl":{"infinitive":"$1","present":"_","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"&","present":"&s","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"y","present":"ies","gerund":"y%","past":0,"doer":"ier"}},{"reg":{},"repl":{"infinitive":"$1o","present":"$1os","gerund":"$1o%","past":0,"doer":"$1oer"}},{"reg":{},"repl":{"infinitive":"$1","present":"_","gerund":"!","past":0,"doer":"&r"}},{"reg":{},"repl":{"infinitive":"$1ow","present":"$1ows","gerund":"$1ow%","past":0,"doer":0}},{"reg":{},"repl":{"infinitive":"$1t","present":"$1ts","gerund":"$1t%","past":0,"doer":0}}]}',
  detect: 
   [ [ /^will\b/, 'future' ],
     [ /([aeiou][^aeiouwyrlm])ing$/, 'gerund' ],
     [ /n't$/, 'negative' ] ],
  unPrefix: /^(over|under|re|anti|full)\-?/i,
  fallback: function (w, o) {
			if (w.length > 4) {
				o.infinitive = w.replace(/ed$/, '');
			} else {
				o.infinitive = w.replace(/d$/, '');
			}
			if (w.match(/[^aeiou]$/)) {
				o.gerund = [w, 'ing'].join('');
				o.past = [w, 'ed'].join('');
				if (w.match(/ss$/)) {
					o.present = [w, 'es'].join(''); //'passes'
				} else {
					o.present = [w, 's'].join('');
				}
			} else {
				o.gerund = w.replace(/[aeiou]$/, 'ing');
				o.past = w.replace(/[aeiou]$/, 'ed');
				o.present = w.replace(/[aeiou]$/, 'es');
			}
			return o;
		},
  fulfill: function (o) {
			return {
				gerund: [o.infinitive, 'ing'],
				present: [o.infinitive, 's'],
				past: [o.infinitive, 'ed'],
				future: ['will ', o.infinitive],
				perfect: ['have ', o.past],
				pluperfect: ['had ', o.past],
				futurePerfect: ['will have ', o.past]
			};
		},
  doer: 
   [ [ /e$/i, 'er' ],
     [ /([aeiou])([mlgp])$/i, '$1$2$2er' ],
     [ /([rlf])y$/i, '$1ier' ],
     [ /^(.?.[aeiou])t$/i, '$1tter' ] ],
  doerReplace: {},
  tenseReplace: 
   { pluperfect: { matches: /^had [a-z]/i, replaces: /^had /i, replacer: '' },
     perfect: { matches: /^have [a-z]/i, replaces: /^have /i, replacer: '' },
     futurePerfect: 
      { matches: /^will have [a-z]/i,
        replaces: /^will have /i,
        replacer: '' },
     future: { replaces: /^will /i, replacer: '' } },
  suffixes: '{"g_und":["ing"],"infinit1":["5`2`tion`rify`r~s`ify`age`nce`ect`@`ine`3`ace`ash`ure`tch`8`ack`and`ute`4`ock`0`ase`6`>`1`i;`nge`lay`~t`ain`%`e&`_`#"],"past":["&`lt`;`pt`ew`ld"],"pr~e;":["rks`cks`nks`ngs`mps`t~`z~`_s`#s`acks`8s`ands`ocks`lays`eads`lls`els`ils`ows`nds`ays`ams`ars`ops`ffs`als`urs`lds`ews`ips`~`ts`!`s"]}' }

export = (function () {
    zip.suffixes = JSON.parse(_.repl(
      zip.suffixes,
      [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]
    ));
    var o:any
    o = _.toObjDeep(zip.doer, ['matches', 'replacer']); zip.doer = o;
    o = zip;
    o.detect = _.toObjDeep(zip.detect, ['matches', 'returns']);
    o.detect = _.tokenFn(o, 'detect', 1); zip.detect = o.detect;
    o.doerReplace = _.tokenFn(zip, 'doer'); zip.doerReplace = o.doerReplace;
    o.suffixes = _.toObjValues(zip.suffixes); zip.suffixes = o.suffixes;
    o.tenseReplace = _.tokenFn(zip, 'tenseReplace'); zip.tenseReplace = o.tenseReplace;
    o.conjugate = JSON.parse(_.repl(zip.conjugate, ['$1e', '$1s', '$1es', '$1ed', '$1ing', 'ing']));
    for (var cat in o.conjugate) {
      zip.conjugate[cat] = o.conjugate[cat].map(function(a){
        return {
          reg: new RegExp(a[0],'i'),
          repl: {
            infinitive:a[1],
            present:a[2],
            gerund:a[3],
            past:a[4],
            doer:a[5]
          }
        };
      });
    }
    return zip;
  })();