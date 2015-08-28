// 22 rules sentence
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionaryRules');
module.exports = {
  id: 'sentence',
  folder: 'rules',
  description: 'rules for sentences\n(currently only .negate)',
  // build
  zip: function(lang, isZip) {
    return {
      negate: __.val(dict.sentence.negate, {})
    };
  }
};
