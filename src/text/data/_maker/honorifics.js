// 13 honorifics
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary');
module.exports = {
  id: 'honorifics',
  folder: 'lexicon',
  description: '',
  // build
  zip: function(lang, isZip) {
    __.newRes(isZip);
    if (!isZip) {
      honorifics = __.did(dict.NNAB.words.filter(__.meta, {key: 'honour', isZip: isZip}).map(__.val), isZip);
      return honorifics;
    }
    return __.did(dict.NNAB.words.filter(__.meta, {key: 'honour', isZip: isZip}).map(__.val), isZip);
  }
};
