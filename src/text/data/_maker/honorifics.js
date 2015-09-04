// 13 honorifics
var __ = require('./_');
var dict = require('../dictionary');
module.exports = {
  id: 'honorifics',
  folder: 'lexicon',
  description: '',
  // build
  zip: function(lang, isZip) {
    __.newRes(isZip);
    if (!isZip) {
      honorifics = dict.NNAB.words.filter(__.meta, {key: 'honour', isZip: isZip}).map(__.val);
      return honorifics;
    }
    return __.did(dict.NNAB.words.filter(__.meta, {key: 'honour', isZip: isZip}).map(__.val), isZip);
  }
};
