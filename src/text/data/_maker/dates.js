// 12 dates
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'dates',
  folder: 'lexicon',
  description: 'for date extraction',
  // build
  zip: function(lang, isZip) {
    zip = {months: {}, monthsAbbrevs: {}, days: {}, daysAbbrevs: {}, dayS:'', monthS:''};
    ['days', 'months'].forEach(function(c, n) {
      dict.DA[c].forEach(function(o, i) {
        var a = (o[lang] instanceof Array) ? o[lang] : [o[lang]];
        a.forEach(function(w, j) {
          cat = (j>0) ? [c,'Abbrevs'].join('') : c;
          zip[cat][w] = i+n;
        });
      });
    });
    return zip;
  },
  make: function(lang) { return this.unzip(); },
  // expand
  unzip: function() {
    var res = zip;
    ['days', 'months'].forEach(function(c, n) {
      var ca = [c,'Abbrevs'].join('');
      if (res[ca]) {
        for (var w in res[ca]) { res[c][w] = zip[ca][w]; }
      }
    });
    res.dayS = '\\b('.concat(Object.keys(res.days).join('|'), ')');
    res.monthS = '('.concat(Object.keys(res.months).join('|'), ')');
    return res;
  },
  makeUnzip: 1
};
