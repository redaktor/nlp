// 21 rules POS
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'pos',
  folder: 'rules',
  description: 'rules for Parts Of Speech tagging',
  // build
  zip: function(lang, isZip) {
    zip = {
      replacing: {},
      words: __.val(dict.pos.words, {}),
      strongDeterminers: __.val(dict.pos.strongDeterminers, {}),
      ambiguousContractions: __.val(dict.pos.ambiguousContractions, {}),
      set: __.val(dict.pos.set, {}),
      merge: __.val(dict.pos.merge, {}),
      special: __.val(dict.pos.special, {}),
      wordsMatch: {},
      lexiReplace: {}
    };
    for (var id in dict.pos.replacing) {
      if (dict.pos.replacing[id].hasOwnProperty(lang)) {
        zip.replacing[id] = dict.pos.replacing[id][lang];
      }
    }
    return zip;
  },
  // convert word rules to an easier format
  unzip: function() {
    var a/*::any::*/ = [];
    for (var k in zip.words) {
      a = a.concat(zip.words[k].map(function(r){ return [r,k]; }));
    }
    a = _.toObjDeep(a, ['matches', 'tag']); zip.words = a;
    a = _.tokenFn(zip, 'words', 1); zip.wordsMatch = a;
    a = _.tokenFn(zip, 'replacing'); zip.lexiReplace = a;
    a = _.tokenFn(zip, 'set'); zip.set = a;
    a = _.tokenFn(zip, 'special', 1); zip.special = a;
    return zip;
  }
};
