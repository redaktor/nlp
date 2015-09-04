// 11 numbers
var __ = require('./_');
var dict = require('../dictionary');
module.exports = {
  id: 'numbers',
  folder: 'lexicon',
  description: 'for number recognition',
  // build
  zip: function(lang, isZip) {
    __.newRes(isZip);
    var numbers = {plus: __.val(dict.NU.plus), minus: __.val(dict.NU.minus), factors: __.val(dict.NU.factors), decimal: __.val(dict.NU.decimal)};
    ['ones', 'teens', 'tens', 'multiple'].forEach(function(_var) {
      var cat = dict.NU[_var];
      numbers[_var] = {};
      for (var i in cat) {
        if (cat[i].hasOwnProperty(lang)) {
          var words = (cat[i][lang] instanceof Array) ? cat[i][lang] : [cat[i][lang]];
          words.forEach(function(w) {
            numbers[_var][__.did(w, isZip)] = (_var === 'multiple') ? Math.pow(10, parseInt(i)) : parseInt(i);
          });
        }
      }
    });
    return numbers;
  }
};
