// 7 adjectives: decline
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'decline',
  folder: 'adjectives',
  description: ['{{.convertables}} regulars,\n',
                '{{.adverb.to}} to adverbs,\n',
                '{{.adverb.no}} having no adverb\n',
                '{{.comparative.to}} \n',
                '{{.superlative.to}} \n',
                '{{.noun.to}} \n',
                'types: [adjective, adverb, comparative, superlative, noun];\n',
                "0 means 'return null' for adverbs OR 'conjugate without more/most' for comparative and superlative.\n",
                "1 means 'default behavior'"].join(''),
  // compress
  zip: function(lang, isZip) {
    var repJJ = function(s) { return ((typeof s === 'string') ? _.repl(s, 0, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']) : s); }
    var types = {
      /*JJ: 'adjective',*/
      RB: 'adverb',
      JJR: 'comparative',
      JJS: 'superlative',
      NN: 'noun'
    };
    zip = __.newRes(isZip);
    //var irregularFlags = [];
    dict.JJ.words.filter(__.possibleOrig).forEach(function(o) {
      var v = __.val(o);
      var declineds = (isZip) ? [repJJ(v)] : [v];
      for (var type in types) {
        var declined = 1;
        if (type === 'RB' && __.meta(o, {key: 'noAdverb', isZip: isZip})) {
          declined = 0;
        }
        if ((type === 'JJR' || type === 'JJS')) { // TODO
          if (__.meta(o, {key: 'noComparative', isZip: isZip})) {
            declined = -1;
          } else if (!o.hasOwnProperty('meta') || !o.meta.convertable) {
            declined = 0;
          }
        }
        if (declined > 0 || !o.hasOwnProperty('meta') || !o.meta.convertable) {
          dict[type].words.filter(__.possibleRef).forEach(function(oa) {
            if (__.isRef(oa, o)) {
              declined = (!isZip || typeof oa[lang] === 'number') ? oa[lang] : oa[lang].replace(v, '=');
            }
          });
        }
        if (declined === -1) declined = 0;
        var _declined = (isZip) ? repJJ(declined) : declined;
        declineds.push( (declined) ? _declined : 0 );
      }

      if (declineds.length > 4 && declineds[4] === 1) declineds.pop();
      if (declineds.length === 4 && declineds[2] === 0 && declineds[3] === 0) {
        declineds.splice(2, 2);
      } else if (declineds.length === 4 && declineds[2] === 1 && declineds[3] === 1) {
        declineds.pop();
      }
      zip.push(declineds);
    });

    // add the rest which are convertable
    var r = __.getRes(isZip);
    var a = r[r.length-1];
    a.push(zip.map(function(declinedArr) { return declinedArr[0]; }));
    dict.JJ.words.filter(__.meta, {key: 'convertable', isZip: isZip}).forEach(function(o) {
      var v = __.val(o);
      if (!__.handled(v, isZip)) {
        zip.push((isZip) ? repJJ(v) : v);
        __.did(v, isZip);
      }
    });
    /* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
    return zip;
  },
  // node.js
  make: function() {
    var o = { convertables: [], adverb: {to: {}, no:[]}, comparative: {to: {}}, superlative: {to: {}}, noun: {to: {}} };

    zip.forEach(function(_a) {
      if (typeof _a === 'string') {
        o.convertables.push(_a);
      } else {
        var a = _a.map(function(w){ return w; });
        if (a.length > 1) {
          if (a[1] === 0) { o.adverb.no.push(a[0]); }
          if (typeof a[1] === 'string') { o.adverb.to[a[0]] = a[1]; }
        }
        if (a[2] && a[2] === 1) {
          o.convertables.push(a[0]);
        } else if (a.length>2) {
          o.comparative.to[a[0]] = a[2];
        }
        if (a.length>3 && a[3]!=1) {
          o.superlative.to[a[0]] = a[3];
        }
        if (a.length>4 && a[4]!=1) {
          o.noun.to[a[0]] = a[4];
        }
      }
    });
    o.convertables = o.convertables.reduce(_.toObj, {});
    o.adverb.no = o.adverb.no.reduce(_.toObj, {});
    return o;
  },
  // browser - expand
  unzip: function() {
    var repJJ = function(s) { return (typeof s !== 'string') ? s : _.repl(s, ['ight', 'ing', 'ent', 'er', 're', 'al', 'ed', 'ly', 'some']); }
    var res = { convertables: [], adverb: {to: {}, no:[]}, comparative: {to: {}}, superlative: {to: {}}, noun: {to: {}} };
    var expand = function (s, b) { return (s === 0) ? 0 : s.replace('=', b); }
    zip.forEach(function(_a/*::any::*/) {
      if (typeof _a === 'string') {
        res.convertables.push(repJJ(_a));
      } else {
        var a = _a.map(repJJ);
        if (a.length > 1) {
          if (a[1] === 0) { res.adverb.no.push(a[0]); }
          if (typeof a[1] === 'string') { res.adverb.to[a[0]] = expand(a[1], a[0]); }
        }
        if (a[2] && a[2] === 1) {
          res.convertables.push(a[0])
        } else if (a.length>2) {
          res.comparative.to[a[0]] = expand(a[2], a[0])
        }
        if (a.length>3 && a[3]!=1) {
          res.superlative.to[a[0]] = expand(a[3], a[0])
        }
        if (a.length>4 && a[4]!=1) {
          res.noun.to[a[0]] = expand(a[4], a[0])
        }
      }
    });
    res.convertables = res.convertables.reduce(_.toObj, {});
    res.adverb.no = res.adverb.no.reduce(_.toObj, {});
    return res;
  }
};
