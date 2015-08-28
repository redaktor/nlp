// 8 adjectives: demonyms
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary');
module.exports = {
  id: 'demonym',
  folder: 'adjectives',
  description: 'adjective demonyms, e.g. "australian"',
  // compress
  zip: function(lang, isZip) {
    var demonyms = [];
    dict.JJD.words.filter(__.possible).forEach(function(o) {
      demonyms.push((isZip) ? _.repl(o[lang], 0, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']) : o[lang]);
      __.did(o[lang], isZip);
    });
    return demonyms;
  },
  // expand
  unzip: function() {
    zip = zip.map(function (w) {
			return _.repl(w, ['can', 'dan', 'ean', 'ian', 'ese', 'an', 'austr', 'ish']);
		});
    return zip;
  }
};
