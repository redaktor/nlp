// 20 wordnet rules
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'wordnet',
  folder: 'rules',
  description: 'wordnet generated suffixes',
  // build
  zip: function(lang, isZip) {
    if (!dict.unambiguousSuffixes.hasOwnProperty(lang)) { return; }
    var s = [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ];
    zip = (isZip) ? _.repl(JSON.stringify(dict.unambiguousSuffixes[lang]), 0, s) : dict.unambiguousSuffixes[lang];
    return zip;
  },
  make: function(lang) { return _.toObjValues(zip); },
  // convert it to an easier format
  unzip: function() {
    zip = JSON.parse(_.repl(zip, [ 'ed', 'er', 'le', 'es', 'ns', 'ant', 'nt', 'ise', 'ite', 'ive', 'ize', 'ish', 'ade', 'ate', 'ose', 'eed', 'end', 'est', 'use', '","' ]));
    return _.toObjValues(zip);
  }
};
