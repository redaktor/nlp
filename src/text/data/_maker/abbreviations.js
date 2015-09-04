// 14 abbreviations
var __ = require('./_');
module.exports = {
  id: 'abbreviations',
  folder: 'lexicon',
  description: '',
  // build
  zip: function(lang, isZip) {
    var honorifics = require('./')('honorifics',lang,1);
    var nonHonorifics = __.rest('NNAB', isZip);
    var abbrevs = nonHonorifics.filter(function(o) { return !__.meta(o, {key: 'nonNoun'}); }).map(__.val);
    return {
      nouns: (!isZip) ? abbrevs.concat(honorifics) : abbrevs,
      nonNouns: nonHonorifics.filter(__.meta, {key: 'nonNoun', isZip: isZip}).map(__.val)
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
