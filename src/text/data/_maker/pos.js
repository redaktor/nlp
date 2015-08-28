// 15 pos
var _ = require('../../nlp/_');
var __ = require('../_');
var allPossibles = __.allPossible();
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'pos',
  folder: 'lexicon',
  description: ['data for Parts Of Speech tagging', // TODO DOC
                '{{.particles}} ,\n',
                '{{.contractions}} ,\n',
                '{{.ambiguousContractions}}\n'].join(''),
  // build
  zip: function(lang, isZip) {
    zip = { particles: [], cs: [], contractions: {}, ambiguousContractions: {} };
    zip.particles = allPossibles.filter(__.meta, {key: 'particle', isZip: isZip}).map(__.val);
    if (dict.contractions.hasOwnProperty(lang)) {
      zip.cs = dict.contractions[lang];
      var cs = zip.cs.map(function(w){
        return w.replace('|', '');
      });
      var csAs = zip.cs.map(function(w){
        var a = w.split('|'); return ((a[1]) ? '\''.concat(a[1]) : a[0]);
      });
      allPossibles.filter(__.meta, {key: 'contractions'}).forEach(function(o){
        o.meta.contractions[lang].forEach(function(w) {
          var pos = cs.indexOf(w);
          if (pos > -1) {
            var key = o[lang]+csAs[pos];
            // ambiguous are the ones having multiple meanings for same extension
            // e.g. for 's, so
            if (zip.contractions.hasOwnProperty(key)) {
              zip.ambiguousContractions[key] = zip.contractions[key][0];
              delete zip.contractions[key];
            } else {
              zip.contractions[key] = [o[lang], w];
            }
          }
        });
      });
    }
    return zip;
  },
  // convert it to an easier format
  unzip: function() {
    var p/*::any::*/ = zip.particles.reduce(_.toObj, {});
    zip.particles = p;
    return zip;
  }
};
