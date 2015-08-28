// 24 rules noun
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionaryRules'), zip;
module.exports = {
  id: 'noun',
  folder: 'rules',
  description: 'regex rules and suffixes for nouns (inflect and indefinite article)',
  prefix: 'var types:any;',
  // build
  zip: function(lang, isZip) {
    zip = {
      which: __.val(dict.nouns.which, {}),
      gender: {
        to: __.val(dict.nouns.gender, {}),
        names: __.val(dict.nouns.genderNames, {}),
        female: __.val(dict.nouns.genderFallback.female, ''),
        male: __.val(dict.nouns.genderFallback.male, ''),
        fallback: __.val(dict.nouns.genderFallback.gender, ''),
        fallbackPlural: __.val(dict.nouns.genderFallback.plural, ''),
        fallbackNames: __.val(dict.nouns.genderFallback.names, '')
      },
      prepositionPhrase: __.val(dict.nouns.prepositionPhrase, ''),
      article: {
        fallback: __.val(dict.nouns.articles.fallback, ''),
        plural: __.val(dict.nouns.articles.plural, ''),
        irregular: __.val(dict.nouns.articles.irregulars, {}),
        regex: __.val(dict.nouns.articles.regexes, {}),
        fn: __.val(dict.nouns.articles.fn, function(){})
      },
      isPlural: {
        fallback: __.val(dict.nouns.isPluralFallback, function(){})
      },
      plural: {
        pronoun: __.val(dict.nouns.pluralPronoun, ''),
        to: __.val(dict.nouns.pluralize, []),
        indicators: __.val(dict.nouns.pluralIndicators, [])
      },
      singular: {
        to: __.val(dict.nouns.singularize, []),
        indicators: __.val(dict.nouns.singularIndicators, [])
      }, preposition:{}
    }
    return zip;
  },
  // convert it to functions
  unzip: function() {
    var m = 'matches', r = 'replacer', rt = 'returns';
    [['plural', 'to', [m, r]], ['plural', 'indicators', [m]],
     ['singular','to', [m, r]], ['singular','indicators', [m]],
     ['gender','to', [m, rt]], ['gender','names', [m, rt]], ['which', [m, rt]]].forEach(function(a){
       types = a;
       var objKeys = types.pop();
       if (types[1]) { zip[types[0]][types[1]] = _.toObjDeep(zip[types[0]][types[1]], objKeys); }
       _.setObjKey(types, _.tokenFn(zip, types, 1), zip);
    });
    zip.preposition = {
      phrase: new RegExp(zip.prepositionPhrase),
      first: new RegExp('^'+zip.prepositionPhrase)
    };
    return zip;
  }
};
