// 26 rules adverb
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'adverb',
  folder: 'rules',
  description: 'regex rules and transforms for adverbs',
  zip: function(lang, isZip) {
    zip = {
      which: __.val(dict.adverbs.which, {}),
      adjective: {
        to: __.val(dict.adverbs.adjective.to, {})
      }
    }
    return zip;
  },
  unzip: function() {
    var m = 'matches';
    [['adjective', 'to', [m, 'replacer']], ['which', [m, 'returns']]].forEach(function(a/*::any::*/){
      var objKeys = a.pop();
      if (a[1]) { zip[a[0]][a[1]] = _.toObjDeep(zip[a[0]][a[1]], objKeys); }
      _.setObjKey(a, _.tokenFn(zip, a, 1), zip);
    });
    return zip;
  }
};
