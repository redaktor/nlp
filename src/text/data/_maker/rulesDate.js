// 29 rules date
var __ = require('./_');
var _ = require('../../../_');
var words = require('../dictionary');
var dict = require('../dictionaryRules'), data, zip;
module.exports = {
  id: 'date',
  folder: 'rules',
  description: 'regexes and functions for dates parsing\na 0 in dayFirst/monthFirst means language independent rules ...\n(replaced by module)',
  prefix: "import data = require('../lexicon/dates');",
  // build
  zip: function(lang, isZip) {
    // TODO - should go to functions
    function r(a, j, f) {
        if (!j) {j = ''}
        return new RegExp(a.join(j), f||'');
    }
    function values(o) {
      return ((o && typeof o === 'object' && !(o instanceof Array)) ? Object.keys(o).map(function(k){return o[k];}) : o);
    }
    //
    var _d = 'day', _m = 'month', _y = 'year';
    var d = {nr: '(3[0-1]|[12][0-9]|0?[1-9])'};
    d.nrs = [d.nr,__.val(dict.dates.day.suffix)].join('');
    var m = {nr: '([1-9]|0[1-9]|1[0-2])'};
    var y = {
      nr: '(?:([0-9]{1,4})+)',
      n:'(?:\\b| )[b]\\s?(?:.?)\\s?[c]\\s?(?:.?)\\s?[e]?\\s?(?:.?)',
      p:'(?:\\b| )[a|c]\\s?(?:.?)\\s?[d|e]\\s?(?:.?)'
    };
    var rd = {
      gregorian: {
        _1000: __.val(dict.dates.gregorian._1000, {}),
        _100: __.val(dict.dates.gregorian._100, {}),
        _10: __.val(dict.dates.gregorian._10, {}),
        _1: __.val(dict.dates.gregorian._1, {}),
        _m: __.val(dict.dates.gregorian._m, {}),
        _d: __.val(dict.dates.gregorian._d, {}),
        _h: __.val(dict.dates.gregorian._h, {}),
        _min: __.val(dict.dates.gregorian._min, {}),
        _sec: __.val(dict.dates.gregorian._sec, {})
      },
      relative: {
        tmr: __.val(dict.dates.relative.tmr, {}),
        yda: __.val(dict.dates.relative.yda, {}),
        tni: __.val(dict.dates.relative.tni, {}),
        //links: __.val(dict.dates.relative.links, {}),
        morn: __.val(dict.dates.relative.morn, {}),
        noon: __.val(dict.dates.relative.noon, {}),
        anoon: __.val(dict.dates.relative.anoon, {}),
        eve: __.val(dict.dates.relative.eve, {}),
        night: __.val(dict.dates.relative.night, {})
      },
      split: {
        multiple: __.val(dict.dates.split.multiple, {}),
        eventStart: __.val(dict.dates.split.eventStart, {}),
        eventEnd: __.val(dict.dates.split.eventEnd, {})
      },
      pos: {
        pre: __.val(words.DA.relative.positive.prefix,[]).join(' |'),
        suf: __.val(words.DA.relative.positive.suffix,[]).join(' |')
      },
      neg: {
        pre: __.val(words.DA.relative.negative.prefix,[]).join(' |'),
        suf: __.val(words.DA.relative.negative.suffix,[]).join(' |')
      },
      dl: __.val(words.DA.relative.deadline,[]).join('|')
    };
    var _ymd = {pattern:[_y,_m,_d]}, _dmy = {pattern:[_d,_m,_y]}, _mdy = {pattern:[_m,_d,_y]};
    var S='(?:', E='?)', st='(?: |^)', st2='(?:\\b|^)', toY=')(?:(?:.*?)', sRel='([0-9]+)?\\s*';
    var s0 = '(?:\\-)', s1='\\s?(?:\\-|\\/)+\\s?', s2='\\s?(?:\\.|\\/)+\\s?', s3='(?: ?\\- ?)';
    var eM = rd.split.multiple.join('(?= ) |'), eS = rd.split.eventStart.join('|');
    var eE = rd.split.eventEnd.filter(function(w){ if (rd.split.multiple.indexOf(w) < 0) return true; }).join('|');
    var m_s_y = {matches:_.r([m.w,' ',y.nr],0,'i'), parameters: {pattern:[_m,_y]}};
    var yOnly = {matches:_.r([st,y.nr],0,'i'), parameters: {pattern:[_y]}};
    //: 									4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    	10 tzHH    11 tzmm
    var isoTime = '(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:(Z)|([+\\-])(\\d{2})(?::(\\d{2}))?)?)?';	// TODO time
    var greg = ['(',values(rd.gregorian).join(')|('),')'].join('');
    var rels = ['(',values(rd.relative).join(')|('),')'].join('');
    var pnPrefix = ['(?:(?:',rd.pos.pre,' )|(',rd.neg.pre,' ))'].join('');
    var pnSuffix = ['(?:(?:',rd.pos.suf,' )|(',rd.neg.suf,' ))'].join('');
    var dl = ['(?:',st,'(?:',rd.dl,')\\s*(?:the\\s*)?(?:',pnPrefix,')',sRel,'(?:',greg,')\\s*(?=(?:\\W|$)))'].join('');
    var pn = ['(?:',st,pnPrefix,sRel,'(?:',greg,')\\s*)'].join('');
    var rel = ['(?:',st,rels,')?'].join('');
    zip = {
      range: _.r([st2,S,eS,')(.*)(?:\\s',eM,'\\s)(.*)|',st2,S,eS,')?(.*)(?:(?:\\s',eE,'\\s)|',s3,')(.+)'],0,'i'),
      multi: _.r([st,S,eM,'(?= ) )|(?: ?\\& ?)|(?: ?, ?)(?=\\d)'],0,'i'),
      iso: _.r([S,'(\\d{4}|[+\\-]\\d{6})',s0,m.nr,s0,d.nr,E,isoTime]),
      day: {
        suffix: __.val(dict.dates.day.suffix, {}),
        nr: new RegExp(d.nrs, 'i'), weekday: ''
      },
      month: {
        nr: new RegExp(m.nr), w: ''
      },
      year: {
        nr: y.nr,
        neg: _.r([y.n,'\\s',y.nr,'|',y.nr,y.n,'|',__.val(dict.dates.year.suffix.bc, {})],0,'i'),
        pos: _.r([y.p,'\\s',y.nr,'|',y.nr,y.p,'|',__.val(dict.dates.year.suffix.ad, {})], 0,'i')
      },
      short: [ // 6/25 etc.
        {matches: _.r([S,m.nr,s1,d.nr,s1,y.nr,E]), parameters: _mdy},
        {matches: _.r([S,d.nr,s2,m.nr,s2,y.nr,E]), parameters: _dmy}
      ],
      dayFirst: [ // 25th of June etc.
        {matches: [S,st,S,S,d.nrs,')?)','{m.w}?(?:$| )',toY,y.nr,E], parameters:_dmy},
        0, yOnly
      ],
      monthFirst: [ // June 25th etc.
        {matches: [S,st,'{m.w}(?:$| ))(?:',d.nrs,toY,y.nr,E], parameters:_mdy},
        0, yOnly
      ],
      relative: [
        {matches: new RegExp(dl, 'i'), parameters: {fn:'gregorian', isRange:1}},
        {matches: new RegExp(pn, 'i'), parameters: {fn:'gregorian'}},
        {matches: new RegExp(rel,'i'), parameters: {fn:'dictionary'}}
      ]
    };
    return zip;
  },
	make: function(lang) {
    data = require('./')('dates',lang,1);
    return this.unzip();
  },
  unzip: function() {
    var _d = 'day', _m = 'month', _y = 'year';
    var w = {day: Object.keys(data.days).join('|'), month: ['(?:(',Object.keys(data.months).join('|'),'),?)'].join('')};
    var m_y = {matches:_.r([w.month,' ',zip.year.nr],0,'i'), parameters: {pattern:[_m,_y]}};
    var r/*::any::*/;
    r = new RegExp(zip.year.nr); zip.year.nr = r;
    r = _.r(['(?:(',w.day,',?))'],0,'i'); zip.day.weekday = r;
    r = _.r([w.month],0,'i'); zip.month.w = r;
    for (var k in w) {
      var a = zip[k+'First'][0].matches.map(function(s){ return s.replace('{m.w}',w.month) });
      zip[k+'First'][0].matches = _.r(a,0,'i');
      zip[k+'First'][1] = m_y;
    }
    zip.short.unshift({matches: zip.iso, parameters: {pattern:[_y,_m,_d]}});
    return zip;
  }
};
