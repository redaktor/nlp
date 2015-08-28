// 10 adverbs
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'decline',
  folder: 'adverbs',
  description: 'adverbs to adjectives',

  // build
  zip: function(lang, isZip) {
    zip = __.newRes(isZip);
    dict.RB.words.filter(__.possibleOrig).forEach(function(o) {
      var adj = '';
      dict.JJ.words.filter(__.possibleRef).forEach(function(oj) {
        if (__.isRef(oj, o)) adj = __.did(oj[lang], isZip);
      });
      zip.push((isZip) ? [o[lang].replace(adj, '='), adj] : [o[lang], adj]);
    });
    /* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
    return zip;
  },
  make: function() {
    var o = {};
    zip.forEach(function(a) {
      o[a[0]] = a[1];
    });
    return o;
  },
  // expand
  unzip: function() {
    var o = {};
    zip.forEach(function(a) {
      o[a[0].replace('=', a[1])] = a[1];
    });
    return o;
  }
};
