// 25 rules adjective
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'adjective',
  folder: 'rules',
  description: 'regex rules and transforms for adjectives',
  prefix: 'var types:any;',
  // build
  zip: function(lang, isZip) {
    zip = {
      which: __.val(dict.adjectives.which, {}),
      adverb: {
        to: __.val(dict.adjectives.adverb.to, {}),
        no: __.val(dict.adjectives.adverb.no, {}),
        fallback: __.val(dict.adjectives.adverb.fallback, {})
      },
      comparative: {
        to: __.val(dict.adjectives.comparative.to, {}),
        no: __.val(dict.adjectives.comparative.no, {}),
        fn: __.val(dict.adjectives.comparative.fn, {}),
        regular: __.val(dict.adjectives.comparative.regular, {}),
        fallback: __.val(dict.adjectives.comparative.fallback, {})
      },
      superlative: {
        to: __.val(dict.adjectives.superlative.to, {}),
        no: __.val(dict.adjectives.superlative.no, {}),
        fn: __.val(dict.adjectives.superlative.fn, {}),
        regular: __.val(dict.adjectives.superlative.regular, {}),
        fallback: __.val(dict.adjectives.superlative.fallback, {})
      },
      noun: {
        to: __.val(dict.adjectives.noun.to, {}),
        no: __.val(dict.adjectives.noun.no, {}),
        fallback: __.val(dict.adjectives.noun.fallback, {})
      }
    }
    return zip;
  },
  unzip: function() {
    var m = 'matches', r = 'replacer', rt = 'returns';
    [['adverb', 'to', [m, r]], ['adverb', 'no', [m]],
     ['comparative','to',[m, r]], ['comparative','no',[m]], ['comparative','regular',[m]],
     ['superlative','to',[m, r]], ['superlative','no',[m]],  ['superlative','regular',[m]],
     ['noun','to',[m, r]], ['noun','no',[m]],
     ['which', [m, rt]]].forEach(function(a/*::any::*/){
      types = a;
      var objKeys = a.pop();
      if (a[1]) { zip[a[0]][a[1]] = _.toObjDeep(zip[a[0]][a[1]], objKeys); }
      _.setObjKey(a, _.tokenFn(zip, a, 1), zip);
    });
    return zip;
  }
};
