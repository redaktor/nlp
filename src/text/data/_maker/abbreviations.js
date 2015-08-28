// 14 abbreviations
var _ = require('../../nlp/_');
var __ = require('../_'), zip;
module.exports = {
  id: 'abbreviations',
  folder: 'lexicon',
  description: '',
  // build
  zip: function(lang, isZip) {
    var nonHonorifics = __.rest('NNAB', isZip);
    var abbrevs = nonHonorifics.filter(function(o) { return !__.meta(o, {key: 'nonNoun'}); }).map(__.val);
    //if (!isZip) { data.abbreviations.nouns = abbrevs.concat(honorifics); }
    return {
      nouns: abbrevs,
      nonNouns: nonHonorifics.filter(__.meta, {key: 'nonNoun', isZip: isZip}).map(__.val)
    };
  },
  make: function(lang){
      var honorifics = require('./')('honorifics',lang);
      zip = this.zip(lang);
      return {
        nouns: zip.nouns.concat(honorifics),
        nonNouns: zip.nonNouns
      };
  },
  prefix: "import honorifics = require('./honorifics');\n",
  // concat honorifics
  unzip: function() {
    return {
      nouns: zip.nouns.concat(honorifics),
      nonNouns: zip.nonNouns
    };
  }
};
