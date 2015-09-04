// 5 verbs conjugate - irregulars, noDoers, irregularDoers
var __ = require('./_');
var _ = require('../../../_');
var dict = require('../dictionary'), zip;
module.exports = {
  id: 'conjugate',
  folder: 'verbs',
  description: ['{{.irregulars}} irregular conjuagated verbs,\n',
                '{{.noDoers}} verbs without doers,\n',
                '{{.irregularDoers}} verbs with irregular doers\n',
                'types: [infinitive, gerund, past, present, doer, future]'].join(''),
  // compress
  zip: function(lang, isZip) {
    var types = {
    /*VBP: 'infinitive',*/
      VBG: 'gerund',
      VBD: 'past',
      VBZ: 'present',
      NNA: 'doer'
    };
    var _irregulars = __.newRes(isZip);
    // TODO - FIXME : 'be' is listed twice in _irregulars, this one should be first ! FIXME goes to dictionary
    _irregulars.push([ 'be', 'being', 'was', 'is', 0 ]);
    var _noDoers = {};
    //var irregularFlags = [];
    dict.VBP.words.filter(__.possibleOrig).forEach(function(o) {
      var inf = __.val(o);
      var cs = [inf];
      for (var type in types) {
        var conjugated = 0;
        dict[type].words.filter(__.possibleRef).forEach(function(oc) {
          if (__.isRef(oc, o)) {
            conjugated = __.val(oc);
          }
          __.did(inf, isZip);
        });
        cs.push( (conjugated) ? conjugated : 0 );
      }
      // check noDoer
      if (!cs[4] && (!o.hasOwnProperty('meta') || !o.meta.noDoer || o.meta.noDoer.indexOf(lang) < 0)) {
        cs.pop();
      }

      var conjugateds = (isZip) ? _.replBase(cs, 0, ['ing', 'er', 've']) : cs;
      _irregulars.push(conjugateds);
    });

    dict.VBP.words.filter(__.meta, {key: 'noDoer', isZip: isZip}).forEach(function(o) {
      _noDoers[__.val(o)] = 1;
    });
    /* TODO flags for all conjugated :  'I'.concat(flag(o.meta))) */
    zip = {
      irregulars: _irregulars,
      noDoers: _noDoers,
      irregularDoers: {}
    };
    return zip;
  },
  make: function(lang) {
    var types = ['infinitive','gerund','past','present','doer','future'];
    zip.irregulars = zip.irregulars.map(function (a) {
    	var obj = {};
    	a.forEach(function(s, i) {
    		if (i > 3 && !s) {
    			zip.noDoers[a[0]] = 1;
    		} else if (i > 3) {
    			zip.irregularDoers[a[0]] = s;
    		} else {
    			obj[types[i]] = s;
    		}
    	});
    	return obj;
    });
    return zip;
  },
  // expand
  unzip: function() {
    var types = ['infinitive','gerund','past','present','doer','future'];
    var irreg/*::any::*/ = zip.irregulars.map(function (a/*::any::*/) {
    	var obj = {};
      a = _.replBase(a, ['ing', 'er', 've']);
    	a.forEach(function(s, i) {
    		if (i > 3 && !s) {
    			zip.noDoers[a[0]] = 1;
    		} else if (i > 3) {
    			zip.irregularDoers[a[0]] = s;
    		} else {
    			obj[types[i]] = s;
    		}
    	});
    	return obj;
    });
    zip.irregulars = irreg;
    return zip;
  }
};
