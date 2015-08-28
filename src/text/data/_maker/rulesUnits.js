// 28 rules units
var _ = require('../../nlp/_');
var __ = require('../_');
var dict = require('../dictionaryRules'), data;
module.exports = {
  id: 'units',
  folder: 'rules',
  description: 'regexes and functions for number context (e.g. measurement unit) parsing\na fluid language approach',
  prefix: "import data = require('../lexicon/numbers');\ndeclare var r:any;\ndeclare var setToken:any;\ndeclare var countStart:any;\ndeclare var noFallback:any;",
  // build
  zip: function(lang, isZip) {
    zip = {
      systems: dict.units.systems,
      categories: dict.units.categories,
      tags: dict.units.tags,
      prefixes: dict.units.metric.prefixes,
      units: dict.units.units,
      pows: dict.units.pows,
      per: dict.units.per,
      by: dict.units.by,
      numOnly:{}, prefix:{}, unit:{}, numeral:{}
    }
    return zip;
  },
	make: function(lang) {
    data = require('./')('numbers',lang,1);
    return this.unzip();
  },
  unzip: function() {
    var _u/*::any::*/ = {
      s: zip.units.sort(function(a/*::any[]::*/,bA) { return a[2].length - bA[2].length; }),
      w: zip.units.sort(function(a/*::any[]::*/,bA) { return _.last(a[3]).length - _.last(bA[3]).length; })
    };
    var s = '(?:\\( ?|\\) ?| |$)?', end = '(?:\\b|$)(?: |$)?';
    function prefix(is) { return zip.prefixes.map(function(a){return a[(is==='s') ? 1 : 2];}) }
    function getUnit(is) { return _u[is].map(function(a){return (is==='s') ? a[2] : _.last(a[3]);}) }
    function pows(i){
      return ['(?:(', Object.keys(zip.pows).filter(function(k){return k.substr(0,1) === '_';}).map(function(k){
        return zip.pows[k][i];
      }).join(')|('), '))?'].join('');
    }
    var _nr/*::any[]::*/ = Object.keys(data.multiple).concat(Object.keys(data.tens),Object.keys(data.teens),Object.keys(data.ones));
    zip.numOnly = new RegExp(['(',_nr.join('|'),')',end].join(''), 'gi');
    var nr = ['((?:(?:',_nr.concat(data.plus,data.minus,data.factors,data.decimal,'\\d+').join('|'),')(?: ?))+)'].join('');
    var p = { w:prefix('w'), s:prefix('s'), S: [], W: [] };
    p.W = [{matches: new RegExp(['(',p.w.join(')|('),')'].join(''), 'i')}];
    p.S = [{matches: new RegExp(['(',p.s.join(')|('),')'].join(''), '')}];
    zip.prefix = _.mixin(p, {fn:{w:_.tokenFn(p, 'W', 1, 1), s:_.tokenFn(p, 'S', 1, 1)}});

    var u = { w:getUnit('w'), s:getUnit('s'), S: [], W: [] };
    u.W = [{matches: new RegExp(['(',u.w.join(')|('),')'].join(''), 'i')}];
    u.S = [{matches: new RegExp(['(',u.s.join(')|('),')'].join(''), '')}];
    zip.units = _u;
    zip.unit = _.mixin(u, {fn:{w:_.tokenFn(u, 'W', 1, 1), s:_.tokenFn(u, 'S', 1, 1)}});
    var pStr = ['(?:(',p.w.join('|'),')|(?:(',p.s.join('|'),')(?=(?:',u.s.join('|'),')(?:',zip.by._,'|',zip.per._,'|\\b|$))))?'].join('');
    var uStr = ['(',u.w.join('|'),')?(?: |$)?(',u.s.join('|'),')?'].join('');

    var unit = [s,pows(1),s,pStr,uStr,s,pows(2),s].join('');
    var a = [
      nr,
      unit,'(',zip.by._,')?',unit,
      '(',zip.per._,')?',s,
      unit,'(',zip.by._,')?',unit,
      end
    ];
    zip.numeral = new RegExp(a.join(''), 'gi');
    return zip;
  }
};
