// 4 verbs - CP, MD, negate
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'special',
  folder: 'verbs',
  description: ['special verbs\n',
                '{{.CP}} CP verbs,\n',
                '{{.MD}} MD verbs,\n',
                '{{.negate}} '].join(''),
  // compress
  zip: function(lang, isZip) {
    // TODO: 'it', 'one'
    zip = {CP:[], MD:[]};
    ['CP', 'MD'].forEach(function(type) {
      dict[type].words.filter(__.possibleAndMulti).forEach(function(o) {
        var hasRef = 0;
        var pos = __.val(o);
        dict[type].words.filter(__.possibleRef).forEach(function(ov) {
          if (__.isRef(ov, o)) {
            hasRef = 1;
            var neg = __.val(ov);
            zip[type].push([pos, neg]);
          }
        });
        if (hasRef < 1 && !(o.hasOwnProperty('ref')) && !(o.hasOwnProperty('uid'))) {
          neg = pos+' not';
          zip[type].push([pos, neg]);
        }
      });
    });
    return zip;
  },
	make: function(lang) { return this.unzip(); },
  // expand
  unzip: function () {
    var res = {negate:{}, CP:{}, MD:{}};
    ['CP', 'MD'].forEach(function(type) {
      res[type] = {};
      zip[type].forEach(function(a) {
        res[type][a[0]] = type;
        res[type][a[1]] = type;
        res.negate[a[1]] = a[0];
        res.negate[a[0]] = a[1];
      });
    });
    return res;
  }
};
