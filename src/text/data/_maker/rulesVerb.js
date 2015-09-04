// 23 rules verb
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'verb',
  folder: 'rules',
  description: 'regex rules and suffixes for verb conjugation\nused in combination with the generic "fallback" method',
  prefix: 'declare var r:any;\ndeclare var setToken:any;\ndeclare var countStart:any;\ndeclare var noFallback:any;',
  // build
  zip: function(lang, isZip) {
    if (!dict.verbs.conjugate.hasOwnProperty(lang)) { return; }
    var rs = dict.verbs.conjugate[lang];
    if(!isZip) {
      for (var cat in rs) {
        rs[cat] = rs[cat].map(function(o){
          for (var key in o) {
            if (typeof o[key] != 'string') { o[key] = 0; }
          }
          return [o.regex, o.infinitive, o.present, o.gerund, o.past, o.doer].map(function(w){ return (typeof w === 'undefined') ? 0 : w; });
        });
      }
    }
    var o = {
      conjugate: (isZip) ? _.repl(JSON.stringify(rs), 0, ['\\$1e', '\\$1s', '\\$1es', '\\$1ed', '\\$1ing', 'ing']) : rs,
      detect: __.val(dict.verbs.detectFallbacks, {}),
      unPrefix: __.val(dict.verbs.unPrefix, {}),
      fallback: __.val(dict.verbs.fallback, {}),
      fulfill: __.val(dict.verbs.fulfill, {}),
      doer: __.val(dict.verbs.doer, {}),
      doerReplace: {},
      tenseReplace: {},
      suffixes: {}
    };
    for (var id in dict.verbs.tenseReplace) {
      if (dict.verbs.tenseReplace[id].hasOwnProperty(lang)) {
        o.tenseReplace[id] = dict.verbs.tenseReplace[id][lang];
      }
    }
    if (!dict.verbs.suffixes.hasOwnProperty(lang)) { return o; }
    var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
    o.suffixes = (isZip) ? _.repl(JSON.stringify(__.val(dict.verbs.suffixes)), 0, s) : __.val(dict.verbs.suffixes);
    zip = o;
    return zip;
  },
  make: function() {
    zip.detect = _.toObjDeep(zip.detect, ['matches', 'returns']);
    zip.detect = _.tokenFn(zip, 'detect', 1);
    zip.doer = _.toObjDeep(zip.doer, ['matches', 'replacer']);
    zip.doerReplace = _.tokenFn(zip, 'doer');
    zip.tenseReplace = _.tokenFn(zip, 'tenseReplace');
    zip.suffixes = _.toObjValues(zip.suffixes);
    for (var cat in zip.conjugate) {
      zip.conjugate[cat] = zip.conjugate[cat].map(function(a){
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
  },
  // convert it to an easier format
  unzip: function() {
    zip.suffixes = JSON.parse(_.repl(
      zip.suffixes,
      [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]
    ));
    var o/*::any::*/
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
  }
};
