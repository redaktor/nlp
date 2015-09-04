// 18 phrasal verbs
var __ = require('./_');
var dict = require('../dictionary'), zip;
var opposite = require('./')('negate', lang, 1);
var verbs = require('./')('verbs', lang, 1);
var conjugated = {irregulars: require('./')('verbsConjugate', lang, 1).irregulars};
module.exports = 	{
    id: 'phrasalVerbs',
    folder: 'lexicon',
    description: ['phrasal verbs',
                  '{{.verbs}} base verbs,',
                  '{{.symmetric}} behaviour (references),',
                  '{{.asymmetric}} behaviour (references)'].join('\n'),
    prefix: ["import opposite = require('./negate');",
            "import verbs = require('../verbs/index');",
            "import conjugated = require('../verbs/conjugate');"].join('\n'),
    // build
    zip: function(lang, isZip) {
      zip = {
        verbs: dict.phrasalVerbs.words.filter(__.possible).map(__.val),
        symmetric: {},
        asymmetric: {}
      }

      var VBPs = conjugated.irregulars.map(function(o){
        return o.infinitive;
      }).concat(verbs, zip.verbs);

      function toRes(o){
        o.meta.phrasal[lang].forEach(function(a) {
          var type = (a instanceof Array) ? 'symmetric' : 'asymmetric';
          var s = (type === 'asymmetric') ? a : a[0];
          if (!zip[type].hasOwnProperty(s))	{
            zip[type][s] = [];
          }
          if (VBPs.indexOf(o[lang])<0) console.log(o[lang],VBPs.indexOf(o[lang]));
          zip[type][s].push(VBPs.indexOf(o[lang]));
        });
      }
      dict.VBP.words.filter(__.meta, {key: 'phrasal', handled: 1, isZip: isZip}).forEach(toRes);
      dict.phrasalVerbs.words.forEach(toRes);
      zip.verbs = zip.verbs.join(',');
      zip.symmetric = JSON.stringify(zip.symmetric);
      zip.asymmetric = JSON.stringify(zip.asymmetric);
      return zip;
    },
    make: function(lang) { return this.unzip(); },
    unzip: function () {
      var res = {particleRegex:''};
      var allVerbs = conjugated.irregulars.map(function(o){
        return o.infinitive;
      }).concat( verbs, zip.verbs.split(',') );

      var regexArr = [];
      function buildPhrasals(t) {
        var o = JSON.parse(zip[t]);
        for (var k in o) {
          o[k].reduce(function (h, i) {
            h[allVerbs[i]+' '+ k] = 'VBP';
            if (regexArr.indexOf(k) < 0) {
              regexArr.push(k);
            }
            if (t === 'symmetric' && opposite.hasOwnProperty(k)) {
              h[allVerbs[i]+' '+ opposite[k]] = 'VBP';
              if (regexArr.indexOf(opposite[k]) < 0) {
                regexArr.push(opposite[k]);
              }
            }
            return h;
          }, res);
        }
      }
      ['symmetric', 'asymmetric'].forEach(buildPhrasals);

      res.particleRegex = ['^(.*?)(', regexArr.join('|'), ')$'].join('');
      return res;
    }
  };
