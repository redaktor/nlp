// 6 other verbs
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'index',
  folder: 'verbs',
  description: 'some other known verbs for conjugating',
  // build
  zip: function(lang, isZip) {
    zip = __.rest('VBP', isZip).map(__.val).concat(dict.VB.words.filter(__.possible).map(__.val));
    return (isZip) ? _.repl(JSON.stringify(zip), 0, ['re', 'er', 'co', 'es', '","']) : zip;
  },
  unzip: function() {
    return JSON.parse(_.repl(zip, ['re', 'er', 'co', 'es', '","']));
  }
};
