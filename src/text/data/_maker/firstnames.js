// 17 firstnames
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionaryNames'), zip;
module.exports = {
  id: 'firstnames',
  folder: 'lexicon',
  description: 'first dict recognition',
  // build
  zip: function(lang, isZip) {
    var replN = function(w) {
      return _.repl(w, 0, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia']);
    }
    var names = {male: {}, female: {}, ambiguous: []};
    ['male', 'female'].forEach(function(type) {
      if (dict[type].hasOwnProperty(lang)) {
        names[type] = {};
        for (var k in dict[type][lang]) {
          names[type][k] = (isZip) ? replN(dict[type][lang][k]) : dict[type][lang][k];
        }
      }
    });
    if (dict.ambiguous.hasOwnProperty(lang)) { names.ambiguous = (isZip) ? dict.ambiguous[lang].map(replN) : dict.ambiguous[lang]; }
    return names;
  },
  make: function(lang){
    zip = this.zip(lang);
    var o = {};
    ['male', 'female'].forEach(function(type) {
      for (var k in zip[type]) {
        var arr = zip[type][k].split(',');
        arr.forEach(function(w, i) {
          o[k + w] = type.charAt(0);
        })
      }
    });
    zip.ambiguous = zip.ambiguous.reduce(function(h,s){ h[s]='a'; return h; }, o);
    return zip;
  },
  // expand
  unzip: function() {
    var replN = function(w) {
      return _.repl(w, ['ie', 'na', 'la', 'ri', 'ne', 'ra', 'el', 'in', 'an', 'le', 'en', 'ia'])
    }
    // convert it to an easier format
    var o = {};
    ['male', 'female'].forEach(function(type) {
      for (var k in zip[type]) {
        var arr = replN(zip[type][k]).split(',');
        arr.forEach(function(w, i) {
          o[k + w] = type.charAt(0);
        })
      }
    });
    var ambi/*::any::*/ = zip.ambiguous.map(replN).reduce(function(h,s){ h[s]='a'; return h; }, o);
    zip.ambiguous = ambi;
    return o;
  }
};
