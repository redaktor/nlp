// 9 other adjectives
var _ = require('../../nlp/_');
var __ = require('../_');
module.exports = {
  id: 'index',
  folder: 'adjectives',
  description: 'some other adjectives',
  // build
  zip: function(lang, isZip) {
    var a = __.rest('JJ', isZip).map(__.val);
    if (!isZip) return a;
    return _.repl(JSON.stringify(a), 0, ['ight', 'ing', 'ant', 'ent', 're', 'er', 'al', 'ed', 'ly', 'en', 'es', 'ate', '","']);
  },
  // expand
  unzip: function() {
    return JSON.parse(_.repl(zip, ['ight', 'ing', 'ant', 'ent', 're', 'er', 'al', 'ed', 'ly', 'en', 'es', 'ate', '","']));
  }
};
