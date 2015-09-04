// 19 normalisations rules
var __ = require('./_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'normalisations',
  folder: 'rules',
  description: 'approximate visual (not semantic) relationship between unicode and ascii characters',
  // compress
  zip: function(lang, isZip) {
    var res = {};
    dict.normalisations.forEach(function(a){
      if(!res.hasOwnProperty(a[1])) res[a[1]] = '';
      res[a[1]] = res[a[1]].concat(a[0]);
    });
    zip = __.did(res, isZip);
    return zip;
  },
  make: function(lang) { return this.unzip(); },
  // expand
  unzip: function() {
    var res = { normaler: {}, greek: {}	};
    for (var normCh in zip) {
        zip[normCh].split('').forEach(function(grCh){
          res.normaler[grCh] = normCh;
          res.greek[normCh] = grCh;
        });
    }
    return res;
  }
};
