// 27 rules number
var __ = require('./_');
var dict = require('../dictionaryRules');
module.exports = {
  id: 'number',
  folder: 'rules',
  description: 'regexes and functions for number parsing',
  prefix: "import d = require('../lexicon/numbers');",
  // build
  zip: function(lang, isZip) {
    return {
      negative: __.val(dict.numbers.negative),
      factors: __.val(dict.numbers.factors),
      ordinals:	__.val(dict.numbers.ordinals)
    }
  }
};
